import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO: remove example entity
@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastRequestedAt: Date;
}
