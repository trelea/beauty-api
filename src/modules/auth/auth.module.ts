import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from 'src/utils/crypto.util';
import { MailService } from 'src/utils/mail.util';
import { MailerModule } from '@nestjs-modules/mailer';
import { TokenMiddleware } from 'src/middlewares/token.validation';
import { RegisterMiddleware } from 'src/middlewares/register.middleware';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/strategies/google.strategy';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '5m' }
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.BREVO_HOST,
                port: Number(process.env.BREVO_PORT),
                auth: {
                    user: process.env.BREVO_USER,
                    pass: process.env.BREVO_PASS
                }
            },
            defaults: {
                from: '"No Reply" <beauty-salon@mail.com>',
                subject: 'One-Time Password Verification.'
            }
        }),
        PassportModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        PrismaService,
        CryptoService,
        MailService,
        LocalStrategy,
        GoogleStrategy
    ]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes({
            path: '/auth/validation/:token',
            method: RequestMethod.GET
        });

        consumer.apply(TokenMiddleware).forRoutes({
            path: '/auth/verification/:token',
            method: RequestMethod.POST
        });

        consumer.apply(RegisterMiddleware).forRoutes({
            path: '/auth/register',
            method: RequestMethod.POST
        });
    }
}
