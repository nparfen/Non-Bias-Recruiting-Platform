exports.updateMeSchema = {
    description: 'Update user',
    summary: 'Updates user with given values',
    tags: ['profile'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    },
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            data: { type: 'object' }
        }
    }
}

exports.setAssessmentSchema = {
    description: 'Set assessment',
    summary: 'Set user assessment',
    tags: ['profile'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    },
    body: {
        type: 'object'
    }
}

exports.createJobSchema = {
    description: 'Create job',
    summary: 'Create job',
    tags: ['jobs'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    },
    body: {
        type: 'object',
        properties: {
            status: { type: 'string' },
            data: { type: 'object' }
        }
    }
}

exports.getJobsSchema = {
    description: 'Get jobs',
    summary: 'Get jobs',
    tags: ['jobs'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    },
    params: {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                description: 'Status'
            },
            page: {
                type: 'integer',
                description: 'Page'
            }
        }
    }
}

exports.getCandidatesSchema = {
    description: 'Get candidates',
    summary: 'Get candidates',
    tags: ['candidates'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    },
    params: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                description: 'Page'
            }
        }
    }
}

exports.getMeSchema = {
    description: 'Get profile',
    summary: 'Get user profile information',
    tags: ['profile'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    }
}

exports.registerSchema = {
    description: 'Register',
    summary: 'Register',
    tags: ['authentication'],
    body: {
        type: 'object',
        properties: {
            role: { type: 'string' },
            email: { type: 'string' },
            pwd: { type: 'string' },
            data: { type: 'object' }
        }
    }
}

exports.loginSchema = {
    description: 'Login',
    summary: 'Login',
    tags: ['authentication'],
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            pwd: { type: 'string' },
            role: { type: 'string' }
        }
    }
}


exports.uploadSchema = {
    description: 'Upload',
    summary: 'Upload file',
    consumes: ['multipart/form-data'],
    headers: {
        type: 'object',
        properties: {
            authorization: {
                type: 'string',
                description: 'Token'
            }
        },
        required: ['authorization']
    },
    body: {
        type: 'object',
        properties: {
            file: {
                type: 'file'
            }
        }
    }
}