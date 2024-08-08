import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from './modules/settings/settings.module';
import { MastersModule } from './modules/masters/masters.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'uploads')
        // }),
        AuthModule,
        SettingsModule,
        MastersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
