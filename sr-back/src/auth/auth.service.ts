import { Inject, Injectable } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from './dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/entities/user.entity';

export class PasswordDidNotMatchError extends Error {}

@Injectable()
export class AuthService {
  @Inject(UserService) private readonly userService: UserService;
  @Inject(AuthHelper) private readonly authHelper: AuthHelper;

  public async register(body: RegisterDTO): Promise<User | never> {
    const { name, email, password }: RegisterDTO = body;
    return await this.userService.createUser({
      name,
      email,
      password: await this.authHelper.encodePassword(password),
    });
  }

  public async login(body: LoginDTO): Promise<User | never> {
    const { email, password }: LoginDTO = body;
    const user = await this.userService.getUserByEmail(email);

    const isPasswordValid: boolean = await this.authHelper.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new PasswordDidNotMatchError();
    }

    this.userService.updateLastLogin(user.id);

    return user;
  }

  public async logout(user: User): Promise<void> {
    this.userService.updateLastLogin(user.id);
  }
}
