import { IsNotEmpty, IsString, Length } from 'class-validator';

export class otpDTO {
    @IsString()
    @IsNotEmpty({ message: 'otp field should not be empty' })
    @Length(4, 4)
    readonly otp: string;
}
