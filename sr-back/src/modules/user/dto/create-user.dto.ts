import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '@modules/user/entities/user.entity';

export class CreateUserInput {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsEnum(UserRole)
  role: UserRole;
}
