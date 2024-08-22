import {
    IsDateString,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Length
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
    readonly description?: string;

    // UNAUTH USER
    @IsString()
    @Length(2, 50)
    @IsOptional()
    readonly firstName?: string;
    @IsString()
    @Length(2, 50)
    @IsOptional()
    readonly lastName?: string;
    @IsEmail()
    @IsOptional()
    readonly email?: string;
    @IsDateString()
    @IsOptional()
    birthDate?: Date;
}
