import { Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UpdateUserInput {
  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  constructor(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
