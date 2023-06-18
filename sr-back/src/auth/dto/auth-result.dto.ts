import { UserDTO } from '@modules/user/dto';
import { User } from '@modules/user/entities/user.entity';
import { Expose } from 'class-transformer';

export class AuthResultDTO {
  @Expose()
  user: UserDTO;

  constructor(user: User) {
    this.user = new UserDTO(user);
  }

  static fromEntity(user: User) {
    return new AuthResultDTO(user);
  }
}
