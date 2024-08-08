import {
    IsDateString,
    IsEmail,
    IsMobilePhone,
    IsOptional,
    IsString,
    Length
} from 'class-validator';

export class updateMasterDTO {
    @IsString()
    @Length(2, 50)
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @Length(2, 50)
    @IsOptional()
    readonly lastName?: string;

    @IsMobilePhone()
    @IsOptional()
    readonly contact?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: Date;

    @IsString()
    @IsOptional()
    readonly description?: string;
}
