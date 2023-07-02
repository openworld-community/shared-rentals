import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateHouseDescriptionInput } from './create-house-description.dto';

export class UpdateHouseDescriptionInput extends PartialType(
  OmitType(CreateHouseDescriptionInput, [] as const),
) {}
