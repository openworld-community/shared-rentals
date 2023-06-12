import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
  UseGuards,
  Req,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService, PasswordDidNotMatchError } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { MapErrorToHTTP } from '@common/decorators/MapErrorToHTTP';
import {
  UserNotFoundError,
  UserViaEmailAlreadyExists,
} from '@modules/user/user.service';
import { SerializeTo } from '@common/decorators/SerializeTo';
import { WithUser } from '@common/decorators/WithUser';
import { UserDTO } from '@modules/user/dto';
import { LocalAuthGuard } from './auth.guard';
import { User, UserRole } from '@modules/user/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('register')
  @SerializeTo()
  @MapErrorToHTTP(UserViaEmailAlreadyExists, ConflictException)
  async register(@WithUser() user: User, @Body() createUserDto: RegisterDTO) {
    if (user !== undefined) {
      throw new NotAcceptableException('User already logged in');
    }
    await this.authService.register(createUserDto);
    return null;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @SerializeTo(AuthResultDTO)
  @MapErrorToHTTP(UserNotFoundError, UnauthorizedException)
  @MapErrorToHTTP(PasswordDidNotMatchError, UnauthorizedException)
  async login(@WithUser() user: UserDTO, @Body() loginDTO: LoginDTO) {
    return user;
  }

  @MustBe(UserRole.user)
  @Post('logout')
  async logout(@Req() req: any) {
    req.session.destroy();
  }
}
