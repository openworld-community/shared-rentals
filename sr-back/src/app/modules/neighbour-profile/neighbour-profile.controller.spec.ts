import { Test, TestingModule } from '@nestjs/testing';
import { NeighbourProfileController } from './neighbour-profile.controller';

describe('NeighbourProfileController', () => {
  let controller: NeighbourProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeighbourProfileController],
    }).compile();

    controller = module.get<NeighbourProfileController>(
      NeighbourProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
