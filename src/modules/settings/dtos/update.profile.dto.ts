import {
    IsDateString,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length
} from 'class-validator';

export class updateProfileDTO {
    @IsString()
    @Length(2, 50)
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @Length(2, 50)
    @IsOptional()
    readonly lastName?: string;

    @IsPhoneNumber('MD')
    @IsOptional()
    readonly phone?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: Date;
}
