import { Test, TestingModule } from '@nestjs/testing';
import { NeighbourRequirementsController } from './neighbour-requirements.controller';

describe('NeighbourRequirementsController', () => {
  let controller: NeighbourRequirementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeighbourRequirementsController],
    }).compile();

    controller = module.get<NeighbourRequirementsController>(
      NeighbourRequirementsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
