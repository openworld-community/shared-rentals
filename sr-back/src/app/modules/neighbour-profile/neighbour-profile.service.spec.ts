import { Test, TestingModule } from '@nestjs/testing';
import { NeighbourProfileService } from './neighbour-profile.service';

describe('NeighbourProfileService', () => {
  let service: NeighbourProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeighbourProfileService],
    }).compile();

    service = module.get<NeighbourProfileService>(NeighbourProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
