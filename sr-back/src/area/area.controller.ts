import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { AreaNotFoundError, AreaService } from './area.service';
import { ApiTags } from '@nestjs/swagger';
import { AreaTreeDTO, SingleAreaDTO } from './dto/area.dto';
import {
  SerializeTo,
  SerializeWithPagingTo,
} from 'src/common/decorators/SerializeTo';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';
import { MapErrorToHTTP } from 'src/common/decorators/MapErrorToHTTP';

@ApiTags('Areas')
@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get('tree')
  @SerializeWithPagingTo(AreaTreeDTO)
  async findAll(@Query() pageOptions: PageOptionsDTO) {
    return await this.areaService.findAllCountries({
      withCities: true,
      pageOptions,
    });
  }

  @Get(':areaId')
  @SerializeTo(SingleAreaDTO)
  @MapErrorToHTTP(AreaNotFoundError, NotFoundException)
  async findOne(@Param('areaId') id: string) {
    return await this.areaService.findOne(+id);
  }
}
