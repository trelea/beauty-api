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
import { Request } from 'express';
import { Roles } from 'src/guards/roles';
import { createAppointmentDTO } from '../dtos/create.appointment.dto';
import { AppointmentsBrowsService } from './appointments-brows.service';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { AuthGuard_ } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetAppointmentsInterceptor } from '../../../interceptors/get.appointments.interceptor';
import {
    createAppointmentRes,
    getAppointmentByStatusRes,
    getAppointmentsRes,
    getAvailableRes,
    patchAppointmentRes
} from '../docs/appointments.res';
import { appointmentBody } from '../docs/appointment.body';

@ApiTags('Appointments Brows APIs')
@Controller('appointments/brows')
export class AppointmentsBrowsController {
    constructor(
        private readonly appointmentsBrowsService: AppointmentsBrowsService
    ) {}

    // GET APPOINTMENTS FOR USER
    @Get()
    @UseInterceptors(GetAppointmentsInterceptor)
    @UseGuards(AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Get appointments brows' })
    @ApiResponse({ type: getAppointmentsRes, isArray: true })
    async getAppointments() {
        return this.appointmentsBrowsService.getAppointments();
    }

    // CREATE APPOINTMENT
    @Post()
    @UsePipes(ValidationPipe)
    // @UseGuards(AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Create appointment brows' })
    @ApiBody(appointmentBody)
    @ApiResponse({ type: createAppointmentRes })
    async createAppointent(
        @Req() req: Request,
        @Body() createAppointmentDto: createAppointmentDTO
    ) {
        return this.appointmentsBrowsService.createAppointment(
            req,
            createAppointmentDto
        );
    }

    // APPROVE APPOINTMENT
    @Patch('approve/:id')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    // DOCS
    @ApiOperation({ summary: 'Approve appointment brows' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'appointment id',
        required: true
    })
    @ApiResponse({ type: patchAppointmentRes })
    async approveAppointment(@Param('id') id: string) {
        return this.appointmentsBrowsService.approveAppointment(id);
    }

    // DENY APPOINTMENT
    @Patch('deny/:id')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    // DOCS
    @ApiOperation({ summary: 'Deny appointment brows' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'appointment id',
        required: true
    })
    @ApiResponse({ type: patchAppointmentRes })
    async denyAppointment(@Param('id') id: string) {
        return this.appointmentsBrowsService.denyAppointment(id);
    }

    // GET AVAILABLES
    @Get('available')
    // DOCS
    @ApiOperation({ summary: 'Get available hours brows' })
    @ApiQuery({ name: 'date', required: true, description: 'check date' })
    @ApiResponse({ type: getAvailableRes, isArray: true })
    async getAvailable(@Query('date') date: string | Date) {
        return this.appointmentsBrowsService.getAvailable(date);
    }

    // GET PENDING
    @Get('pending')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    @ApiOperation({ summary: 'Get pending appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getPending() {
        return this.appointmentsBrowsService.getPending();
    }

    // GET APPROVED
    @Get('approved')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    @ApiOperation({ summary: 'Get approved appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getApproved() {
        return this.appointmentsBrowsService.getApproved();
    }

    // GET DENIED
    @Get('denied')
    @Roles(['ADMIN'])
    @UseGuards(AuthGuard_, AdminGuard)
    @ApiOperation({ summary: 'Get denied appointments brows' })
    @ApiResponse({ type: getAppointmentByStatusRes, isArray: true })
    async getDenied() {
        return this.appointmentsBrowsService.getDenied();
    }
}
