// External Dependancies
const boom = require('boom');
const sget = require('simple-get')
const _ = require('lodash');

// Get Data Models
const User = require('../models/User')

const linkedinCallback = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        url: '/login/linkedin/callback',
        handler: async (req, reply) => {
            try {
                let result = { linkedinId: null, data: { firstname: null, lastname: null, avatar: null }, email: null, role: "candidate" };
                const social = await fastify.getAccessTokenFromAuthorizationCodeFlow(req)
                sget.concat({
                    url: 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName)',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + social.access_token
                    },
                    json: true
                }, function (err, res, data) {
                    if (err) {
                        reply.send(err)
                        return
                    }
                    result.linkedinId = data.id;
                    result.data.firstname = _.values(data.firstName.localized)[0];
                    result.data.lastname = _.values(data.lastName.localized)[0];
                    sget.concat({
                        url: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + social.access_token
                        },
                        json: true
                    }, async function (err, res, data) {
                        if (err) {
                            reply.send(err)
                            return
                        }
                        result.email = _.values(data.elements[0])[1].emailAddress;
                        const user = await User.findOne({ linkedinId: result.linkedinId, role: result.role });
                        if (user){
                            const token = await fastify.jwt.sign({ id: user._id, email: user.email })
                            reply
                                .header('Content-Type', 'text/html; charset=utf-8')
                                .send('<script>window.opener.postMessage(\''+JSON.stringify({authorization: token})+'\', \'*\')</script>')
                        } else {
                            const newUser = new User(result)
                            const savedUser = await newUser.save()
                            const token = await fastify.jwt.sign({ id: savedUser._id, email: savedUser.email })
                            reply
                                .header('Content-Type', 'text/html; charset=utf-8')
                                .send('<script>window.opener.postMessage(\''+JSON.stringify({authorization: token})+'\', \'*\')</script>')
                        }
                    })
                })
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    })
} 

module.exports = linkedinCallback;