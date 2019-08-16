// External Dependancies
const boom = require('boom');
const uuidv4 = require("uuid/v4");
const pump = require('pump')

// Import Swagger documentation
const documentation = require('../documentation/api')

const { GOOGLE_CLOUD_BUCKET } = require('../config/app')
const storage = require('../helpers/google-cloud-storage');

const upload = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/api/upload',
        beforeHandler: fastify.auth([fastify.verifyJWT]),
        handler: function (req, reply) {
            const mp = req.multipart(handler, function (err) {
                if (err) {
                    reply.send(err)
                }
                console.log('upload completed', process.memoryUsage().rss)
            })
            mp.on('field', function (key, value) {
                console.log('form-data', key, value)
            })
            function handler (field, file, filename, encoding, mimetype) {
                const gcsName = uuidv4() + filename;
                const bucket = storage.bucket(GOOGLE_CLOUD_BUCKET);
                const gcsFile = bucket.file(gcsName);
                pump(file, gcsFile.createWriteStream({
                        metadata: {
                            contentType: file.type
                        }
                    })
                    .on("error", (err) => {
                        reply.send(boom.boomify(err))
                    })
                    .on('finish', () => {
                        gcsFile.makePublic()
                            .then(() => {
                                reply.send({fileUrl: `https://storage.googleapis.com/${GOOGLE_CLOUD_BUCKET}/${gcsName}`})
                            });
                    })
                )
            }
        },
        schema: documentation.uploadSchema,
        schemaCompiler: () => {}
    })
} 

module.exports = upload;