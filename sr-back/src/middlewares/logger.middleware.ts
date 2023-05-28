import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('Request');
  next();
  logger.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
}
