import { ApiProperty } from '@nestjs/swagger';

export class getMastersCountRes {
    @ApiProperty()
    masters: number;
}

export class createMasterRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    contact: string;
    @ApiProperty()
    birthDate: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    thumbnail: string;
    @ApiProperty()
    services: string[];
    @ApiProperty()
    created_at: string;
    @ApiProperty()
    updated_at: string;
}
