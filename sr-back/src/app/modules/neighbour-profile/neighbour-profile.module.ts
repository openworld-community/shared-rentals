import { Module } from '@nestjs/common';
import { NeighbourProfileController } from './neighbour-profile.controller';
import { NeighbourProfileService } from './neighbour-profile.service';
import { AreaModule } from 'src/area/area.module';

@Module({
  imports: [AreaModule],
  controllers: [NeighbourProfileController],
  providers: [NeighbourProfileService],
})
export class NeighbourProfileModule {}
