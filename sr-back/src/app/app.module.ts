import { Module } from '@nestjs/common';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dbConfig from 'config/database.config';
import appConfig from 'config/application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger } from 'src/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ...configService.get<ConfigType<typeof dbConfig>>('database'),
        entities: [],
        migrations: [],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
