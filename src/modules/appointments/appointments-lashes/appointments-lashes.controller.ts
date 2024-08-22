import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { AuthGuard_ } from 'src/guards/auth.guard';
import { GetAppointmentsInterceptor } from 'src/interceptors/get.appointments.interceptor';
import {
    createAppointmentRes,
    getAppointmentByStatusRes,
    getAppointmentsRes,
    getAvailableRes,
    patchAppointmentRes
} from '../docs/appointments.res';
import { appointmentBody } from '../docs/appointment.body';
import { createAppointmentDTO } from '../dtos/create.appointment.dto';
import { Roles } from 'src/guards/roles';
import { AdminGuard } from 'src/guards/admin.guard';
import { AppointmentsLashesService } from './appointments-lashes.service';
import { Request } from 'express';

@ApiTags('Appointments Lashes APIs')
// @UseGuards(AuthGuard_)
@Controller('appointments/lashes')
export class AppointmentsLashesController {
    constructor(
        private readonly appointmentsLashesService: AppointmentsLashesService
    ) {}

    // GET APPOINTMENTS FOR ADMIN AND USER
    @Get()
    @UseInterceptors(GetAppointmentsInterceptor)
    @UseGuards(AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Get appointments lashes' })
    @ApiResponse({ type: getAppointmentsRes, isArray: true })
    async getAppointments() {
        return this.appointmentsLashesService.getAppointments();
    }

    // CREATE APPOINTMENT
    @Post()
    @UsePipes(ValidationPipe)
    // @UseGuards(AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Create appointment lashes' })
    @ApiBody(appointmentBody)
    @ApiResponse({ type: createAppointmentRes })
    async createAppointent(
        @Req() req: Request,
        @Body() createAppointmentDto: createAppointmentDTO
    ) {
        return this.appointmentsLashesService.createAppointment(
            req,
            createAppointmentDto
        );
    }

    // APPROVE APPOINTMENT
    @Patch('approve/:id')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    // DOCS
    @ApiOperation({ summary: 'Approve appointment lashes' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'appointment id',
        required: true
    })
    @ApiResponse({ type: patchAppointmentRes })
    async approveAppointment(@Param('id') id: string) {
        return this.appointmentsLashesService.approveAppointment(id);
    }

    // DENY APPOINTMENT
    @Patch('deny/:id')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    // DOCS
    @ApiOperation({ summary: 'Deny appointment lashes' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'appointment id',
        required: true
    })
    @ApiResponse({ type: patchAppointmentRes })
    async denyAppointment(@Param('id') id: string) {
        return this.appointmentsLashesService.denyAppointment(id);
    }

    // GET AVAILABLES
    @Get('available')
    // DOCS
    @ApiOperation({ summary: 'Get available hours lashes' })
    @ApiQuery({ name: 'date', required: true, description: 'check date' })
    @ApiResponse({ type: getAvailableRes, isArray: true })
    async getAvailable(@Query('date') date: string | Date) {
        return this.appointmentsLashesService.getAvailable(date);
    }

    // GET PENDING
    @Get('pending')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    @ApiOperation({ summary: 'Get pending appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getPending() {
        return this.appointmentsLashesService.getPending();
    }

    // GET APPROVED
    @Get('approved')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    @ApiOperation({ summary: 'Get approved appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getApproved() {
        return this.appointmentsLashesService.getApproved();
    }

    // GET DENIED
    @Get('denied')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    @ApiOperation({ summary: 'Get denied appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getDenied() {
        return this.appointmentsLashesService.getDenied();
    }
}
