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

export class CreateNeighbourProfileInput {
  @Expose()
  @IsInt()
  age: number;

  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @Expose()
  @IsEnum(TenantStatus)
  tenantStatus: TenantStatus;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  pets: boolean;

  @Expose()
  petsDescription: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  countryId: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  cityId: number;

  @Expose()
  @IsEnum(RentalPeriod)
  rentalPeriod: RentalPeriod;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  budget: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  // ToDo: add photo uploading
}
