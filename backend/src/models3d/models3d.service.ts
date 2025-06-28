import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model3D } from './entities/model3d.entity';
import { CreateModel3dDto } from './dto/create-model3d.dto';
import { UpdateModel3dDto } from './dto/update-model3d.dto';
import * as fs from 'fs';
import { join } from 'path';
import { AppGateway } from '../socket/app.gateway';

const MODELS_DIR = join(__dirname, '../../uploads/models3d');

@Injectable()
export class Models3dService {

    constructor(
        @InjectRepository(Model3D)
        private readonly model3DRepo: Repository<Model3D>,
        private readonly configService: ConfigService,
        private gateway: AppGateway
    ) {}

    async createModel(file: Express.Multer.File, dto: CreateModel3dDto, userId: number) {
        const baseUrl = this.configService.get<string>('BASE_URL');

        const newModel = this.model3DRepo.create({
            ...dto,
            filename: file.filename,
            url: `${baseUrl}/files/models3d/${file.filename}`,
            uploadedAt: new Date(),
            user: { id: userId },
        });

        const savedModel = await this.model3DRepo.save(newModel);

        this.gateway.broadcastModelUpdate({
            type: 'create',
            model: savedModel,
        });


        return savedModel;
    }

    async findAll() {
        return this.model3DRepo.find({ order: { uploadedAt: 'DESC' } });
    }

    async findOne(id: number) {
        return this.model3DRepo.findOne({
            where: { id },
        });
    }

    async findFiltered(params: {
        tags?: string;
        author?: string;
        format?: string;
        minPrice?: number;
        maxPrice?: number;
        sort?: string;
        order: 'ASC' | 'DESC';
        page: number;
        limit: number;
    }) {
        const qb = this.model3DRepo.createQueryBuilder('model');

        if (params.tags) {
            qb.andWhere('model.tags ILIKE :tags', { tags: `%${params.tags}%` });
        }

        if (params.author) {
            qb.andWhere('model.author ILIKE :author', { author: `%${params.author}%` });
        }

        if (params.format) {
            qb.andWhere('model.format = :format', { format: params.format });
        }

        if (params.minPrice !== undefined) {
            qb.andWhere('model.price >= :minPrice', { minPrice: params.minPrice });
        }

        if (params.maxPrice !== undefined) {
            qb.andWhere('model.price <= :maxPrice', { maxPrice: params.maxPrice });
        }

        if (params.sort) {
            qb.orderBy(`model.${params.sort}`, params.order);
        } else {
            qb.orderBy('model.uploadedAt', 'DESC');
        }

        const skip = (params.page - 1) * params.limit;

        qb.skip(skip).take(params.limit);

        const [results, total] = await qb.getManyAndCount();

        return {
            data: results,
            total,
            page: params.page,
            limit: params.limit,
        };
    }

    async update(id: number, dto: UpdateModel3dDto, userId: number) {
        const model = await this.model3DRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!model) {
            throw new NotFoundException(`Model with ID ${id} not found`);
        }

        if (model.user.id !== userId) {
            throw new ForbiddenException('You are not allowed to edit this model');
        }

        const updated = Object.assign(model, dto);
        return this.model3DRepo.save(updated);
    }


    async deleteModel(id: number) {
        const model = await this.model3DRepo.findOneBy({ id });

        if (!model) {
            throw new NotFoundException(`Model with ID ${id} not found`);
        }

        // Eliminar archivo físico si existe
        const filePath = join(MODELS_DIR, model.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Eliminar de la base de datos
        await this.model3DRepo.delete(id);

        return { message: 'Model deleted successfully.' };
    }


    async findModelsByUser(userId: number): Promise<Model3D[]> {
        return this.model3DRepo.find({
            where: { user: { id: userId } },
        });
    }

}
