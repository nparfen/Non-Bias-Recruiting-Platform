const fp = require('fastify-plugin')

// External Dependancies
const boom = require('boom');

// Get Data Models
const User = require('../models/User')

module.exports = fp(function (fastify, opts, next) {

    fastify.decorate('verifyUniqueUser', async (request, reply, done) => {
        try {
            const user = await User.findOne({ email: request.body.email, role: request.body.role });
            if (user) return done(new Error('There is already a user with such email'))
            done()
        } catch (err) {
            done(boom.boomify(err))
        }
    });

    next()
})