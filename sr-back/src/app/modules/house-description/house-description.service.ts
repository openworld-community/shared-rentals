import { Injectable } from '@nestjs/common';
import { HouseDescription } from './entities/house-description.entity';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseDescriptionInput } from './dto/create-house-description.dto';
import { UserNotFoundError, UserService } from '../user/user.service';
import { UpdateHouseDescriptionInput } from './dto';

export class HouseDescriptionNotFound extends Error {}
export class HouseDescriptionAlreadyExists extends Error {}

@Injectable()
export class HouseDescriptionService {
  constructor(
    @InjectRepository(HouseDescription)
    private readonly houseDescriptionRepository: Repository<HouseDescription>,
    private readonly userService: UserService,
  ) {}

  async getHouseDescriptionById(
    id: number,
  ): Promise<HouseDescription | undefined> {
    try {
      return await this.houseDescriptionRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HouseDescriptionNotFound();
      }

      throw error;
    }
  }

  async getHouseDescriptions(
    pageOptions: PageOptionsDTO,
  ): Promise<ResponseWithPagination<HouseDescription>> {
    try {
      const searchOptions = {};

      const itemsTotal = await this.houseDescriptionRepository.count({
        where: searchOptions,
      });
      const data = await this.houseDescriptionRepository.find({
        where: searchOptions,
        take: pageOptions.take,
        skip: pageOptions.skip,
      });

      return { data, meta: new PageMetaDTO(itemsTotal, pageOptions) };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HouseDescriptionNotFound();
      }

      throw error;
    }
  }

  async createHouseDescription(
    body: CreateHouseDescriptionInput,
    userId: number,
  ): Promise<HouseDescription | undefined | null> {
    try {
      const user = await this.userService.getUserById(userId);

      // TODO: add USER field to houseDescription
      const houseDescriptionExists =
        await this.houseDescriptionRepository.exist({
          where: {
            user,
          },
        });

      if (houseDescriptionExists) {
        throw new HouseDescriptionAlreadyExists();
      }

      const houseDescription = await this.houseDescriptionRepository.insert({
        ...body,
        user,
      });

      return houseDescription.raw[0] as HouseDescription;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw UserNotFoundError;
      }

      throw error;
    }
  }

  async updateHouseDescription(
    body: UpdateHouseDescriptionInput,
    id: number,
  ): Promise<HouseDescription | undefined> {
    try {
      const user = await this.userService.getUserById(id);

      const existingProfile =
        await this.houseDescriptionRepository.findOneOrFail({
          where: {
            user,
          },
        });

      return (
        await this.houseDescriptionRepository.update(
          { id: existingProfile.id },
          { ...body },
        )
      ).raw[0] as HouseDescription;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HouseDescriptionNotFound();
      }

      throw error;
    }
  }

  async deleteHouseDescription(id: number): Promise<number | undefined | null> {
    try {
      const user = await this.userService.getUserById(id);
      return (await this.houseDescriptionRepository.delete({ user })).affected;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HouseDescriptionNotFound();
      }

      throw error;
    }
  }
}
