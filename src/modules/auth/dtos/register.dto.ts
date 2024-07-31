import {
    IsNotEmpty,
    IsString,
    Length,
    IsDateString,
    IsPhoneNumber,
    IsEmail,
    Matches
} from 'class-validator';

export class registerDTO {
    @IsString()
    @Length(2, 50)
    @IsNotEmpty({ message: 'fisrtName field should not be empty' })
    readonly firstName: string;

    @IsString()
    @Length(2, 50)
    @IsNotEmpty({ message: 'fisrtName field should not be empty' })
    readonly lastName: string;

    @IsPhoneNumber('MD')
    @IsNotEmpty({ message: 'phone field should not be empty' })
    readonly phone: string;

    @IsEmail()
    @IsNotEmpty({ message: 'email field should not be empty' })
    readonly email: string;

    @IsString()
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/,
        { message: 'regex error' }
    )
    @Length(10, 20)
    @IsNotEmpty({ message: 'password field should not be empty' })
    password: string;

    @IsDateString()
    @IsNotEmpty({ message: 'birthDate field should not be empty' })
    birthDate: Date;
}
