import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNeighbourProfileInput } from './create-neighbour-profile.dto';

export class UpdateNeighbourProfileInput extends PartialType(
  OmitType(CreateNeighbourProfileInput, [
    'gender',
    'tenantStatus',
    'rentalPeriod',
  ] as const),
) {}
