import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dbConfig from 'config/database.config';
import appConfig from 'config/application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { logger } from 'src/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ...configService.get<ConfigType<typeof dbConfig>>('database'),
        // TODO: use autowire injector
        entities: [App],
        migrations: [],
      }),
    }),
    TypeOrmModule.forFeature([App]),
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
