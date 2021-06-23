import { Test, TestingModule } from '@nestjs/testing';
import { ReceivementService } from './receivement.service';

describe('ReceivementService', () => {
  let service: ReceivementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivementService],
    }).compile();

    service = module.get<ReceivementService>(ReceivementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
