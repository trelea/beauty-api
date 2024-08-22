import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { createAppointmentDTO } from '../dtos/create.appointment.dto';
import { getDfaultHoursNails } from '../../../utils/hours.util';
import { MailService } from 'src/utils/mail.util';
import { isNullOrUndefined } from 'src/utils/helpers.util';

@Injectable()
export class AppointmentsNailsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) {}

    // GET APPOINTMENTS FOR USER
    async getAppointments() {
        return await this.prisma.appointmentsNails.findMany({
            where: {
                OR: [{ status: 'PENDING' }, { status: 'APPROVED' }]
            },
            select: {
                id: true,
                userId: true,
                googleUserId: true,
                time: true,
                date: true,
                status: true,
                phone: true,
                description: true,
                master: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        description: true,
                        thumbnail: true,
                        services: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        email: true
                    }
                },
                googleUser: true,
                created_at: true
            }
        });
    }

    // CREATE APPOINTMENT
    async createAppointment(
        req: Request,
        createAppointmentDto: createAppointmentDTO
    ) {
        if (
            !getDfaultHoursNails().includes(createAppointmentDto.time as string)
        ) {
            throw new BadRequestException({
                message: 'Invalid time appointment'
            });
        }
        createAppointmentDto.time = new Date(
            `${createAppointmentDto.date} ${createAppointmentDto.time}`
        );
        createAppointmentDto.date = new Date(createAppointmentDto.date);

        const registred = await this.prisma.appointmentsNails.findFirst({
            where: {
                masterId: createAppointmentDto.masterId,
                date: createAppointmentDto.date,
                time: createAppointmentDto.time,
                OR: [{ status: 'APPROVED' }, { status: 'PENDING' }]
            },
            select: { id: true }
        });
        if (registred)
            throw new BadRequestException({
                message: 'Invalid time appointment'
            });

        let { firstName, lastName, birthDate, email, ...rest } =
            createAppointmentDto;

        let unauthUser: any | undefined = undefined;
        if (
            !req.session?.user?.id &&
            !isNullOrUndefined(firstName) &&
            !isNullOrUndefined(lastName) &&
            !isNullOrUndefined(email) &&
            !isNullOrUndefined(birthDate)
        ) {
            if (birthDate) birthDate = new Date(birthDate);
            unauthUser = await this.prisma.unauthUserSource.create({
                data: { firstName, lastName, email, birthDate }
            });
        }

        try {
            return {
                service: 'brows',
                ...(await this.prisma.appointmentsNails.create({
                    data: {
                        userId: !req?.session?.user?.provider
                            ? req.session.user?.id
                            : null,
                        googleUserId:
                            req?.session?.user?.provider === 'google'
                                ? req.session.user?.id
                                : null,
                        unauthUserId: !isNullOrUndefined(unauthUser)
                            ? unauthUser.id
                            : null,
                        ...rest
                    },
                    select: {
                        status: true,
                        time: true,
                        date: true,
                        phone: true,
                        description: true,
                        master: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                }))
            };
        } catch (err) {
            throw new InternalServerErrorException(
                err,
                'InternalServerErrorException'
            );
        }
    }

    // APPROVE APPOINTMENT
    async approveAppointment(id: string) {
        const appointment = await this.prisma.appointmentsNails.update({
            where: { id },
            data: { status: 'APPROVED' },
            select: {
                id: true,
                user: true,
                googleUser: true,
                unauthUser: true,
                status: true,
                date: true,
                time: true,
                master: true
            }
        });

        let data: {
            to: string;
            client: string;
            date: string;
            time: string;
            service: 'lashes' | 'brows' | 'nails';
            master: string;
        } = {
            date: new Date(appointment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time:
                new Date(appointment.time).getHours().toString().length === 1
                    ? `0${new Date(appointment.time).getHours().toString()}:00`
                    : `${new Date(appointment.time).getHours().toString()}:00`,
            service: 'brows',
            master: `${appointment.master.firstName} ${appointment.master.lastName}`,
            to: null as string,
            client: null as string
        };

        if (
            appointment.unauthUser !== null &&
            appointment.googleUser === null &&
            appointment.user === null
        ) {
            data = {
                ...data,
                client: `${appointment.unauthUser.firstName} ${appointment.unauthUser.lastName}`,
                to: appointment.unauthUser.email
            };
            this.mailService.sendApproveMailNotification(data);
            return { _id: appointment.id, status: appointment.status };
        }

        if (
            appointment.user !== null &&
            appointment.googleUser === null &&
            appointment.unauthUser === null
        ) {
            data = {
                ...data,
                client: `${appointment.user.firstName} ${appointment.user.lastName}`,
                to: appointment.user.email
            };
            this.mailService.sendApproveMailNotification(data);
            return { _id: appointment.id, status: appointment.status };
        }

        if (
            appointment.googleUser !== null &&
            appointment.user === null &&
            appointment.unauthUser === null
        ) {
            const google = JSON.parse(JSON.stringify(appointment.googleUser));
            data = {
                ...data,
                client: google.profile.displayName as string,
                to: google.profile._json.email as string
            };
            this.mailService.sendApproveMailNotification(data);
            return { _id: appointment.id, status: appointment.status };
        }

        throw new BadRequestException({
            message: 'Controller get into execption'
        });
    }

    // DENY APPOINTMENT
    async denyAppointment(id: string) {
        const { id: _id, status } = await this.prisma.appointmentsNails.update({
            where: { id },
            data: { status: 'DENIED' }
        });
        return { _id, status };
    }

    // GET FREE HOURS AND MASTERS
    async getAvailable(date: string | Date) {
        const masters = (
            await this.prisma.master.findMany({
                where: { services: { has: 'Nails' } },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    thumbnail: true,
                    services: true
                }
            })
        ).filter((master) => master.services[0] === 'Nails');

        // CHCEK ONLY FOR APPROVED AND PENDING
        return await Promise.all(
            masters.map(async ({ services, ...m }) => {
                const registred = (
                    await this.prisma.appointmentsNails.findMany({
                        where: {
                            masterId: m.id,
                            date: new Date(date as string),
                            OR: [{ status: 'APPROVED' }, { status: 'PENDING' }]
                        },
                        select: { time: true }
                    })
                ).map((t) => {
                    const s = new Date(t.time).getHours();
                    return `${s.toString().length === 1 ? `0${s.toString()}` : s.toString()}:00`;
                });

                return {
                    ...m,
                    registred,
                    available: getDfaultHoursNails().map((h) => {
                        if (!registred.includes(h)) return h;
                    })
                };
            })
        );
    }

    // GET PENDING
    async getPending() {
        return await this.prisma.appointmentsNails.findMany({
            where: { status: 'PENDING' },
            select: {
                id: true,
                time: true,
                date: true,
                phone: true,
                description: true,
                status: true,
                created_at: true,
                updated_at: true,
                master: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        thumbnail: true
                    }
                },
                googleUser: true,
                unauthUser: {
                    select: { id: true, firstName: true, lastName: true }
                },
                user: {
                    select: { id: true, firstName: true, lastName: true }
                }
            }
        });
    }

    // GET APPROVED
    async getApproved() {
        return await this.prisma.appointmentsNails.findMany({
            where: { status: 'APPROVED' },
            select: {
                id: true,
                time: true,
                date: true,
                phone: true,
                description: true,
                status: true,
                created_at: true,
                updated_at: true,
                master: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        thumbnail: true
                    }
                },
                googleUser: true,
                unauthUser: {
                    select: { id: true, firstName: true, lastName: true }
                },
                user: {
                    select: { id: true, firstName: true, lastName: true }
                }
            }
        });
    }

    // GET DENIED
    async getDenied() {
        return await this.prisma.appointmentsNails.findMany({
            where: { status: 'DENIED' },
            select: {
                id: true,
                time: true,
                date: true,
                phone: true,
                description: true,
                status: true,
                created_at: true,
                updated_at: true,
                master: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        thumbnail: true
                    }
                },
                googleUser: true,
                unauthUser: {
                    select: { id: true, firstName: true, lastName: true }
                },
                user: {
                    select: { id: true, firstName: true, lastName: true }
                }
            }
        });
    }
}
