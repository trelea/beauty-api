import { Module } from '@nestjs/common';
import { AppointmentsLashesController } from './appointments-lashes/appointments-lashes.controller';
import { AppointmentsLashesService } from './appointments-lashes/appointments-lashes.service';
import { AppointmentsNailsController } from './appointments-nails/appointments-nails.controller';
import { AppointmentsNailsService } from './appointments-nails/appointments-nails.service';
import { AppointmentsBrowsController } from './appointments-brows/appointments-brows.controller';
import { AppointmentsBrowsService } from './appointments-brows/appointments-brows.service';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/utils/mail.util';

@Module({
    controllers: [
        AppointmentsBrowsController,
        AppointmentsLashesController,
        AppointmentsNailsController
    ],
    providers: [
        AppointmentsBrowsService,
        AppointmentsLashesService,
        AppointmentsNailsService,
        PrismaService,
        MailService
    ]
})
export class AppointmentsModule {}
