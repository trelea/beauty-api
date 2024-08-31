import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { Roles } from 'src/guards/roles';
import { MastersService } from './masters.service';
import { AuthGuard_ } from 'src/guards/auth.guard';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { masterBody } from './docs/master.body';
import { fileFiltration } from 'src/utils/thumb.util';
import {
    createMasterRes,
    getMastersCountRes,
    getMastersDtailsRes
} from './docs/masters.res';
import { createMasterDTO } from './dtos/create.master.dto';
import { updateMasterDTO } from './dtos/update.master.dto';
// import { GetMastersInterceptor } from 'src/interceptors/get.masters.interceptor';

@ApiTags('Masters APIs')
@Controller('masters')
export class MastersController {
    constructor(private readonly mastersService: MastersService) {}

    // GET MASTERS CARDS DETAILS
    @Get('details')
    @ApiOperation({ summary: 'Get master details for normal users' })
    @ApiResponse({ type: getMastersDtailsRes, isArray: true })
    async getMastersDetails() {
        return this.mastersService.getMastersDetails();
    }

    // GET MASTERS CARDS DETAILS BY SERVICE
    @Get('details/:service')
    @ApiOperation({ summary: 'Get master details for normal users by service' })
    @ApiResponse({ type: getMastersDtailsRes, isArray: true })
    async getMastersDetailsByService(
        @Param('service') service: 'Lashes' | 'Brows' | 'Nails'
    ) {
        return this.mastersService.getMastersDetailsByService(service);
    }

    // MASTERS COUNT
    @Get('count')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard, AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Get masters count' })
    @ApiResponse({ type: getMastersCountRes })
    async getMastersCount() {
        return this.mastersService.getMastersCount();
    }

    // GET MASTERS
    @Get()
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard, AuthGuard_)
    // @UseInterceptors(GetMastersInterceptor)
    // DOCS
    @ApiOperation({ summary: 'Get all masters' })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'search', required: false })
    @ApiResponse({ type: createMasterRes, isArray: true })
    async getMasters(
        @Query('page') pagination: number = 1,
        @Query('search') search: string = ''
    ) {
        return this.mastersService.getMasters(pagination, search);
    }

    // GET MASTER
    @Get(':id')
    @Roles(['ADMIN'])
    // @UseInterceptors(GetMastersInterceptor)
    @UseGuards(AdminGuard, AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Get one master' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'master id',
        required: true
    })
    @ApiResponse({ type: createMasterRes })
    async getMaster(@Param('id') id: string) {
        return this.mastersService.getMaster(id);
    }

    // CREATE MASTER
    @Post()
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard, AuthGuard_)
    @UseInterceptors(
        FileInterceptor('thumbnail', {
            fileFilter: fileFiltration,
            limits: { fileSize: 1000 * 1000 }
        })
    )
    @UsePipes(ValidationPipe)
    // DOCS
    @ApiOperation({ summary: 'Create new master' })
    @ApiQuery({ name: 'lashes', required: false })
    @ApiQuery({ name: 'brows', required: false })
    @ApiQuery({ name: 'nails', required: false })
    @ApiConsumes('multipart/form-data')
    @ApiBody(masterBody)
    @ApiResponse({ type: createMasterRes })
    async createMaster(
        @Query('lashes') lashes: boolean = false,
        @Query('brows') brows: boolean = false,
        @Query('nails') nails: boolean = false,
        @Body() createMasterDto: createMasterDTO,
        @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
        thumbnail: Express.Multer.File
    ) {
        return this.mastersService.createMaster(
            lashes,
            brows,
            nails,
            createMasterDto,
            thumbnail
        );
    }

    // UPDATE MASTER
    @Patch(':id')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard, AuthGuard_)
    @UseInterceptors(
        FileInterceptor('thumbnail', {
            fileFilter: fileFiltration,
            limits: { fileSize: 1000 * 1000 }
        })
    )
    @UsePipes(ValidationPipe)
    // DOCS
    @ApiOperation({ summary: 'Update master' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'master id',
        required: true
    })
    @ApiQuery({ name: 'lashes', required: false })
    @ApiQuery({ name: 'brows', required: false })
    @ApiQuery({ name: 'nails', required: false })
    @ApiConsumes('multipart/form-data')
    @ApiBody(masterBody)
    @ApiResponse({ type: createMasterRes })
    async updateMaster(
        @Param('id') id: string,
        @Query('lashes') lashes: boolean | null = null,
        @Query('brows') brows: boolean | null = null,
        @Query('nails') nails: boolean | null = null,
        @Body() updateMasterDto: updateMasterDTO,
        @UploadedFile(new ParseFilePipe({ fileIsRequired: false }))
        thumbnail: Express.Multer.File
    ) {
        return this.mastersService.updateMaster(
            id,
            lashes,
            brows,
            nails,
            updateMasterDto,
            thumbnail
        );
    }

    // DELETE MASTER
    @Delete(':id')
    @Roles(['ADMIN'])
    @UseGuards(AdminGuard, AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'Delete master' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'master id',
        required: true
    })
    @ApiResponse({ type: createMasterRes })
    async deleteMaster(@Param('id') id: string) {
        return this.mastersService.deleteMaster(id);
    }
}
