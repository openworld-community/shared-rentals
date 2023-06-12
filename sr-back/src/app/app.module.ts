import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import dbConfig from '@config/database.config';
import appConfig from '@config/application.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { logger } from '@common/middlewares/logger.middleware';
import authConfig from 'config/auth.config';
import { AuthModule } from 'src/auth/auth.module';
import redisConfig from '@config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // First found variable takes precedence, so local env first
      envFilePath: ['.env.local', '.env'],
      load: [appConfig, dbConfig, authConfig, redisConfig],
      isGlobal: true,
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
    AuthModule,
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
