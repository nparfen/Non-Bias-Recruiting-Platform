// External Dependancies
const boom = require('boom');
const _ = require('lodash');

// Get Data Models
const User = require('../models/User')
const Assessment = require('../models/Assessment')

// Import Swagger documentation
const documentation = require('../documentation/api')

const getMe = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/api/me',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, reply) => {
            try {
                const decoded = await fastify.jwt.verify(req.headers['authorization'])
                let user = await User.findById(decoded.id, null, { lean: true })
                const assessment = await Assessment.findOne({ author: decoded.id }, null, { lean: true })
                user.data.assessment = assessment
                user.data.isNewUser = false
                if(user.createdAt) {
                    user.data.isNewUser = user.createdAt > new Date(Date.now() - 15*60 * 1000)
                }
                reply.send(_.pick(user, ['id', 'email', 'role', 'data', 'assessment']))
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.getMeSchema
    })
} 

module.exports = getMe;