import { Test, TestingModule } from '@nestjs/testing';
import { HouseDescriptionService } from './house-description.service';

describe('HouseDescriptionService', () => {
  let service: HouseDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseDescriptionService],
    }).compile();

    service = module.get<HouseDescriptionService>(HouseDescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
