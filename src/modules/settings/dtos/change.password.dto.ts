import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class chnagePasswordDTO {
    @IsString()
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/,
        { message: 'regex error' }
    )
    @Length(10, 20)
    @IsNotEmpty({ message: 'password field should not be empty' })
    readonly password: string;

    @IsString()
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/,
        { message: 'regex error' }
    )
    @Length(10, 20)
    @IsNotEmpty({ message: 'password field should not be empty' })
    readonly new_password: string;

    @IsString()
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/,
        { message: 'regex error' }
    )
    @Length(10, 20)
    @IsNotEmpty({ message: 'password field should not be empty' })
    readonly confirm_password: string;
}
