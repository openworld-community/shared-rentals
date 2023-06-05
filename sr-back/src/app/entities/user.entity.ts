import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ enum: UserRole })
  role: UserRole;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
