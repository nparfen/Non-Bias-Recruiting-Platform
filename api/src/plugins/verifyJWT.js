const fp = require('fastify-plugin')

// External Dependancies
const boom = require('boom');

module.exports = fp(function (fastify, opts, next) {

    fastify.decorate('verifyJWT', async (request, reply, done) => {
        try {
            if (!request.headers['authorization']) {
                return done(new Error('Missing token header'))
            }
            const decoded = await fastify.jwt.verify(request.headers['authorization'])
            if (!decoded.id || !decoded.email) {
                return done(new Error('Token not valid'))
            }
            done()
        } catch (err) {
            done(boom.boomify(err))
        }
    });

    next()
})