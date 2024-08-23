import { Controller, Get } from '@nestjs/common';
import { HoursService } from './hours.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Working Hours')
@Controller('hours')
export class HoursController {
    constructor(private readonly hoursService: HoursService) {}

    @Get('working')
    async getWorkingHours() {
        return this.hoursService.getWorkingHours();
    }
}
