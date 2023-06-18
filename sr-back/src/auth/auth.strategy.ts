import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LStrategy } from 'passport-local';
import { AuthHelper, BadCredentialsError } from './auth.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(LStrategy) {
  @Inject(AuthHelper)
  private readonly authHelper: AuthHelper;

  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authHelper.validateUserViaEmail(email, password);
      return user;
    } catch (error) {
      if (error instanceof BadCredentialsError) {
        throw new UnauthorizedException();
      }
      throw error;
    }
  }
}
