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
  UnauthorizedException,
} from '@nestjs/common';
import {
  SingleHouseDescriptionDTO,
  CreateHouseDescriptionInput,
  UpdateHouseDescriptionInput,
} from './dto';
import { SerializeTo } from 'src/common/decorators/SerializeTo';
import { MapErrorToHTTP } from 'src/common/decorators/MapErrorToHTTP';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';
import {
  HouseDescriptionAlreadyExists,
  HouseDescriptionNotFound,
  HouseDescriptionService,
} from './house-description.service';
import { UserNotFoundError } from '../user/user.service';

@Controller('house-description')
@ApiTags('HouseDescription')
export class HouseDescriptionController {
  @Inject()
  private readonly houseDescriptionService: HouseDescriptionService;

  @Get(':id')
  @SerializeTo(SingleHouseDescriptionDTO)
  @MapErrorToHTTP(HouseDescriptionNotFound, UnauthorizedException)
  async houseDescription(@Param('id') id: number) {
    return await this.houseDescriptionService.getHouseDescriptionById(id);
  }

  @Get('all')
  @SerializeTo(SingleHouseDescriptionDTO)
  @MapErrorToHTTP(HouseDescriptionNotFound, UnauthorizedException)
  async houseDescriptions(@Query() pageOptions: PageOptionsDTO) {
    return await this.houseDescriptionService.getHouseDescriptions(pageOptions);
  }

  @Post(':id')
  @SerializeTo(SingleHouseDescriptionDTO)
  @MapErrorToHTTP(HouseDescriptionAlreadyExists, UnauthorizedException)
  @MapErrorToHTTP(UserNotFoundError, UnauthorizedException)
  async createHouseDescription(
    @Body() createHouseDescriptionInput: CreateHouseDescriptionInput,
    @Param('id') id: number,
  ) {
    const res = await this.houseDescriptionService.createHouseDescription(
      createHouseDescriptionInput,
      id,
    );

    return res;
  }

  @Put('/:id')
  @MapErrorToHTTP(HouseDescriptionNotFound, UnauthorizedException)
  async updateNeighbourProfile(
    @Body() updateHouseDescription: UpdateHouseDescriptionInput,
    // @Req() { user }: Request,
    @Param('id') id: number,
  ) {
    const res = await this.houseDescriptionService.updateHouseDescription(
      updateHouseDescription,
      id,
    );

    return res;
  }

  @Delete('/:id')
  async deleteNeighbourProfile(
    // @Req() { user }: Request,
    @Param('id') id: number,
  ) {
    const res = await this.houseDescriptionService.deleteHouseDescription(id);

    return res;
  }
}
