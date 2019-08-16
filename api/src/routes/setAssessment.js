// External Dependancies
const boom = require('boom');

// Get Data Models
const Assessment = require('../models/Assessment')

// Import Swagger documentation
const documentation = require('../documentation/api')

const setAssessment = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/api/assessment',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, reply) => {
            try {
                const decoded = await fastify.jwt.verify(req.headers['authorization'])
                let assessmentData = {
                    author: decoded.id
                }
                const assessment = await Assessment.findOne(assessmentData);
                assessmentData.data = req.body.assessment
                if (assessment) {
                    await Assessment.findByIdAndUpdate(assessment._id, assessmentData, { new: true })
                } else {
                    const newAssessment = new Assessment(assessmentData)
                    await newAssessment.save()
                }

                reply.send(assessmentData);
            } catch (err) {
                throw boom.boomify(err)
            }
        },
        schema: documentation.setAssessmentSchema
    })
} 

module.exports = setAssessment;