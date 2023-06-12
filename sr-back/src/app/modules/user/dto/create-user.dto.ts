import { Expose } from 'class-transformer';
import { UserRole } from '../entities/user.entity';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @IsEnum(UserRole)
  role: UserRole;
}
