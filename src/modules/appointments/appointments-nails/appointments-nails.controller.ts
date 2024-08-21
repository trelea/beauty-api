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
import { AppointmentsNailsService } from './appointments-nails.service';
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
import { Request } from 'express';
import { Roles } from 'src/guards/roles';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Appointments Nails APIs')
@UseGuards(AuthGuard_)
@Controller('appointments/nails')
export class AppointmentsNailsController {
    constructor(
        private readonly appointmentsNailsService: AppointmentsNailsService
    ) {}

    // GET APPOINTMENTS FOR ADMIN AND USER
    @Get()
    @UseInterceptors(GetAppointmentsInterceptor)
    // DOCS
    @ApiOperation({ summary: 'Get appointments nails' })
    @ApiResponse({ type: getAppointmentsRes, isArray: true })
    async getAppointments() {
        return this.appointmentsNailsService.getAppointments();
    }

    // CREATE APPOINTMENT
    @Post()
    @UsePipes(ValidationPipe)
    // DOCS
    @ApiOperation({ summary: 'Create appointment nails' })
    @ApiBody(appointmentBody)
    @ApiResponse({ type: createAppointmentRes })
    async createAppointent(
        @Req() req: Request,
        @Body() createAppointmentDto: createAppointmentDTO
    ) {
        return this.appointmentsNailsService.createAppointment(
            req,
            createAppointmentDto
        );
    }

    // APPROVE APPOINTMENT
    @Patch('approve/:id')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard)
    // DOCS
    @ApiOperation({ summary: 'Approve appointment nails' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'appointment id',
        required: true
    })
    @ApiResponse({ type: patchAppointmentRes })
    async approveAppointment(@Param('id') id: string) {
        return this.appointmentsNailsService.approveAppointment(id);
    }

    // DENY APPOINTMENT
    @Patch('deny/:id')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard)
    // DOCS
    @ApiOperation({ summary: 'Deny appointment nails' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'appointment id',
        required: true
    })
    @ApiResponse({ type: patchAppointmentRes })
    async denyAppointment(@Param('id') id: string) {
        return this.appointmentsNailsService.denyAppointment(id);
    }

    // GET AVAILABLES
    @Get('available')
    // DOCS
    @ApiOperation({ summary: 'Get available hours nails' })
    @ApiQuery({ name: 'date', required: true, description: 'check date' })
    @ApiResponse({ type: getAvailableRes, isArray: true })
    async getAvailable(@Query('date') date: string | Date) {
        return this.appointmentsNailsService.getAvailable(date);
    }

    // GET PENDING
    @Get('pending')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Get pending appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getPending() {
        return this.appointmentsNailsService.getPending();
    }

    // GET APPROVED
    @Get('approved')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Get approved appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getApproved() {
        return this.appointmentsNailsService.getApproved();
    }

    // GET DENIED
    @Get('denied')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Get denied appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getDenied() {
        return this.appointmentsNailsService.getDenied();
    }
}
