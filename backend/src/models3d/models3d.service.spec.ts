import { Test, TestingModule } from '@nestjs/testing';
import { Models3dService } from './models3d.service';

describe('Models3dService', () => {
  let service: Models3dService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Models3dService],
    }).compile();

    service = module.get<Models3dService>(Models3dService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
