require('dotenv-flow').config();

const path = require('path');

// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// auth plugin
const oauthPlugin = require('fastify-oauth2')

// Require autoload plugins
const AutoLoad = require('fastify-autoload')

// Require external modules
const mongoose = require('mongoose')

// Import Swagger Options
const swagger = require('./config/swagger')
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, LINKEDIN_AUTH_ID, LINKEDIN_AUTH_SECRET, LINKEDIN_CALLBACK, PORT, API_URL, JWT_SECRET } = require('./config/app')

// Connect to DB
mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))

// Register Swagger
fastify
    .register(require('fastify-swagger'), swagger.options)
    .register(require('fastify-multipart'), {
        limits: {
            files: 1
        }
    })
    .register(require('fastify-jwt'), { 
        secret: JWT_SECRET
    })
    .register(require('fastify-auth'))
    .register(require('fastify-cors'), { 
        origin: ['http://localhost:3000'], 
        exposedHeaders: 'authorization', 
        methods: ['GET', 'PUT', 'POST'] 
    })
    .register(require('./plugins/verifyJWT'))
    .register(require('./plugins/verifyUniqueUser'))
    .register(require('./plugins/verifyUserAndPassword'))
    .register(AutoLoad, {
        dir: path.join(__dirname, 'routes')
    })
    .register(oauthPlugin, {
        name: 'linkedinOAuth2',
        credentials: {
            client: {
                id: LINKEDIN_AUTH_ID,
                secret: LINKEDIN_AUTH_SECRET
            },
            auth: oauthPlugin.LINKEDIN_CONFIGURATION
        },
        scope: 'r_liteprofile,r_emailaddress',
        startRedirectPath: '/login/linkedin',
        callbackUri: LINKEDIN_CALLBACK
    })

// Run the server!
const start = async () => {
    try {
        await fastify.listen(PORT, API_URL)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()