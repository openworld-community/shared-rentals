import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import {
  Gender,
  RentalPeriod,
  TenantStatus,
} from '../entities/neighbour-profile.entity';
import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNeighbourProfileInput } from './create-neighbour-profile.dto';

export class UpdateNeighbourProfileInput extends PartialType(
  OmitType(CreateNeighbourProfileInput, [
    'gender',
    'tenantStatus',
    'rentalPeriod',
  ] as const),
) {}
