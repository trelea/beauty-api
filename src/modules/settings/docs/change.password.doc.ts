export const changePasswordBody = {
    schema: {
        type: 'object',
        properties: {
            password: {
                type: 'string',
                example: 'SecretAnn1234$',
                description: "Actual user's password"
            },
            new_password: {
                type: 'string',
                example: 'NewPass12!@',
                description: "New user's password"
            },
            confirm_password: {
                type: 'string',
                example: 'NewPass12!@',
                description: 'confirm new password'
            }
        }
    }
};
