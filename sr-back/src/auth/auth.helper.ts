import { User } from '@modules/user/entities/user.entity';
import { UserNotFoundError, UserService } from '@modules/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class BadTokenError extends Error {}
export class BadCredentialsError extends Error {}

@Injectable()
export class AuthHelper {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async validateUser(decoded: any): Promise<User> {
    return await this.userService.getUserById(decoded.id);
  }

  async validateUserViaEmail(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!(await this.validatePassword(password, user.password))) {
        throw new BadCredentialsError();
      }
      return user;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new BadCredentialsError();
      }
      throw error;
    }
  }

  async validatePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
