import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from './modules/settings/settings.module';
import { MastersModule } from './modules/masters/masters.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { HoursModule } from './modules/hours/hours.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        SettingsModule,
        MastersModule,
        AppointmentsModule,
        HoursModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
