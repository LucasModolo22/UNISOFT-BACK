import { Test, TestingModule } from '@nestjs/testing';
import { ReceivementController } from './receivement.controller';

describe('ReceivementController', () => {
  let controller: ReceivementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivementController],
    }).compile();

    controller = module.get<ReceivementController>(ReceivementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
