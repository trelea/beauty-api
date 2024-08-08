import {
    IsDateString,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length
} from 'class-validator';

export class createMasterDTO {
    @IsString()
    @Length(2, 50)
    @IsNotEmpty({ message: 'fisrtName field should not be empty' })
    readonly firstName: string;

    @IsString()
    @Length(2, 50)
    @IsNotEmpty({ message: 'lastName field should not be empty' })
    readonly lastName: string;

    @IsMobilePhone()
    @IsNotEmpty({ message: 'contact field should not be empty' })
    readonly contact: string;

    @IsEmail()
    @IsNotEmpty({ message: 'email field should not be empty' })
    readonly email: string;

    @IsDateString()
    @IsNotEmpty({ message: 'birthDate field should not be empty' })
    birthDate: Date;

    @IsString()
    @IsOptional()
    readonly description?: string;
}
