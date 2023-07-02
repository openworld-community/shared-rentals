import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
}

@Entity()
export class HouseDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wifi: boolean;

  @Column()
  washingmachine: boolean;

  @Column()
  number_of_rooms: number;

  @Column()
  stove: boolean;

  @Column()
  oven: boolean;

  @Column()
  work_table: boolean;

  @Column()
  microwave: boolean;

  @Column()
  air_conditioner: boolean;

  @Column()
  price_per_person: number;

  @Column()
  contract_term: number;

  @Column({ length: 300 })
  description: string;

  @Column()
  accommodation_link: string;

  @Column({ default: 'now()' })
  expectation_date: Date;

  @Column({ default: 'now()', select: false })
  createdAt: Date;

  @Column({ default: 'now()', select: false })
  updatedAt: Date;
}
