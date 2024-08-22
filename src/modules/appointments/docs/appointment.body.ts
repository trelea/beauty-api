export const appointmentBody = {
    schema: {
        type: 'object',
        properties: {
            masterId: {
                type: 'uuid',
                example: 'ad51bef2-d16e-45fe-943b-5595baaa65f6',
                description: 'master uuid'
            },
            time: {
                type: 'string',
                example: '10:00',
                description: 'appointment time'
            },
            date: {
                type: 'string',
                example: '2024-08-15',
                description: 'appointment date'
            },
            phone: {
                type: 'string',
                example: '079234576',
                description: 'client phone number'
            },
            description: {
                type: 'string',
                example: 'i want big nails',
                description: 'optional description for master'
            },
            // REQURED FALSE
            firstName: {
                type: 'string',
                example: 'Optional? Rumble',
                description: "Optional? User's first name",
                required: ['false']
            },
            lastName: {
                type: 'string',
                example: 'Optional? Ann',
                description: "Optional? User's last name",
                required: ['false']
            },
            email: {
                type: 'string',
                example: 'Optional? ann.rumble@gmail.com',
                description: "Optional? User's mail",
                required: ['false']
            },
            birthDate: {
                type: 'string',
                example: 'Optional? 2000-08-26',
                description: "Optional? User's birth date",
                required: ['false']
            }
        }
    }
};
