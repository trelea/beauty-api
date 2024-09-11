import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createCipheriv, Cipher } from 'crypto';
import * as fs from 'node:fs';
import promptSync from 'prompt-sync';

const input = promptSync();
const prisma = new PrismaClient();

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getInput = (
    message: string,
    type: 'string' | 'number' | 'email'
): string | number => {
    let value: string = '';

    while (
        !value ||
        (type === 'number' && isNaN(Number(value))) ||
        (type === 'email' && !isValidEmail(value))
    ) {
        value = input(message);
        if (!value) {
            Logger.debug(
                process.env.ERROR_MSG_NO_TEXT || 'Input cannot be empty.'
            );
        } else if (type === 'number' && isNaN(Number(value))) {
            Logger.debug(
                process.env.ERROR_MSG_INVALID_TYPE ||
                    'Invalid number, please try again.'
            );
            value = '';
        } else if (type === 'email' && !isValidEmail(value)) {
            Logger.debug(
                process.env.ERROR_MSG_INVALID_EMAIL ||
                    'Invalid email format, please try again.'
            );
            value = '';
        }
    }

    return type === 'number' ? Number(value) : value;
};

const setWorkHours = async (): Promise<void> => {
    try {
        const start = getInput('Work Starts At: ', 'number') as number;
        const end = getInput('Work Ends At: ', 'number') as number;

        const workHours = { start, end };
        await fs.promises.writeFile(
            'hours.json',
            JSON.stringify(workHours, null, 2),
            'utf8'
        );
        Logger.log('Work hours saved successfully.');
    } catch (err) {
        Logger.error('Failed to save work hours:', err);
    }
};

// Encryption helper
const cipherEncryption = (plainText: string): string => {
    const algorithm = process.env.ENC_ALG || 'aes-256-ctr'; // Default to AES-256
    const key = Buffer.alloc(32).fill(process.env.ENC_KEY || 'default_key');
    const iv = Buffer.alloc(16).fill(process.env.ENC_IV || 'default_iv');

    const cipher: Cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
        cipher.update(plainText, 'utf8'),
        cipher.final()
    ]);

    return encrypted.toString('hex');
};

// Main function to handle admin creation and work hours
const createAdminAndSetHours = async (): Promise<void> => {
    try {
        const username = cipherEncryption(
            getInput('Admin Username: ', 'string') as string
        );
        const email = getInput('Admin Email: ', 'email') as string;
        const password = cipherEncryption(
            getInput('Admin Password: ', 'string') as string
        );

        const admin = await prisma.admin.create({
            data: { username, password, email }
        });

        Logger.log(`Admin created: \n ${JSON.stringify(admin, null, 2)}`);

        await setWorkHours();
    } catch (error) {
        Logger.error(
            'Error during admin creation or setting work hours:',
            error
        );
    } finally {
        await prisma.$disconnect();
    }
};

// Entry point
(async () => {
    await createAdminAndSetHours();
})();
