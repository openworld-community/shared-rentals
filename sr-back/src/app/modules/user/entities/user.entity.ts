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

  @Column({ enum: UserRole, type: 'enum', default: UserRole.user })
  role: UserRole;

  @Column({ default: 'now()', select: false })
  createdAt: Date;

  @Column({ default: 'now()', select: false })
  updatedAt: Date;
}
