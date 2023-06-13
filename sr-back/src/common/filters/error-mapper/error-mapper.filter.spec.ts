import { HttpException } from '@nestjs/common';
import { ErrorMapperFilter } from './error-mapper.filter';

describe('ErrorMapperFilter', () => {
  it('should be defined', () => {
    expect(new ErrorMapperFilter(Error, HttpException)).toBeDefined();
  });
});
