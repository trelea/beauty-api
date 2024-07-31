import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService) {}

    sendOTPCodeTo({
        otp,
        to,
        firstName,
        lastName
    }: {
        otp: string;
        to: string;
        firstName: string;
        lastName: string;
    }) {
        return this.mailService.sendMail({
            to,
            text: `Your OTP Code ${otp}`,
            html: `
			<!doctype html>
			<html>
				<head>
					<meta charset="UTF-8" />
    				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</head>
				<body>
					<main>
						<div>
							<h1>Hello ${firstName} ${lastName},</h1>
							<p>Thank you for register with Name. To active your account, please use the following activation code:</p>
							<h1>${otp}</h1>
							<p>Please enter this code on the activation page within the next 5 minutes.</p>
							<p>If you did not register for a Name account, please ignore this email.</p>
						</div>
					</main>
				</body>
			</html>
			`
        });
    }
}

/*
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <main class="flex h-screen w-screen items-center justify-center">
      <div class="flex max-w-lg flex-col gap-8 rounded-md border border-gray-200 bg-gray-100 px-5 py-8 shadow-2xl">
        <h1 class="text-center text-4xl font-normal">Welcome to Beauty</h1>
        <p class="text-xl font-normal">Hello ${firstName} ${lastName},</p>
        <p class="text-xl font-normal">Thank you for register with Name. To active your account, please use the following activation code:</p>
        <h1 class="text-4xl font-normal">${otp}</h1>
        <p class="text-xl font-normal">Please enter this code on the activation page within the next 5 minutes.</p>
        <p class="text-xl font-normal">If you did not register for a Name account, please ignore this email.</p>
      </div>
    </main>
  </body>
</html>
*/
