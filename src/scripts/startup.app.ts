import { PrismaClient } from '@prisma/client';
import { createCipheriv } from 'crypto';
import * as fs from 'node:fs';
import _ from 'prompt-sync';
const input = _();

const prisma = new PrismaClient();

const setWorkHours = async () => {
    const start: number = Number(input('Work Sarts At: '));
    const end: number = Number(input('Work End At: '));
    const json: { start: number; end: number } = { start, end };
    fs.writeFile('hours.json', JSON.stringify(json), 'utf8', (err: any) => {
        if (err) console.error(err);
    });
};

const alg: string = String(process.env.ENC_ALG);
const key: Buffer = Buffer.alloc(32).fill(process.env.ENC_KEY);
const iv: Buffer = Buffer.alloc(16).fill(process.env.ENC_IV);

const cipherEncryption = (plainText: string): string => {
    const cipher = createCipheriv(alg, key, iv);
    let enc = cipher.update(plainText, 'utf8', 'hex');
    return (enc += cipher.final('hex'));
};

const main = async () => {
    let username: string = input('Admin Username: ') as string;
    let email: string = input('Admin Email: ') as string;
    let password: string = input('Admin Password: ') as string;
    username = cipherEncryption(username);
    password = cipherEncryption(password);

    const admin = await prisma.admin.create({
        data: { username, password, email }
    });
    console.log(admin);
};

main()
    .then(async () => {
        await prisma.$disconnect();
        setWorkHours();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });