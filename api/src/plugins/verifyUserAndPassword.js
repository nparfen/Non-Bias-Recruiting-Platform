const fp = require('fastify-plugin')

// External Dependancies
const boom = require('boom');

// Get Data Models
const User = require('../models/User')

module.exports = fp(function (fastify, opts, next) {

    fastify.decorate('verifyUserAndPassword', async (request, reply, done) => {
        try {
            const user = await User.findOne({ email: request.body.email, role: request.body.role });
            if (!user) return done(new Error('There is no user with such email'))
            if (!user.pwd || user.pwd !== request.body.pwd) {
                return done(new Error('Password is not valid'))
            }
            done()
        } catch (err) {
            done(boom.boomify(err))
        }
    });

    next()
})