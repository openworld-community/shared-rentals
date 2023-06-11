import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PageDTO, ResponseWithPagination } from 'src/common/dto/pagination.dto';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.dto.fromEntity(data);
      }),
    );
  }
}

@Injectable()
export class PagingSerializerInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: ResponseWithPagination<any>) => {
        return new PageDTO(this.dto.fromEntity(data.data), data.meta);
      }),
    );
  }
}
