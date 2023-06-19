import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  NeighbourProfileAlreadyExists,
  NeighbourProfileNotFound,
  NeighbourProfileService,
} from './neighbour-profile.service';
import { User } from '../user/entities/user.entity';
import { Request } from 'express';
import { CreateNeighbourProfileInput } from './dto/create-neighbour-profile.dto';
import { UpdateNeighbourProfileInput } from './dto/update-neighbour-profile.dto';
import { MapErrorToHTTP } from 'src/common/decorators/MapErrorToHTTP';
import { AreaNotFoundError } from 'src/area/area.service';
import {
  SerializeTo,
  SerializeWithPagingTo,
} from 'src/common/decorators/SerializeTo';
import {
  NeighbourProfilesDTO,
  SingleNeighbourProfileDTO,
} from './dto/neighbour-profile.dto';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';

@Controller('neighbour-profile')
@ApiTags('NeghbourProfile')
export class NeighbourProfileController {
  @Inject()
  private readonly neighbourProfileService: NeighbourProfileService;

  @Get(':id')
  @SerializeTo(SingleNeighbourProfileDTO)
  @MapErrorToHTTP(NeighbourProfileNotFound, UnauthorizedException)
  async getNeighbourProfile(@Param('id') id: number) {
    return await this.neighbourProfileService.getNeighbourProfileByUserId(id);
  }

  @Get('all')
  @SerializeWithPagingTo(NeighbourProfilesDTO)
  async getAllNeighbourProfiles(@Query() pageOptions: PageOptionsDTO) {
    return await this.neighbourProfileService.getNeighbourProfiles(pageOptions);
  }

  @Post()
  @MapErrorToHTTP(AreaNotFoundError, UnauthorizedException)
  @MapErrorToHTTP(NeighbourProfileAlreadyExists, UnauthorizedException)
  async createNeighbourProfile(
    @Body() createNeighbourProfile: CreateNeighbourProfileInput,
    @Req() { user }: Request,
  ) {
    const res = await this.neighbourProfileService.createNeighbourProfile(
      createNeighbourProfile,
      user as User,
    );

    return res;
  }

  @Put()
  @MapErrorToHTTP(NeighbourProfileNotFound, UnauthorizedException)
  async updateNeighbourProfile(
    @Body() updateNeighbourProfile: UpdateNeighbourProfileInput,
    @Req() { user }: Request,
  ) {
    const res = await this.neighbourProfileService.updateNeighbourProfile(
      updateNeighbourProfile,
      user as User,
    );

    return res;
  }

  @Delete()
  async deleteNeighbourProfile(@Req() { user }: Request) {
    const res = await this.neighbourProfileService.deleteNeighbourProfile(
      user as User,
    );

    return res;
  }
}
