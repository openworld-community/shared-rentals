import { Expose } from 'class-transformer';
import {
  Gender,
  TenantStatus,
  RentalPeriod,
  NeighbourProfile,
} from '../entities/neighbour-profile.entity';
import { AreaDTO } from 'src/area/dto/area.dto';

export class NeighbourProfileDTO {
  @Expose()
  age: number;

  @Expose()
  gender: Gender;

  @Expose()
  tenantStatus: TenantStatus;

  @Expose()
  pets: boolean;

  @Expose()
  petsDescription: string;

  @Expose()
  country: AreaDTO;

  @Expose()
  city: AreaDTO;

  @Expose()
  rentalPeriod: RentalPeriod;

  @Expose()
  budget: number;

  @Expose()
  description: string;

  constructor(profile: NeighbourProfile) {
    this.age = profile.age;
    this.gender = profile.gender;
    this.tenantStatus = profile.tenantStatus;
    this.pets = profile.pets;
    this.petsDescription = profile.petsDescription;
    this.rentalPeriod = profile.rentalPeriod;
    this.description = profile.description;
    this.budget = profile.budget;

    if (profile.country !== null && profile.country !== undefined) {
      this.country = new AreaDTO(profile.country);
    }

    if (profile.city !== null && profile.city !== undefined) {
      this.city = new AreaDTO(profile.city);
    }
  }
}

export class NeighbourProfilesDTO extends NeighbourProfile {
  static fromEntity(profiles: NeighbourProfile[]) {
    return profiles.map((profile) => new NeighbourProfileDTO(profile));
  }
}

export class SingleNeighbourProfileDTO {
  @Expose()
  profile: NeighbourProfileDTO;

  static fromEntity(profile: NeighbourProfile) {
    return { profile: new NeighbourProfileDTO(profile) };
  }
}
