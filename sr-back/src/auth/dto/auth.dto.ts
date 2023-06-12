import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({
    maxLength: 255,
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @ApiProperty({
    maxLength: 64,
    required: true,
  })
  password: string;
}

export class LoginDTO extends PickType(RegisterDTO, [
  'email',
  'password',
] as const) {}
