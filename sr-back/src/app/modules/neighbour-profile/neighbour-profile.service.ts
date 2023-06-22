import { Injectable } from '@nestjs/common';
import { CreateNeighbourProfileInput } from './dto/create-neighbour-profile.dto';
import { UpdateNeighbourProfileInput } from './dto/update-neighbour-profile.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityNotFoundError } from 'typeorm';
import { NeighbourProfile } from './entities/neighbour-profile.entity';
import { AreaService } from 'src/area/area.service';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';
import { UserService } from '../user/user.service';
import { Area } from 'src/area/entities/area.entity';

export class NeighbourProfileAlreadyExists extends Error {}
export class NeighbourProfileNotFound extends Error {}

@Injectable()
export class NeighbourProfileService {
  constructor(
    @InjectRepository(User)
    private readonly neighbourProfileRepository: Repository<NeighbourProfile>,
    private readonly areaService: AreaService,
    private readonly userService: UserService,
  ) {}

  async createNeighbourProfile(
    body: CreateNeighbourProfileInput,
    // user: User,
    id: number,
  ): Promise<NeighbourProfile | undefined> {
    const { countryId, cityId }: CreateNeighbourProfileInput = body;

    const user = await this.userService.getUserById(id);

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

  async updateNeighbourProfile(
    body: UpdateNeighbourProfileInput,
    // user: User,
    id: number,
  ) {
    try {
      let { countryId, cityId }: UpdateNeighbourProfileInput = body;

      const user = await this.userService.getUserById(id);

      const existingProfile =
        await this.neighbourProfileRepository.findOneOrFail({
          where: {
            user,
          },
        });

      let isCityOrCountryChecked = false;

      if (cityId !== null && cityId !== undefined && !isCityOrCountryChecked) {
        const city = await this.areaService.findOne(cityId);
        if (city.parent !== null && Boolean(city.parent.id)) {
          await this.areaService.areaExists(city.parent.id);
        }
        isCityOrCountryChecked = true;
      }

      if (
        countryId !== null &&
        countryId !== undefined &&
        !isCityOrCountryChecked
      ) {
        await this.areaService.areaExists(countryId);
        cityId = undefined;
      }

      return (
        await this.neighbourProfileRepository.update(
          { id: existingProfile.id },
          { ...body },
        )
      ).raw[0] as NeighbourProfile;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NeighbourProfileNotFound();
      }

      throw error;
    }
  }

  async deleteNeighbourProfile(id: number): Promise<number | undefined | null> {
    const user = await this.userService.getUserById(id);
    return (await this.neighbourProfileRepository.delete({ user })).affected;
  }

  async getNeighbourProfileByUserId(
    id: number,
  ): Promise<NeighbourProfile | never> {
    try {
      return await this.neighbourProfileRepository.findOneOrFail({
        where: { id },
        relations: { user: true },
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
