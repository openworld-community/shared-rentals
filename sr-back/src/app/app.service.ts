import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(App) private appRepository: Repository<App>) {}
  getApp(): Promise<App> {
    return this.appRepository.findOneOrFail({ where: { id: 1 } });
  }

  updateAppLastRequestedAt(): Promise<App> {
    return this.appRepository.save({ id: 1, lastRequestedAt: new Date() });
  }
}
