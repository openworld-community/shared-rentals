import { User, UserRole } from '@modules/user/entities/user.entity';
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements IAuthGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return true;
  }
}

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly roles: UserRole[]) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const user = (await request.user) as User;
    return request.isAuthenticated() && this.roles.includes(user.role);
  }
}
