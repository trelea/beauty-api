export const otpBody = {
    schema: {
        type: 'object',
        properties: {
            otp: {
                type: 'string',
                example: '8090',
                description: 'One-Time Password'
            }
        }
    }
};
