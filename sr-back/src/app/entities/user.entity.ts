import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  @Column()
  createdAt: Date;

  @ApiProperty()
  @Column()
  updatedAt: Date;
}
