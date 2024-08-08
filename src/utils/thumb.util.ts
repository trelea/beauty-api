import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { resolve } from 'path';

export const fileFiltration = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
) => {
    if (
        !file.originalname ||
        !file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)
    )
        return cb(
            new BadRequestException(
                'Accepted only: jpg|webp|png|jpeg Extensions'
            ),
            false
        );
    return cb(null, true);
};

export const thumbsPath = resolve(process.cwd(), 'uploads');
