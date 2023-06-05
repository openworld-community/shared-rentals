import { UserRole } from 'src/app/entities';

export interface CreateUserInput {
  email: string;

  firstName: string;

  lastName: string;

  role: UserRole;
}
