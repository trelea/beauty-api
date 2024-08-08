import { ApiProperty } from '@nestjs/swagger';

export class profileRes {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly birthDate: string;

    @ApiProperty()
    readonly verified: boolean;

    @ApiProperty()
    readonly created_at: string;

    @ApiProperty()
    readonly updated_at: string;
}

export class changePasswordRes {
    @ApiProperty()
    readonly UPDATED: boolean;
}
