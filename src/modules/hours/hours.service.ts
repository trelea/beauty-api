import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

@Injectable()
export class HoursService {
    async getWorkingHours() {
        const data = JSON.parse(
            await readFileSync(
                resolve(process.cwd(), 'src', 'scripts', 'hours.json')
            ).toString()
        );
        return { ...data };
    }
}
