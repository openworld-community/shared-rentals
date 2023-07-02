import { Test, TestingModule } from '@nestjs/testing';
import { NeighbourRequirementsService } from './neighbour-requirements.service';

describe('NeighbourRequirementsService', () => {
  let service: NeighbourRequirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeighbourRequirementsService],
    }).compile();

    service = module.get<NeighbourRequirementsService>(
      NeighbourRequirementsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
