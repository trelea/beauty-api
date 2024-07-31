import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
    constructor(private readonly prisma: PrismaService) {}

    async use(
        req: Request,
        res: Response,
        next: NextFunction | ((error?: Error | any) => void)
    ) {
        if (
            await this.prisma.user.findFirst({
                where: { email: req.body.email }
            })
        )
            throw new HttpException(
                { message: 'Resources Already Used' },
                HttpStatus.CONFLICT
            );
        next();
    }
}
