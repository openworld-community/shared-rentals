import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './entities/app.entity';
import { ApiTags } from '@nestjs/swagger';
import { WithUser } from '@common/decorators/WithUser';
import { User } from '@modules/user/entities/user.entity';
import { ADMIN, MustBe } from '@common/decorators/MustBe';

@Controller()
@ApiTags('Status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  async getApp(@WithUser() user: User): Promise<App> {
    console.log(user);
    return await this.appService.getApp();
  }

  @MustBe(ADMIN)
  @Put('/status')
  async setAppLastRequested(): Promise<App> {
    return await this.appService.updateAppLastRequestedAt();
  }
}
