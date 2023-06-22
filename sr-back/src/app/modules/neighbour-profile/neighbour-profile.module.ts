import { Module } from '@nestjs/common';
import { NeighbourProfileController } from './neighbour-profile.controller';
import { NeighbourProfileService } from './neighbour-profile.service';
import { AreaModule } from 'src/area/area.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AreaModule, UserModule],
  controllers: [NeighbourProfileController],
  providers: [NeighbourProfileService],
})
export class NeighbourProfileModule {}
