import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly prisma: PrismaService
        // private readonly options: AuthModuleOptions
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
            scope: ['email', 'profile']
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        let timeStamptz: {
            created_at: string | Date;
            updated_at: string | Date;
        };
        const gUser = await this.prisma.googleUser.findUnique({
            where: {
                id: profile.id
            }
        });

        if (!gUser) {
            const { created_at, updated_at } =
                await this.prisma.googleUser.create({
                    data: {
                        id: profile.id,
                        profile
                    }
                });
            timeStamptz = { created_at, updated_at };
        }

        if (gUser)
            timeStamptz = {
                created_at: gUser.created_at,
                updated_at: gUser.updated_at
            };

        done(null, {
            ...profile,
            ...timeStamptz
        });
    }

    // public successRedirect: string = this.options[process.env.SUCCESS_LINK];
    // public failureRedirect: string = this.options[process.env.FAIL_LINK];
}
