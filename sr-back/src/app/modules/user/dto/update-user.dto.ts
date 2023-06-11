import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserInput {
  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;
}
