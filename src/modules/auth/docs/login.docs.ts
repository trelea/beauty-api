export const loginBody = {
    schema: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                example: 'ann.steller@gmail.com',
                description: 'email'
            },
            password: {
                type: 'string',
                example: 'Poiuytrewq1234#',
                description: 'password'
            }
        }
    }
};
