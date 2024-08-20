import {
    IsDateString,
    IsMobilePhone,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsTimeZone,
    IsUUID
} from 'class-validator';

export class createAppointmentDTO {
    @IsUUID()
    @IsNotEmpty({ message: 'masterId field should not be empty' })
    readonly masterId: string;

    @IsString()
    @IsNotEmpty({ message: 'time field should not be empty' })
    time: string | Date;

    @IsDateString()
    @IsNotEmpty({ message: 'date field should not be empty' })
    date: string | Date;

    @IsMobilePhone()
    @IsNotEmpty({ message: 'phone field should not be empty' })
    readonly phone: string;

    @IsString()
    @IsOptional()
    readonly description: string;
}
