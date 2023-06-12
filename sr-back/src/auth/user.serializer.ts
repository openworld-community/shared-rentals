import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UserService) {
    super();
  }

  serializeUser(user: User, done: any) {
    done(null, user.id);
  }

  deserializeUser(userId: number, done: any) {
    try {
      const user = this.usersService.getUserById(userId);
      done(null, user);
    } catch (error) {
      return done(
        `Could not deserialize user: user with ${userId} could not be found`,
        null,
      );
    }
  }
}
