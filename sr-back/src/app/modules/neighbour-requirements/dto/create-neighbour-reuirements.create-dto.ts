import { Expose } from 'class-transformer';
import {
  Gender,
  TenantStatus,
  RentalPeriod,
  NeighbourRequirements,
} from '../entities/neighbour-requirements.entity';
import { AreaDTO } from 'src/area/dto/area.dto';

export class NeighbourRequirementsDTO {
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

  constructor(requirement: NeighbourRequirements) {
    this.age = requirement.age;
    this.gender = requirement.gender;
    this.tenantStatus = requirement.tenantStatus;
    this.pets = requirement.pets;
    this.petsDescription = requirement.petsDescription;
    this.rentalPeriod = requirement.rentalPeriod;
    this.description = requirement.description;
    this.budget = requirement.budget;

    if (requirement.country !== null && requirement.country !== undefined) {
      this.country = new AreaDTO(requirement.country);
    }

    if (requirement.city !== null && requirement.city !== undefined) {
      this.city = new AreaDTO(requirement.city);
    }
  }
}

export class NeighbourBatchRequirementsDTO extends NeighbourRequirements {
  static fromEntity(requirements: NeighbourRequirements[]) {
    return requirements.map(
      (requirement) => new NeighbourRequirementsDTO(requirement),
    );
  }
}

export class SingleNeighbourRequirementsDTO {
  @Expose()
  requirement: NeighbourRequirementsDTO;

  static fromEntity(requirement: NeighbourRequirements) {
    return { requirement: new NeighbourRequirementsDTO(requirement) };
  }
}
