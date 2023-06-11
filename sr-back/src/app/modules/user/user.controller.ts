import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/app/entities';
import { UpdateUserInput } from './dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: User,
  })
  @Put('/user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() input: UpdateUserInput, // ToDo: change any type to smth exact
  ): Promise<User | null> {
    return await this.userService.updateUser(id, input);
  }

  @ApiOkResponse({
    type: User,
  })
  @Get('/user/:id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  // ToDo: brainstorm about pages type
  @ApiOkResponse({
    type: [User],
  })
  @Get('/users')
  async getAllUsers(@Query('skip') skip: number, @Query('take') take: number) {
    return await this.userService.getUsers({
      skip,
      take,
    });
  }
}
