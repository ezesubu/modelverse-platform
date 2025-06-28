import { Test, TestingModule } from '@nestjs/testing';
import { Models3dController } from './models3d.controller';

describe('Models3dController', () => {
  let controller: Models3dController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Models3dController],
    }).compile();

    controller = module.get<Models3dController>(Models3dController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
