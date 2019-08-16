// External Dependancies
const boom = require('boom');

// Get Data Models
const Job = require('../models/Job')

// Import Swagger documentation
const documentation = require('../documentation/api')

const getJobs = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/api/jobs/:status/:page',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, reply) => {
            try {
                let query = {};
                if(req.params.status !== 'all'){
                    query.status = req.params.status
                }
                const decoded = await fastify.jwt.verify(req.headers['authorization'])
                query.author = decoded.id
                const jobs = await Job.paginate(query, { page: req.params.page, limit: '7', sort: { createdAt: 'desc'} })
                reply.send(jobs)
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.getJobsSchema
    })
} 

module.exports = getJobs;