import { ApiProperty } from '@nestjs/swagger';

export class registerRes {
    @ApiProperty()
    token: string;
}

export class tokenValidationRes {
    @ApiProperty()
    valid: true;
}

export class otpVerificationRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    verified: boolean;
    @ApiProperty()
    created_at: string;
    @ApiProperty()
    updated_at: string;
}

export class loginRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    birthDate: string;
    @ApiProperty()
    verified: boolean;
    @ApiProperty()
    created_at: string;
    @ApiProperty()
    updated_at: string;
}

export class logoutRes {
    @ApiProperty()
    message: string;
}
