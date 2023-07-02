import { Module } from '@nestjs/common';
import { NeighbourRequirementsController } from './neighbour-requirements.controller';
import { NeighbourRequirementsService } from './neighbour-requirements.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NeighbourRequirements } from './entities/neighbour-requirements.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([NeighbourRequirements])],
  controllers: [NeighbourRequirementsController],
  providers: [NeighbourRequirementsService],
})
export class NeighbourRequirementsModule {}
