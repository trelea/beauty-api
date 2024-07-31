import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(private readonly jwt: JwtService) {}

    async use(
        req: Request,
        res: Response,
        next: NextFunction | ((error?: Error | any) => void)
    ) {
        const { token } = req.params;
        if (!req.session.confirm?.payload && !req.session.confirm?.otp)
            throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

        try {
            await this.jwt.verifyAsync(token);
            if (this.jwt.decode(token).confirmOTP !== true)
                throw new HttpException({ message: 'Invalid token' }, 498);
            next();
        } catch (err) {
            throw new HttpException(err.message, 498);
        }
    }
}
