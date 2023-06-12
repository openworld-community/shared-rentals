import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { Response } from 'express';

@Catch()
export class ErrorMapperFilter implements ExceptionFilter {
  private readonly logger = new Logger('ErrorMapper');
  constructor(
    readonly ErrorCls: new (...args: any[]) => Error,
    readonly ExceptionCls: new (...args: any[]) => HttpException,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof this.ErrorCls) {
      const e = new this.ExceptionCls();

      response.status(e.getStatus()).json(e.getResponse());
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      this.logger.error(exception);
      const e = new InternalServerErrorException();
      response.status(e.getStatus()).json(e.getResponse());
    }
  }
}
