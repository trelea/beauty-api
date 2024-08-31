import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SharpService } from 'nestjs-sharp';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { thumbsPath } from 'src/utils/thumb.util';
import { Services } from './dtos/services.enum';
import { createMasterDTO } from './dtos/create.master.dto';
import { updateMasterDTO } from './dtos/update.master.dto';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

@Injectable()
export class MastersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly sharp: SharpService
    ) {}

    async getMastersCount() {
        return { masters: await this.prisma.master.count() };
    }

    // GET MASTERS
    async getMasters(pagination?: number, search?: string) {
        return await this.prisma.master.findMany({
            where: {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            },
            orderBy: { created_at: 'desc' },
            skip: (pagination - 1) * 10,
            take: 10
        });
    }

    // GET MASTER
    async getMaster(id: string) {
        const master = await this.prisma.master.findUnique({
            where: { id }
        });
        if (!master) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        return master;
    }

    // CREATE MASTER
    async createMaster(
        lashes: boolean,
        brows: boolean,
        nails: boolean,
        createMasterDto: createMasterDTO,
        thumbnail: Express.Multer.File
    ) {
        if (
            String(lashes) === 'false' &&
            String(brows) === 'false' &&
            String(nails) === 'false'
        )
            throw new BadRequestException(
                'Master should provide at least one service'
            );
        let services = [];
        String(lashes) === 'true'
            ? (services = [...services, Services.Lashes])
            : undefined;
        String(brows) === 'true'
            ? (services = [...services, Services.Brows])
            : undefined;
        String(nails) === 'true'
            ? (services = [...services, Services.Nails])
            : undefined;

        const fileName = `${randomUUID()}_${new Date().toISOString()}_${createMasterDto.firstName}_${createMasterDto.lastName}.png`;

        try {
            this.sharp
                .edit(thumbnail.buffer)
                .resize(348, 468)
                .png()
                .toFile(join(thumbsPath, fileName));
            createMasterDto.birthDate = new Date(createMasterDto.birthDate);
            return await this.prisma.master.create({
                data: {
                    thumbnail: fileName,
                    services,
                    ...createMasterDto
                }
            });
        } catch (err) {
            throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // UPDATE MASTER
    async updateMaster(
        id: string,
        lashes: boolean | null,
        brows: boolean | null,
        nails: boolean | null,
        updateMasterDto: updateMasterDTO,
        thumbnail: Express.Multer.File
    ) {
        const _master = await this.prisma.master.findUnique({ where: { id } });
        if (!_master)
            throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        let { services, thumbnail: thumb } = _master;

        // UPDATING SERVICES
        if (String(lashes) === 'true' && !services.includes(Services.Lashes))
            services = [...services, Services.Lashes];
        if (String(brows) === 'true' && !services.includes(Services.Brows))
            services = [...services, Services.Brows];
        if (String(nails) === 'true' && !services.includes(Services.Nails))
            services = [...services, Services.Nails];
        if (String(lashes) === 'false' && services.includes(Services.Lashes))
            services = services.filter((i) => i !== Services.Lashes);
        if (String(brows) === 'false' && services.includes(Services.Brows))
            services = services.filter((i) => i !== Services.Brows);
        if (String(nails) === 'false' && services.includes(Services.Nails))
            services = services.filter((i) => i !== Services.Nails);
        if (services.length === 0)
            throw new BadRequestException(
                'Master should provide at least one service'
            );

        if (updateMasterDto.birthDate)
            updateMasterDto.birthDate = new Date(updateMasterDto.birthDate);

        let newFileName: string | undefined;
        if (thumbnail) {
            try {
                newFileName = `${randomUUID()}_${new Date().toISOString()}_${_master.firstName}_${_master.lastName}.png`;
                await unlink(resolve(process.cwd(), 'uploads', thumb));
                this.sharp
                    .edit(thumbnail.buffer)
                    .resize(348, 468)
                    .png()
                    .toFile(join(thumbsPath, newFileName));
            } catch (err) {
                throw new HttpException(
                    err.meta,
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }

        try {
            return await this.prisma.master.update({
                where: { id },
                data: {
                    ...updateMasterDto,
                    thumbnail: thumbnail ? newFileName : thumb,
                    services
                }
            });
        } catch (err) {
            throw new HttpException(err.meta, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE MASTER
    async deleteMaster(id: string) {
        try {
            return await this.prisma.master.delete({ where: { id } });
        } catch (err) {
            throw new HttpException(err.meta, HttpStatus.NOT_FOUND);
        }
    }

    // GET MASTERS CARDS DETAILS
    async getMastersDetails() {
        return await this.prisma.master.findMany({
            select: {
                firstName: true,
                lastName: true,
                thumbnail: true,
                services: true,
                description: true
            }
        });
    }

    // GET MASTERS CARDS DETAILS
    async getMastersDetailsByService(service: 'Lashes' | 'Brows' | 'Nails') {
        try {
            return await this.prisma.master.findMany({
                where: { services: { has: service } },
                select: {
                    firstName: true,
                    lastName: true,
                    thumbnail: true,
                    services: true,
                    description: true
                }
            });
        } catch (err) {
            throw new BadRequestException({
                services: ['Lashes', 'Nails', 'Brows']
            });
        }
    }
}
