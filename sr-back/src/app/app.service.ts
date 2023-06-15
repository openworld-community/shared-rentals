import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App) private readonly appRepository: Repository<App>,
  ) {}

  async getApp(): Promise<App> {
    return await this.appRepository.findOneOrFail({ where: { id: 1 } });
  }

  async updateAppLastRequestedAt(): Promise<App> {
    return await this.appRepository.save({
      id: 1,
      lastRequestedAt: new Date(),
    });
  }
}
