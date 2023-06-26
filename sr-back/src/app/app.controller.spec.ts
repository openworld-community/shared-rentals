import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { App } from './entities/app.entity';

describe('AppController', () => {
  let appController: AppController;
  const mockApp = { id: 0, lastRequestedAt: new Date() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(App),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(mockApp),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return App data', async () => {
      expect(await appController.getApp()).toBe(mockApp);
    });
  });
});
