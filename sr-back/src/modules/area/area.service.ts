import { InjectRepository } from '@nestjs/typeorm';
import { Area, AreaType } from './entities/area.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';

export class AreaNotFoundError extends Error {}

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area) private readonly areaRepository: Repository<Area>,
  ) {}

  async findOne(id: number) {
    try {
      return await this.areaRepository.findOneOrFail({
        where: { id },
        relations: { parent: true, child: true },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new AreaNotFoundError();
      }

      throw error;
    }
  }

  async findAllCountries({
    withCities = false,
    pageOptions,
  }: {
    withCities: boolean;
    pageOptions: PageOptionsDTO;
  }): Promise<ResponseWithPagination<Area>> {
    const searchOptions = { type: AreaType.COUNTRY };
    const itemsTotal = await this.areaRepository.count({
      where: searchOptions,
    });
    const data = await this.areaRepository.find({
      relations: { child: withCities },
      where: searchOptions,
      take: pageOptions.take,
      skip: pageOptions.skip,
    });

    return { data, meta: new PageMetaDTO(itemsTotal, pageOptions) };
  }
}
