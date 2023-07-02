import { Module } from '@nestjs/common';
import { HouseDescriptionController } from './house-description.controller';
import { HouseDescriptionService } from './house-description.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseDescription } from './entities/house-description.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([HouseDescription]), UserModule],
  controllers: [HouseDescriptionController],
  providers: [HouseDescriptionService],
})
export class HouseDescriptionModule {}
