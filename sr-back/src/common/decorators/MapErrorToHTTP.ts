import { HttpException, UseFilters, applyDecorators } from '@nestjs/common';
import { ErrorMapperFilter } from '../filters/error-mapper/error-mapper.filter';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

export const MapErrorToHTTP = (
  fromError: new (...args: any[]) => Error,
  toHTTP: new (...args: any[]) => HttpException,
) =>
  applyDecorators(
    UseFilters(new ErrorMapperFilter(fromError, toHTTP)),
    ApiException(() => toHTTP),
  );
