import { IsNotEmpty, IsString } from 'class-validator';

export class loginAdminDTO {
    @IsString()
    @IsNotEmpty({ message: 'email field should not be empty' })
    readonly username: string;

    @IsString()
    @IsNotEmpty({ message: 'password field should not be empty' })
    readonly password: string;
}
