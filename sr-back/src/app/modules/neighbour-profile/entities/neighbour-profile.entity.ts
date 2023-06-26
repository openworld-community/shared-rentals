import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Area } from 'src/area/entities/area.entity';
import { ValidateIf } from 'class-validator';

export enum Gender {
  man = 'man',
  woman = 'woman',
}

export enum TenantStatus {
  solo = 'solo',
  family = 'family',
  friends = 'friends',
}

export enum RentalPeriod {
  few_weeks = 'few_weeks',
  few_months = 'few_months',
  year_and_more = 'year_and_more',
}

@Entity()
export class NeighbourProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  age: number;

  @Column({ enum: Gender, type: 'enum' })
  gender: Gender;

  @Column({ enum: TenantStatus, type: 'enum' })
  tenantStatus: TenantStatus;

  @Column()
  pets: boolean;

  @Column()
  petsDescription: string;

  @Column({ nullable: true })
  @OneToOne(() => Area)
  @JoinColumn()
  @ValidateIf((u) => (u.country === undefined || u.country === null) && u.city)
  country: Area;

  @Column({ nullable: true })
  @OneToOne(() => Area)
  @ValidateIf((u) => (u.city === undefined || u.city === null) && u.country)
  @JoinColumn()
  city: Area;

  @Column({ enum: RentalPeriod, type: 'enum' })
  rentalPeriod: RentalPeriod;

  @Column()
  budget: number;

  @Column({ length: 300 })
  description: string;

  @Column()
  photoLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
