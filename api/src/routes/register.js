// External Dependancies
const boom = require('boom');

// Get Data Models
const User = require('../models/User')

// Import Swagger documentation
const documentation = require('../documentation/api')

const register = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/api/register',
        beforeHandler: fastify.auth([fastify.verifyUniqueUser]),
        handler: async (req, reply) => {
            try {
                const user = new User(req.body)
                const savedUser = await user.save()
                const token = await fastify.jwt.sign({ id: savedUser._id, email: savedUser.email })
                reply.header('authorization', token).send();
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.registerSchema
    })
} 

module.exports = register;