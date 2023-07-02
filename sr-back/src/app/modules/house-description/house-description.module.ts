import { Module } from '@nestjs/common';
import { HouseDescriptionController } from './house-description.controller';
import { HouseDescriptionService } from './house-description.service';

@Module({
  controllers: [HouseDescriptionController],
  providers: [HouseDescriptionService],
})
export class HouseDescriptionModule {}
