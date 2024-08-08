export const updateBody = {
    schema: {
        type: 'object',
        properties: {
            firstName: {
                type: 'string',
                example: 'Rumble',
                description: "User's first name"
            },
            lastName: {
                type: 'string',
                example: 'Ann',
                description: "User's last name"
            },
            phone: {
                type: 'string',
                example: '079002239',
                description: "User's phone number"
            },
            birthDate: {
                type: 'string',
                example: '2000-08-26',
                description: "User's birth date"
            }
        }
    }
};
