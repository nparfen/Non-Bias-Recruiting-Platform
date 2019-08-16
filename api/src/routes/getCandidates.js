// External Dependancies
const boom = require('boom');
const _ = require('lodash');

// Get Data Models
const User = require('../models/User')

// Import Swagger documentation
const documentation = require('../documentation/api')

const statuses = ['no-status', 'applied', 'declined', 'interviewing', 'hired']

const getCandidates = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/api/candidates/:page',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, reply) => {
            try {
                let query = {};
                query.role = "candidate"
                let candidates = await User.paginate(query, { lean: true, select: '-pwd', page: req.params.page, limit: '10', sort: { createdAt: 'desc'} })
                
                for (let index = 0; index < candidates.docs.length; index++) {
                    candidates.docs[index].status = _.sample(statuses);
                }

                reply.send(candidates)
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.getCandidatesSchema
    })
} 

module.exports = getCandidates;