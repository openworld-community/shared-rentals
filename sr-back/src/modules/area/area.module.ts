import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area } from './entities/area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AreaController],
  providers: [AreaService],
  imports: [TypeOrmModule.forFeature([Area])],
})
export class AreaModule {}
