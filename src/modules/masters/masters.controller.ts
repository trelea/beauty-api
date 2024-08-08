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
import { createMasterRes } from './docs/masters.res';
import { createMasterDTO } from './dtos/create.master.dto';
import { updateMasterDTO } from './dtos/update.master.dto';

@ApiTags('Masters APIs')
@Controller('masters')
@UseGuards(AdminGuard, AuthGuard_)
export class MastersController {
    constructor(private readonly mastersService: MastersService) {}

    // MASTERS COUNT
    @Get('count')
    @Roles(['ADMIN'])
    // DOCS
    @ApiOperation({ summary: 'Get masters count' })
    async getMastersCount() {
        return this.mastersService.getMastersCount();
    }

    // GET MASTERS
    @Get()
    @Roles(['ADMIN'])
    // DOCS
    @ApiOperation({ summary: 'Get all masters' })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'search', required: false })
    async getMasters(
        @Query('page') pagination: number = 1,
        @Query('search') search: string = ''
    ) {
        return this.mastersService.getMasters(pagination, search);
    }

    // GET MASTER
    @Get(':id')
    @Roles(['ADMIN'])
    // DOCS
    @ApiOperation({ summary: 'Get one master' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'master id',
        required: true
    })
    async getMaster(@Param('id') id: string) {
        return this.mastersService.getMaster(id);
    }

    // CREATE MASTER
    @Post()
    @Roles(['ADMIN'])
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
    // DOCS
    @ApiOperation({ summary: 'Delete master' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'master id',
        required: true
    })
    async deleteMaster(@Param('id') id: string) {
        return this.mastersService.deleteMaster(id);
    }
}
