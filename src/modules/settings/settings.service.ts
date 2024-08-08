import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { updateProfileDTO } from './dtos/update.profile.dto';
import { CryptoService } from 'src/utils/crypto.util';
import { chnagePasswordDTO } from './dtos/change.password.dto';

@Injectable()
export class SettingsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly crypto: CryptoService
    ) {}
    // GET PROFILE
    async getProfile(req: Request) {
        const { password, ...user } = await this.prisma.user.findUnique({
            where: { id: req.session.user.id }
        });
        return { ...user };
    }

    // UPDATE PROFILE
    async updateProfile(req: Request, updateProfileDto: updateProfileDTO) {
        if (updateProfileDto?.birthDate)
            updateProfileDto.birthDate = new Date(updateProfileDto.birthDate);
        const { password, ...user } = await this.prisma.user.update({
            where: { id: req.session.user.id },
            data: updateProfileDto
        });
        return { ...user };
    }

    // CHANGE PASSWORD
    async changePassword(req: Request, changePasswordDto: chnagePasswordDTO) {
        const { password } = await this.prisma.user.findUnique({
            where: { id: req.session.user.id }
        });
        if (
            changePasswordDto.password !==
            this.crypto.decipherDecryption(password)
        )
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

        if (
            changePasswordDto.new_password !==
            changePasswordDto.confirm_password
        )
            throw new HttpException(
                { message: 'new password should match with confirm password' },
                HttpStatus.BAD_REQUEST
            );

        try {
            await this.prisma.user.update({
                where: { id: req.session.user.id },
                data: {
                    password: this.crypto.cipherEncryption(
                        changePasswordDto.new_password
                    )
                }
            });
            return { UPDATED: true };
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
