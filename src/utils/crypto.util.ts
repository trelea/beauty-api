import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class CryptoService {
    private readonly alg: string = String(process.env.ENC_ALG);
    private readonly key: Buffer = Buffer.alloc(32).fill(process.env.ENC_KEY);
    private readonly iv: Buffer = Buffer.alloc(16).fill(process.env.ENC_IV);

    // ENCRYPTION
    cipherEncryption(plainText: string): string {
        const cipher = createCipheriv(this.alg, this.key, this.iv);
        let enc = cipher.update(plainText, 'utf8', 'hex');
        return (enc += cipher.final('hex'));
    }

    // DECRYPTION
    decipherDecryption(encPass: string): string {
        const decipher = createDecipheriv(this.alg, this.key, this.iv);
        let dec = decipher.update(encPass, 'hex', 'utf-8');
        return (dec += decipher.final('utf8'));
    }
}
