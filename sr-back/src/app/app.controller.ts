import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './entities/app.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  async getApp(): Promise<App> {
    return await this.appService.getApp();
  }

  @Put('/status')
  async setAppLastRequested(): Promise<App> {
    return await this.appService.updateAppLastRequestedAt();
  }
}
