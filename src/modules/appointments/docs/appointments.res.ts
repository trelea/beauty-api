import { ApiProperty } from '@nestjs/swagger';

class MasterRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    thumbnail: string;
    @ApiProperty()
    services: string[];
}

class UserRes {
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
}

export class getAppointmentsRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    googleUserId: string;
    @ApiProperty()
    time: string;
    @ApiProperty()
    date: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    master: MasterRes;
    @ApiProperty()
    user: UserRes | null;
    @ApiProperty()
    googleUser: any | null;
    @ApiProperty()
    created_at: string;
}

export class createAppointmentRes {
    @ApiProperty()
    service: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    time: string;
    @ApiProperty()
    date: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    master: Pick<MasterRes, 'firstName' | 'lastName'>;
}

export class getAvailableRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    thumbnail: string;
    @ApiProperty()
    registred: string[];
    @ApiProperty()
    available: (string | null)[];
}

export class patchAppointmentRes {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    status: string;
}

class _M {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    thumbnail: string;
}
class _U {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}

export class getAppointmentByStatusRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    time: string;
    @ApiProperty()
    date: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    created_at: string;
    @ApiProperty()
    updated_at: string;
    @ApiProperty()
    master: _M;
    @ApiProperty()
    googleUser: any;
    @ApiProperty()
    user: _U;
}
