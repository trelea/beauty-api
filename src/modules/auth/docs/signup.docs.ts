export const signupBody = {
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
            email: {
                type: 'string',
                example: 'ann.rumble@gmail.com',
                description: "User's mail"
            },
            password: {
                type: 'string',
                example: 'SecretAnn1234$',
                description: "User's password"
            },
            birthDate: {
                type: 'string',
                example: '2000-08-26',
                description: "User's birth date"
            }
        }
    }
};
