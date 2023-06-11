import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export interface ResponseWithPagination<T> {
  data: T[];
  meta: PageMetaDTO;
}

export class PageMetaDTO {
  @Expose()
  readonly page: number;

  @Expose()
  readonly take: number;

  @Expose()
  readonly pagesTotal: number;

  @Expose()
  readonly itemsTotal: number;

  constructor(itemsTotal: number, pageOptions: PageOptionsDTO) {
    this.page = pageOptions.page;
    this.take = pageOptions.take;
    this.pagesTotal = Math.ceil(itemsTotal / this.take);
    this.itemsTotal = itemsTotal;
  }
}

export class PageDTO<T> {
  @Expose()
  readonly data: T[];

  @Expose()
  readonly meta: PageMetaDTO;

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}

export class PageOptionsDTO {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly take: number = 10;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
