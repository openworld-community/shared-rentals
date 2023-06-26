import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AreaType {
  CITY = 'city',
  COUNTRY = 'country',
}

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ enum: AreaType, type: 'enum', default: AreaType.CITY })
  type: AreaType;

  @ManyToOne(() => Area, (area) => area.child)
  parent: Area | null;

  @OneToMany(() => Area, (area) => area.parent)
  child: Area[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
