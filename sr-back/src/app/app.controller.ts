import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './entities/app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  getApp(): Promise<App> {
    return this.appService.getApp();
  }

  @Put('/status')
  setAppLastRequested(): Promise<App> {
    return this.appService.updateAppLastRequestedAt();
  }
}
