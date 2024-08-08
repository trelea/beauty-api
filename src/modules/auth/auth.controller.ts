import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { registerDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { otpDTO } from './dtos/otp.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuard_ } from 'src/guards/auth.guard';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { signupBody } from './docs/signup.docs';
import {
    loginRes,
    logoutRes,
    otpVerificationRes,
    registerRes,
    tokenValidationRes
} from './docs/auth.res';
import { otpBody } from './docs/otp.docs';
import { loginBody } from './docs/login.docs';
import { loginAdminDTO } from './dtos/login.admin.dto';

@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // REGISTER
    @Post('register')
    // @UsePipes(ValidationPipe)
    //DOCS
    @ApiOperation({ summary: 'Register new user' })
    @ApiBody(signupBody)
    @ApiResponse({ type: registerRes })
    async register(@Body() registerDto: registerDTO, @Req() req: Request) {
        return this.authService.register(registerDto, req);
    }

    // ADITIONAL STEP TOKEN VALIDATION FOR FRONTEND
    @Get('validate/:token')
    // DOCS
    @ApiOperation({ summary: 'Validate token for otp' })
    @ApiParam({
        name: 'token',
        type: String,
        description: 'unique token',
        required: true
    })
    @ApiResponse({ type: tokenValidationRes })
    async tokenValidation(@Param('token') token: string) {
        return this.authService.tokenValidation(token);
    }

    // STEP 2 OTP VERIFICATION
    @Post('verify/:token')
    @UsePipes(ValidationPipe)
    // DOCS
    @ApiOperation({ summary: 'OTP Verification' })
    @ApiParam({
        name: 'token',
        type: String,
        description: 'unique token',
        required: true
    })
    @ApiBody(otpBody)
    @ApiResponse({ type: otpVerificationRes })
    async otpVerification(
        @Param('token') token: string,
        @Body() otpDto: otpDTO,
        @Req() req: Request
    ) {
        return this.authService.otpVerification(token, otpDto, req);
    }

    // LOGIN
    @Post('login')
    @UseGuards(AuthGuard('local'))
    // DOCS
    @ApiOperation({ summary: 'Login' })
    @ApiBody(loginBody)
    @ApiResponse({ type: loginRes })
    async login(@Req() req: Request) {
        req.session.user = req.user;
        return req.user;
    }

    // GOOGLE
    @Get('google')
    @UseGuards(AuthGuard('google'))
    // DOCS
    @ApiOperation({ summary: 'Signin with google' })
    async googleAuth() {}

    // GOOGLE CALLBACK
    @Get('google-redirect')
    @UseGuards(AuthGuard('google'))
    // DOCS
    @ApiOperation({ summary: 'Signin with google redirection link' })
    googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        return this.authService.googleAuthRedirect(req, res);
    }

    // LOGOUT
    @Post('logout')
    @UseGuards(AuthGuard_)
    // DOCS
    @ApiOperation({ summary: 'logout' })
    @ApiResponse({ type: logoutRes })
    async logout(@Req() req: Request, @Res() res: Response) {
        return this.authService.logout(req, res);
    }

    // TEST PURPOSE
    // GET SESSION.USER
    @Get('/google/session')
    async getSession(@Req() req: Request) {
        return req.session.user;
    }

    // AUTH ADMIN
    @Post('admin')
    @UsePipes(ValidationPipe)
    async adminAuth(@Req() req: Request, @Body() loginAdminDto: loginAdminDTO) {
        return this.authService.adminAuth(req, loginAdminDto);
    }
}
