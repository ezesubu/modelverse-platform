import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Models3dController } from './models3d.controller';
import { Models3dService } from './models3d.service';
import { Model3D } from './entities/model3d.entity';
import { AuthModule } from '../auth/auth.module';
import { AppGateway } from '../socket/app.gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Model3D]),
  ],
  controllers: [Models3dController],
  providers: [Models3dService, AppGateway],
})
export class Models3dModule {}
