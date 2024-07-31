import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly prisma: PrismaService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
            scope: ['email', 'profile']
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const gUser = await this.prisma.googleUser.findUnique({
            where: {
                id: profile.id
            }
        })
        if (!gUser)
            await this.prisma.googleUser.create({
                data: {
                    id: profile.id,
                    profile
                }
            })

        done(null, profile)
    }
}
