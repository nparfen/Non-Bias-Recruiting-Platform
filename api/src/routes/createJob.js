// External Dependancies
const boom = require('boom');

// Get Data Models
const Job = require('../models/Job')

// Import Swagger documentation
const documentation = require('../documentation/api')

const createJob = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/api/jobs/create',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, reply) => {
            try {
                const decoded = await fastify.jwt.verify(req.headers['authorization'])
                const newJob = {
                    author: decoded.id,
                    status: req.body.status,
                    data: req.body.data
                }
                const job = new Job(newJob)
                const savedJob = await job.save()
                reply.send(savedJob);
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.createJobSchema
    })
} 

module.exports = createJob;