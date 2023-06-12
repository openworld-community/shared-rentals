import { IsAuthenticatedGuard } from 'src/auth/auth.guard';
import { UserRole } from '@modules/user/entities/user.entity';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';

export const MustBe = (roles: UserRole[]) =>
  applyDecorators(UseGuards(new IsAuthenticatedGuard(roles)), ApiCookieAuth());

export const NOT_ANONOMOUS = [
  UserRole.user,
  UserRole.moderator,
  UserRole.admin,
];
export const ADMIN = [UserRole.moderator, UserRole.admin];
export const USER = [UserRole.user];
