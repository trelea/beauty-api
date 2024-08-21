import { Module } from '@nestjs/common';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { PrismaService } from 'prisma/prisma.service';
import { SharpModule } from 'nestjs-sharp';

@Module({
    imports: [SharpModule],
    controllers: [MastersController],
    providers: [MastersService, PrismaService]
})
export class MastersModule {}
