import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NeighbourProfileModule } from './neighbour-profile/neighbour-profile.module';

@Module({ imports: [UserModule, NeighbourProfileModule] })
export class CoreModule {}
