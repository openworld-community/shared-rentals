import { Test, TestingModule } from '@nestjs/testing';
import { HouseDescriptionController } from './house-description.controller';

describe('HouseDescriptionController', () => {
  let controller: HouseDescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseDescriptionController],
    }).compile();

    controller = module.get<HouseDescriptionController>(
      HouseDescriptionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
