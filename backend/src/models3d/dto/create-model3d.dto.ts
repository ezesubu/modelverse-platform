import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    IsUrl,
    IsIn,
    Min,
    Max,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModel3dDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsIn(['glb', 'gltf', 'fbx', 'obj'])
    format?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    sizeMB?: number;

    @IsOptional()
    @IsString()
    tags?: string;

    @IsOptional()
    @IsString()
    license?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsUrl()
    previewImage?: string;

    @IsOptional()
    @IsUrl()
    videoUrl?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    @IsIn(['USD', 'EUR', 'COP', 'ARS'])
    currency?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    views?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    reviewCount?: number;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    refundable?: boolean;
}
