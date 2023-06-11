import { UseInterceptors, applyDecorators } from '@nestjs/common';
import {
  PagingSerializerInterceptor,
  SerializerInterceptor,
} from '../interceptors/serializer-interceptor/serializer.interceptor';
import { ApiOkResponse } from '@nestjs/swagger';
import { PageDTO } from '../dto/pagination.dto';

export const SerializeTo = (dto: any) =>
  applyDecorators(
    UseInterceptors(new SerializerInterceptor(dto)),
    ApiOkResponse({ type: () => dto }),
  );
export const SerializeWithPagingTo = (dto: any) =>
  applyDecorators(
    UseInterceptors(new PagingSerializerInterceptor(dto)),
    ApiOkResponse({ type: () => PageDTO<keyof typeof dto> }),
  );
