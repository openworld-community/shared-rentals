import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(App) private appRepository: Repository<App>) {}
  getApp(): Promise<App> {
    return this.appRepository.findOneOrFail({});
  }
}
