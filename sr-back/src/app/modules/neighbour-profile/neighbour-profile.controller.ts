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
import { User, UserRole } from '../user/entities/user.entity';
import { MustBe } from '@common/decorators/MustBe';
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

  @MustBe(UserRole.user)
  @Get(':id')
  @SerializeTo(SingleNeighbourProfileDTO)
  @MapErrorToHTTP(NeighbourProfileNotFound, UnauthorizedException)
  async getNeighbourProfile(@Param('id') id: number) {
    return await this.neighbourProfileService.getNeighbourProfile(id);
  }

  @MustBe(UserRole.user)
  @Get('all')
  @SerializeWithPagingTo(NeighbourProfilesDTO)
  async getAllNeighbourProfiles(@Query() pageOptions: PageOptionsDTO) {
    return await this.neighbourProfileService.getNeighbourProfiles(pageOptions);
  }

  @MustBe(UserRole.user)
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

  @MustBe(UserRole.user)
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

  @MustBe(UserRole.user)
  @Delete()
  async deleteNeighbourProfile(@Req() { user }: Request) {
    const res = await this.neighbourProfileService.deleteNeighbourProfile(
      user as User,
    );

    return res;
  }
}
