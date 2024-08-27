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

    sendApproveMailNotification({
        to,
        client,
        date,
        time,
        service,
        master
    }: {
        to: string;
        client: string;
        date: string;
        time: string;
        service: 'lashes' | 'brows' | 'nails';
        master: string;
    }) {
        return this.mailService.sendMail({
            to,
            text: `Your Registration Was Approved`,
            subject: 'Appointment Successfully Scheduled.',
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
							<h1>Dear ${client},</h1>
							<br>
							<p>We’re pleased to confirm that your ${service} appointment at Beauty has been successfully scheduled. Your appointment is set for <strong>${date}</strong> at <strong>${time}</strong> with one of our best ${service} masters, <strong>${master}</strong>. We look forward to seeing you!</p>
							<br>
							<p>If you have any questions or need to make changes, feel free to contact us.</p>
							<br>
							<p>Best regards,</p>
							<p>Beauty</p>
						</div>
					</main>
				</body>
			</html>
			`
        });
    }

    notifyAdmin({
        to,
        service,
        date,
        time,
        master,
        contact,
        client
    }: {
        to: string;
        service: 'lashes' | 'brows' | 'nails';
        date: string;
        time: string;
        master: string;
        contact: string;
        client: string;
    }) {
        return this.mailService.sendMail({
            to,
            text: 'New Appointment Created',
            subject: 'New Appointment Created.',
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
							<h1>New Appointment</h1>
							<br>
							<p>New <strong>${service}</strong> appointment was created. Please check admin dashboard and approve it.</p>
							<br>
							<p><strong>Appointment Details:</strong></p>
							<ul>
								<li>Master: <strong>${master}</strong></li>
								<li>Date Time: <strong>${date}</strong> at <strong>${time}</strong></li>
								<li>Client Contact: ${client} <strong>${contact}</strong></li>
							</ul>
							
						</div>
					</main>
				</body>
			</html>
			`
        });
    }
}
