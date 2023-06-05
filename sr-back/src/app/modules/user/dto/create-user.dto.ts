import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/app/entities';

export class CreateUserInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: UserRole;
}
