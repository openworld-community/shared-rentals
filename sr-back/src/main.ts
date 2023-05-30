import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENVS } from 'config/utility';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const isDev = config.get('application.env') === NODE_ENVS.dev;

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('SRT')
      .setDescription('The SRT API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.enableShutdownHooks();
  await app.listen(config.get<number>('application.port', { infer: true }));
}
bootstrap();
