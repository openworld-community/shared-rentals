import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('Request');
  res.on('finish', () => {
    const logFormat = `${req.method} ${req.originalUrl} ${res.statusCode}`;
    if (res.statusCode >= 400) {
      logger.error(logFormat);
    } else {
      logger.log(logFormat);
    }
  });
  next();
}
