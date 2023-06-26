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
  async getNeighbourProfile(@Param('id') userId: number) {
    return await this.neighbourProfileService.getNeighbourProfileByUserId(
      userId,
    );
  }

  @Get('all')
  @SerializeWithPagingTo(NeighbourProfilesDTO)
  async getAllNeighbourProfiles(@Query() pageOptions: PageOptionsDTO) {
    return await this.neighbourProfileService.getNeighbourProfiles(pageOptions);
  }

  @Post('/:id')
  @MapErrorToHTTP(AreaNotFoundError, UnauthorizedException)
  @MapErrorToHTTP(NeighbourProfileAlreadyExists, UnauthorizedException)
  async createNeighbourProfile(
    @Body() createNeighbourProfile: CreateNeighbourProfileInput,
    // @Req() { user }: Request,
    @Param('id') id: number,
  ) {
    const res = await this.neighbourProfileService.createNeighbourProfile(
      createNeighbourProfile,
      id,
    );

    return res;
  }

  @Put('/:id')
  @MapErrorToHTTP(NeighbourProfileNotFound, UnauthorizedException)
  async updateNeighbourProfile(
    @Body() updateNeighbourProfile: UpdateNeighbourProfileInput,
    // @Req() { user }: Request,
    @Param('id') id: number,
  ) {
    const res = await this.neighbourProfileService.updateNeighbourProfile(
      updateNeighbourProfile,
      id,
    );

    return res;
  }

  @Delete('/:id')
  async deleteNeighbourProfile(
    // @Req() { user }: Request,
    @Param('id') id: number,
  ) {
    const res = await this.neighbourProfileService.deleteNeighbourProfile(id);

    return res;
  }
}
