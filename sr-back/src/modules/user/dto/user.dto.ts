import { Expose } from 'class-transformer';
import { User, UserRole } from '../entities/user.entity';

export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  constructor(user: User) {
    console.log(user);
    this.id = user.id;
    this.name = user.name;
    this.role = user.role;
    this.email = user.email;
  }
}

export class UsersDTO extends User {
  static fromEntity(users: User[]) {
    return users.map((user) => new UserDTO(user));
  }
}

export class SingleUserDTO {
  @Expose()
  user: UserDTO;

  static fromEntity(user: User) {
    console.log(user);
    return { user: new UserDTO(user) };
  }
}
