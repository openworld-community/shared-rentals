import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateHouseDescriptionInput {
  @Expose()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  wifi: boolean;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  washingmachine: boolean;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  number_of_rooms: number;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  stove: boolean;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  oven: boolean;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  work_table: boolean;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  microwave: boolean;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  air_conditioner: boolean;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  price_per_person: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  contract_term: number;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  accommodation_link: string;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  expectation_date: Date;
}
