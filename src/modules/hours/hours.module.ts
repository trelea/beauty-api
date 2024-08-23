import { Module } from '@nestjs/common';
import { HoursController } from './hours.controller';
import { HoursService } from './hours.service';

@Module({
    controllers: [HoursController],
    providers: [HoursService]
})
export class HoursModule {}
