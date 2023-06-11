import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { AreaNotFoundError, AreaService } from './area.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { AreaTreeDTO, SingleAreaDTO } from './dto/area.dto';
import {
  SerializeTo,
  SerializeWithPagingTo,
} from 'src/common/decorators/SerializeTo';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';

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
  @ApiException(() => NotFoundException)
  async findOne(@Param('areaId') id: string) {
    try {
      return await this.areaService.findOne(+id);
    } catch (error) {
      if (error instanceof AreaNotFoundError) {
        throw new NotFoundException();
      }
    }
  }
}
