import {
    Body,
    Controller,
    Get,
    Patch,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard_ } from 'src/guards/auth.guard';
import { updateProfileDTO } from './dtos/update.profile.dto';
import { Request } from 'express';
import { SettingsService } from './settings.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { changePasswordRes, profileRes } from './docs/settings.res';
import { updateBody } from './docs/update.doc';
import { chnagePasswordDTO } from './dtos/change.password.dto';
import { changePasswordBody } from './docs/change.password.doc';

@ApiTags('Settings APIs')
@Controller('settings')
@UseGuards(AuthGuard_)
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    // GET PROFILE
    @Get('profile')
    // DOCS
    @ApiOperation({ summary: 'Get profile' })
    @ApiResponse({ type: profileRes })
    async getProfile(@Req() req: Request) {
        return this.settingsService.getProfile(req);
    }

    // UPDATE PROFILE
    @Patch('profile')
    @UsePipes(ValidationPipe)
    // DOCS
    @ApiOperation({ summary: 'Update profile' })
    @ApiBody({ ...updateBody, required: false })
    @ApiResponse({ type: profileRes })
    async updateProfile(
        @Req() req: Request,
        @Body() updateProfileDto: updateProfileDTO
    ) {
        return this.settingsService.updateProfile(req, updateProfileDto);
    }

    // CHANGE PASSWORD
    @Patch('password')
    @UsePipes(ValidationPipe)
    // DOCS
    @ApiOperation({ summary: 'Change password' })
    @ApiBody(changePasswordBody)
    @ApiResponse({ type: changePasswordRes })
    async changePassword(
        @Req() req: Request,
        @Body() changePasswordDto: chnagePasswordDTO
    ) {
        return this.settingsService.changePassword(req, changePasswordDto);
    }
}
