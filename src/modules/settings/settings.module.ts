import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { PrismaService } from 'prisma/prisma.service';
import { CryptoService } from 'src/utils/crypto.util';

@Module({
    controllers: [SettingsController],
    providers: [SettingsService, PrismaService, CryptoService]
})
export class SettingsModule {}
