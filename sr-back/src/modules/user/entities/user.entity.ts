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

  @Column({ length: 255 })
  name: string;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column({ length: 64 })
  password: string;

  @Column({ enum: UserRole, type: 'enum', default: UserRole.user })
  role: UserRole;

  @Column({ default: 'now()', select: false })
  createdAt: Date;

  @Column({ default: 'now()', select: false })
  updatedAt: Date;

  @Column({ default: 'now()' })
  lastLogin: Date;
}
