import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException,
  Param,
  Res,
  Req,
  NotFoundException,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as fs from 'fs';
import { Response } from 'express';
import { Models3dService } from "./models3d.service";
import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateModel3dDto } from './dto/create-model3d.dto';
import { UpdateModel3dDto } from './dto/update-model3d.dto';

const MODELS_DIR = join(__dirname, '../../uploads/models3d');
const ALLOWED_EXTENSIONS = ['.glb', '.gltf', '.fbx'];


@Controller('models3d')
export class Models3dController {

  constructor(private readonly models3dService: Models3dService) {}

  @Get()
  async findAll(
      @Query('tags') tags?: string,
      @Query('author') author?: string,
      @Query('format') format?: string,
      @Query('minPrice') minPrice?: number,
      @Query('maxPrice') maxPrice?: number,
      @Query('sort') sort?: 'price' | 'uploadedAt' | 'rating',
      @Query('order') order: 'ASC' | 'DESC' = 'DESC',
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
  ) {
    return this.models3dService.findFiltered({
      tags,
      author,
      format,
      minPrice,
      maxPrice,
      sort,
      order,
      page,
      limit,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyModels(@Req() req) {
    const userId = req.user.userId;
    return this.models3dService.findModelsByUser(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    const model = await this.models3dService.findOne(id);
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: MODELS_DIR,
          filename: (req, file, callback) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            callback(null, uniqueName);
          },
        }),
        fileFilter: (req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return cb(
                new BadRequestException('Only .glb, .gltf, and .fbx files are allowed.'),
                false,
            );
          }
          cb(null, true);
        },
        limits: {
          fileSize: 20 * 1024 * 1024, // 20MB
        },
      }),
  )
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async uploadModel(
      @UploadedFile() file: Express.Multer.File,
      @Body() metadata: CreateModel3dDto,
      @Req() req
  ) {
    if (!file) {
      throw new BadRequestException('You must provide a 3D model file.');
    }

    const user = req.user.userId;
    const savedModel = await this.models3dService.createModel(file, metadata, user);

    return {
      message: 'File uploaded and model saved successfully.',
      model: savedModel,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':filename')
  getModel(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(MODELS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Model file not found');
    }

    return res.sendFile(filePath);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateModel(
      @Param('id') id: number,
      @Body() dto: UpdateModel3dDto,
      @Req() req
  ) {
    const userId = req.user.userId;
    const updated = await this.models3dService.update(id, dto, userId);
    return {
      message: 'Model updated successfully.',
      model: updated,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteModel(@Param('id') id: number) {
    return this.models3dService.deleteModel(id);
  }


}
