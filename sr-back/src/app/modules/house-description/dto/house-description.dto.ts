import { Expose } from 'class-transformer';
import { HouseDescription } from '../entities/house-description.entity';

export class HouseDescriptionDTO {
  @Expose()
  id: number;

  @Expose()
  wifi: boolean;

  @Expose()
  washingmachine: boolean;

  @Expose()
  number_of_rooms: number;

  @Expose()
  stove: boolean;

  @Expose()
  oven: boolean;

  @Expose()
  work_table: boolean;

  @Expose()
  microwave: boolean;

  @Expose()
  air_conditioner: boolean;

  @Expose()
  price_per_person: number;

  @Expose()
  contract_term: number;

  @Expose()
  description: string;

  @Expose()
  accommodation_link: string;

  @Expose()
  expectation_date: Date;

  constructor(houseDescription: HouseDescription) {
    console.log(houseDescription);
    this.id = houseDescription.id;
    this.wifi = houseDescription.wifi;
    this.washingmachine = houseDescription.washingmachine;
    this.number_of_rooms = houseDescription.number_of_rooms;
    this.stove = houseDescription.stove;
    this.oven = houseDescription.oven;
    this.work_table = houseDescription.work_table;
    this.microwave = houseDescription.microwave;
    this.air_conditioner = houseDescription.air_conditioner;
    this.price_per_person = houseDescription.price_per_person;
    this.contract_term = houseDescription.contract_term;
    this.description = houseDescription.description;
    this.accommodation_link = houseDescription.accommodation_link;
    this.expectation_date = houseDescription.expectation_date;
  }
}

export class HouseDescriptionsDTO extends HouseDescription {
  static fromEntity(houseDescriptions: HouseDescription[]) {
    return houseDescriptions.map(
      (houseDescription) => new HouseDescriptionDTO(houseDescription),
    );
  }
}

export class SingleHouseDescriptionDTO {
  @Expose()
  houseDescription: HouseDescriptionDTO;

  static fromEntity(houseDescription: HouseDescription) {
    return { houseDescription: new HouseDescriptionDTO(houseDescription) };
  }
}
