// External Dependancies
const boom = require('boom');
const _ = require('lodash');

// Get Data Models
const User = require('../models/User')

// Import Swagger documentation
const documentation = require('../documentation/api')

const updateMe = async function (fastify, opts) {
    fastify.route({
        method: 'PUT',
        url: '/api/me',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, reply) => {
            try {
                const values = req.body
                const updateData = _.pick(values, ['email', 'data']);
                const decoded = await fastify.jwt.verify(req.headers['authorization'])
                const user = await User.findByIdAndUpdate(decoded.id, updateData, { new: true })
                reply.send(_.pick(user, ['id', 'email', 'role', 'data']))
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.updateMeSchema
    })
} 

module.exports = updateMe;