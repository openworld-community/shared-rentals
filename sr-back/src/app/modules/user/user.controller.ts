import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserNotFoundError, UserService } from './user.service';
import { UpdateUserInput } from './dto';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';
import {
  SerializeTo,
  SerializeWithPagingTo,
} from 'src/common/decorators/SerializeTo';
import { SingleUserDTO, UsersDTO } from './dto/user.dto';
import { MapErrorToHTTP } from 'src/common/decorators/MapErrorToHTTP';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/user/:id')
  @SerializeTo(SingleUserDTO)
  @MapErrorToHTTP(UserNotFoundError, NotFoundException)
  async updateUser(@Param('id') id: number, @Body() input: UpdateUserInput) {
    return await this.userService.updateUser(id, input);
  }

  @Get('/user/:id')
  @SerializeTo(SingleUserDTO)
  @MapErrorToHTTP(UserNotFoundError, NotFoundException)
  async getUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @SerializeWithPagingTo(UsersDTO)
  @Get('/users')
  async getAllUsers(@Query() pageOptions: PageOptionsDTO) {
    return await this.userService.getUsers({
      pageOptions,
    });
  }
}
