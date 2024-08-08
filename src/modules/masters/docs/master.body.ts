export const masterBody = {
    schema: {
        type: 'object',
        properties: {
            firstName: {
                type: 'string',
                example: 'Ann',
                description: 'master first name'
            },
            lastName: {
                type: 'string',
                example: 'Miguel',
                description: 'master last name'
            },
            contact: {
                type: 'string',
                example: '079456789',
                description: 'master contact'
            },
            email: {
                type: 'string',
                example: 'ann.trandafir@mail.md',
                description: 'master email'
            },
            description: {
                type: 'string',
                example: 'Very beautyfull girl and worker',
                description: 'master description'
            },
            thumbnail: { type: 'string', format: 'binary' }
        }
    }
};
