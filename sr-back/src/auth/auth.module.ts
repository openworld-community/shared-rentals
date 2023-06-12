import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@modules/user/user.service';
import { AuthHelper } from './auth.helper';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@modules/user/user.module';
import { LocalStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
import { UserSerializer } from './user.serializer';
import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types';
import RedisStore from 'connect-redis';
import { RedisModule } from 'src/redis/redis.module';
import { REDIS_CLIENT } from 'src/redis/redis.constants';

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UserModule,
    RedisModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthHelper,
    LocalStrategy,
    UserSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Inject(REDIS_CLIENT)
  private readonly redis: RedisClient;

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ prefix: 'sr', client: this.redis }),
          secret: this.config.getOrThrow('auth.secret'),
          resave: false,
          saveUninitialized: false,
          name: 'sr.sid',
          cookie: {
            maxAge: SEVEN_DAYS,
          },
        }),
        passport.session(),
      )
      .forRoutes('*');
  }
}
