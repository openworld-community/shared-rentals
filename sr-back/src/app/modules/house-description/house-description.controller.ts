import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { SingleHouseDescriptionDTO } from './dto';
import { SerializeTo } from 'src/common/decorators/SerializeTo';
import { MapErrorToHTTP } from 'src/common/decorators/MapErrorToHTTP';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';
import {
  HouseDescriptionAlreadyExists,
  HouseDescriptionNotFound,
  HouseDescriptionService,
} from './house-description.service';
import { CreateHouseDescriptionInput } from './dto/create-house-description.dto';

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
  async createHouseDescription(
    @Body() createHouseDescriptionInput: CreateHouseDescriptionInput,
    @Param('id') id: number,
  ) {
    return await this.houseDescriptionService.createHouseDescription(
      createHouseDescriptionInput,
      id,
    );
  }
}
