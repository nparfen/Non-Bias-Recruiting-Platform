const { SWAGGER_HOST, SWAGGER_SCHEMES } = require('./app')

exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'API',
            description: '',
            version: '1.0.0'
        },
        host: SWAGGER_HOST,
        schemes: [SWAGGER_SCHEMES],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'profile' },
            { name: 'authentication' },
            { name: 'jobs' },
            { name: 'candidates'}
        ],
    }
}