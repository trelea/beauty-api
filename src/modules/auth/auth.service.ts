import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { registerDTO } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { customOtpGen } from 'otp-gen-agent';
import { Request, Response } from 'express';
import { CryptoService } from 'src/utils/crypto.util';
import { MailService } from 'src/utils/mail.util';
import { otpDTO } from './dtos/otp.dto';
import { loginDTO } from './dtos/login.dto';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly crypto: CryptoService,
        private readonly mail: MailService
    ) {}

    // REGISTER
    async register(registerDto: registerDTO, req: Request) {
        registerDto.birthDate = new Date(registerDto.birthDate);
        registerDto.password = this.crypto.cipherEncryption(
            registerDto.password
        );
        const otp = await customOtpGen({ length: 4 });
        const token = await this.jwt.signAsync({
            confirmOTP: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        req.session.confirm = {
            otp,
            payload: registerDto
        };
        this.mail.sendOTPCodeTo({
            otp,
            to: registerDto.email,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName
        });
        return { token };
    }

    // ADDITIONAL TOKEN VALIDATION
    async tokenValidation(token: string) {
        return { valid: true };
    }

    // OTP VERIFICATION
    async otpVerification(token: string, otpDto: otpDTO, req: Request) {
        if (otpDto.otp !== req.session.confirm.otp)
            throw new UnauthorizedException();

        const { id, email, verified, created_at, updated_at } =
            await this.prisma.user.create({
                data: { verified: true, ...req.session.confirm.payload }
            });
        req.session.confirm = null;
        return { id, email, verified, created_at, updated_at };
    }

    // LOGIN
    async validateUser(username: string, password: string) {
        const _user = await this.prisma.user.findUnique({
            where: { email: username }
        });
        if (
            _user &&
            this.crypto.decipherDecryption(_user.password) === password
        ) {
            const { password, ...user } = _user;
            return user;
        }
        return null;
    }

    // SIGNOUT
    logout(req: Request, res: Response) {
        res.clearCookie('connect.sid');
        req.session.destroy(() => {
            return res.status(200).json({ message: 'Logout' }).end();
        });
    }
}
