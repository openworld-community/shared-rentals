import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/app/entities';
import { UpdateUserInput } from './dto';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: User,
    status: 200,
  })
  @Put('/user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() input: UpdateUserInput, // ToDo: change any type to smth exact
  ): Promise<User | null> {
    return await this.userService.updateUser(id, input);
  }

  @ApiResponse({
    type: User,
    status: 200,
  })
  @Get('/user/:id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  // ToDo: brainstorm about pages type
  @ApiResponse({
    type: [User],
    status: 200,
  })
  @Get('/users')
  async getAllUsers(@Query('skip') skip: number, @Query('take') take: number) {
    return await this.userService.getUsers({
      skip,
      take,
    });
  }
}
