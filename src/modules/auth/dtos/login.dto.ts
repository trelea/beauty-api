import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

export class loginDTO {
    @IsEmail()
    @IsNotEmpty({ message: 'email field should not be empty' })
    readonly email: string;

    @IsString()
    @Length(10, 20)
    @IsNotEmpty({ message: 'password field should not be empty' })
    readonly password: string;
}
