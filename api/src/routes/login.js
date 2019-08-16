// External Dependancies
const boom = require('boom');

// Get Data Models
const User = require('../models/User')

// Import Swagger documentation
const documentation = require('../documentation/api')

const login = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/api/login',
        beforeHandler: fastify.auth([fastify.verifyUserAndPassword]),
        handler: async (req, reply) => {
            try {
                const user = await User.findOne({ email: req.body.email, role: req.body.role });
                const token = await fastify.jwt.sign({ id: user._id, email: user.email })
                reply.header('authorization', token).send();
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.loginSchema
    })
} 

module.exports = login;