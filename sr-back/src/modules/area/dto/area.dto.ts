import { Expose } from 'class-transformer';
import { Area, AreaType } from '../entities/area.entity';

export class AreaDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  type: AreaType;

  @Expose({ name: 'parent' })
  country: AreaDTO | null;

  @Expose({ name: 'child' })
  cities: AreaDTO[] | null;

  constructor(area: Area) {
    console.log(area);
    this.id = area.id;
    this.name = area.name;
    this.type = area.type;

    if (area.parent !== null && area.parent !== undefined) {
      this.country = new AreaDTO(area.parent);
    }

    if (area.child !== undefined && area.child.length > 0) {
      this.cities = area.child.map((city) => new AreaDTO(city));
    }
  }
}

export class AreaTreeDTO extends Area {
  static fromEntity(areas: Area[]) {
    return areas.map((area) => new AreaDTO(area));
  }
}

export class SingleAreaDTO {
  @Expose()
  area: AreaDTO;

  static fromEntity(area: Area) {
    return { area: new AreaDTO(area) };
  }
}
