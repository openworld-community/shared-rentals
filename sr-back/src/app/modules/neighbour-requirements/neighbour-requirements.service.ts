import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { NeighbourRequirements } from './entities/neighbour-requirements.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';

export class NeighbourRequirementsNotFound extends Error {}

@Injectable()
export class NeighbourRequirementsService {
  constructor(
    @InjectRepository(NeighbourRequirements)
    private readonly neighbourProfileRepository: Repository<NeighbourRequirements>,
    private readonly userService: UserService,
  ) {}

  async getNeighbourRequirementsByUserId(
    id: number,
  ): Promise<NeighbourRequirements | never> {
    try {
      return await this.neighbourProfileRepository.findOneOrFail({
        where: { id },
        relations: { user: true },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NeighbourRequirementsNotFound();
      }

      throw error;
    }
  }

  async getNeighbourRequirementss(
    pageOptions: PageOptionsDTO,
    // searchOptions: NeighbourRequirementssSearchOptions,
  ): Promise<ResponseWithPagination<NeighbourRequirements>> {
    try {
      const searchOptions = {};

      const itemsTotal = await this.neighbourProfileRepository.count({
        where: searchOptions,
      });
      const data = await this.neighbourProfileRepository.find({
        where: searchOptions,
        take: pageOptions.take,
        skip: pageOptions.skip,
      });

      return { data, meta: new PageMetaDTO(itemsTotal, pageOptions) };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NeighbourRequirementsNotFound();
      }

      throw error;
    }
  }
}
