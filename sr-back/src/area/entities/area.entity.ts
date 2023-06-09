import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column({ default: 'now()', select: false })
  createdAt: Date;

  @Column({ default: 'now()', select: false })
  updatedAt: Date;
}
