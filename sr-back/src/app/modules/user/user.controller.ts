import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto';
import { PageOptionsDTO } from 'src/common/dto/pagination.dto';
import {
  SerializeTo,
  SerializeWithPagingTo,
} from 'src/common/decorators/SerializeTo';
import { SingleUserDTO, UsersDTO } from './dto/user.dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: User,
  })
  @Put('/user/:id')
  @SerializeTo(SingleUserDTO)
  @ApiException(() => NotFoundException)
  async updateUser(@Param('id') id: number, @Body() input: UpdateUserInput) {
    return await this.userService.updateUser(id, input);
  }

  @ApiOkResponse({
    type: User,
  })
  @Get('/user/:id')
  @SerializeTo(SingleUserDTO)
  @ApiException(() => NotFoundException)
  async getUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @ApiOkResponse({
    type: [User],
  })
  @SerializeWithPagingTo(UsersDTO)
  @Get('/users')
  async getAllUsers(@Query() pageOptions: PageOptionsDTO) {
    return await this.userService.getUsers({
      pageOptions,
    });
  }
}
