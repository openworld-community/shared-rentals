import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HouseDescriptionModule } from './house-description/house-description.module';

@Module({ imports: [UserModule, HouseDescriptionModule] })
export class CoreModule {}
