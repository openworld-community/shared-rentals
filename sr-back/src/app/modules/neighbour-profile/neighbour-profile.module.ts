import { Module } from '@nestjs/common';
import { NeighbourProfileController } from './neighbour-profile.controller';
import { NeighbourProfileService } from './neighbour-profile.service';
import { AreaModule } from 'src/area/area.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [AreaModule, UserModule, TypeOrmModule.forFeature([User])],
  controllers: [NeighbourProfileController],
  providers: [NeighbourProfileService],
})
export class NeighbourProfileModule {}
