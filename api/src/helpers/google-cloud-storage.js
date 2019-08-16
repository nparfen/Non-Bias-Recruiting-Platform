const { Storage } = require('@google-cloud/storage')
const { GOOGLE_CLOUD_PROJECT_ID } = require('../config/app')
const GOOGLE_CLOUD_KEYFILE = './gcs.json';

const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

module.exports = storage;