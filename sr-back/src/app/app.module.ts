import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dbConfig from 'config/database.config';
import appConfig from 'config/application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { logger } from 'src/middlewares/logger.middleware';
import { AreaModule } from 'src/area/area.module';
import { CoreModule } from './modules/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // First found variable takes precedence, so local env first
      envFilePath: ['.env.local', '.env'],
      load: [appConfig, dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ...configService.get<ConfigType<typeof dbConfig>>('database'),
        autoLoadEntities: true,
        migrations: [],
      }),
    }),
    TypeOrmModule.forFeature([App]),
    CoreModule,
    AreaModule,
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
