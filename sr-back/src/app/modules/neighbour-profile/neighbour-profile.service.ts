import { Injectable } from '@nestjs/common';
import { CreateNeighbourProfileInput } from './dto/create-neighbour-profile.dto';
import { UpdateNeighbourProfileInput } from './dto/update-neighbour-profile.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { NeighbourProfile } from './entities/neighbour-profile.entity';
import { Area } from 'src/area/entities/area.entity';
import { AreaService } from 'src/area/area.service';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';

export class NeighbourProfileAlreadyExists extends Error {}
export class NeighbourProfileNotFound extends Error {}

@Injectable()
export class NeighbourProfileService {
  constructor(
    @InjectRepository(User)
    private readonly neighbourProfileRepository: Repository<NeighbourProfile>,
    private readonly areaService: AreaService,
  ) {}

  async createNeighbourProfile(
    body: CreateNeighbourProfileInput,
    user: User,
  ): Promise<NeighbourProfile | undefined> {
    const { countryId, cityId }: CreateNeighbourProfileInput = body;

    const profileExists = await this.neighbourProfileRepository.exist({
      where: {
        user,
      },
    });

    if (profileExists) {
      throw new NeighbourProfileAlreadyExists();
    }

    const country = await this.areaService.findOne(countryId);
    const city = await this.areaService.findOne(cityId);

    const neighbourProfile = await this.neighbourProfileRepository.insert({
      ...body,
      user,
      country,
      city,
    });

    return neighbourProfile.raw[0] as NeighbourProfile;
  }

  async updateNeighbourProfile(body: UpdateNeighbourProfileInput, user: User) {
    try {
      const { countryId, cityId }: UpdateNeighbourProfileInput = body;

      const existingProfile =
        await this.neighbourProfileRepository.findOneOrFail({
          where: {
            user,
          },
        });

      let country = existingProfile.country;
      if (countryId !== null && countryId !== undefined) {
        country = await this.areaService.findOne(countryId);
      }
      let city = existingProfile.city;
      if (cityId !== null && cityId !== undefined) {
        city = await this.areaService.findOne(cityId);
      }

      return (
        await this.neighbourProfileRepository.update(
          { id: existingProfile.id },
          { ...body, country, city },
        )
      ).raw[0] as NeighbourProfile;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NeighbourProfileNotFound();
      }

      throw error;
    }
  }

  async deleteNeighbourProfile(user: User): Promise<number | undefined | null> {
    return (await this.neighbourProfileRepository.delete({ user })).affected;
  }

  async getNeighbourProfile(id: number): Promise<NeighbourProfile | never> {
    try {
      return await this.neighbourProfileRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NeighbourProfileNotFound();
      }

      throw error;
    }
  }

  async getNeighbourProfiles(
    pageOptions: PageOptionsDTO,
    // searchOptions: NeighbourProfilesSearchOptions,
  ): Promise<ResponseWithPagination<NeighbourProfile>> {
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
        throw new NeighbourProfileNotFound();
      }

      throw error;
    }
  }
}
