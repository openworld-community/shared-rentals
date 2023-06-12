import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UpdateUserInput } from './dto';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';
import { RegisterDTO } from 'src/auth/dto/auth.dto';

export class UserNotFoundError extends Error {}
export class UserViaEmailAlreadyExists extends Error {}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // It will be changed after PEREDELANO PASSPORt integration
  async createUser(newUserDto: RegisterDTO): Promise<User | never> {
    const userExists = await this.userRepository.exist({
      where: { email: newUserDto.email },
    });

    if (userExists) {
      throw new UserViaEmailAlreadyExists();
    }
    const user = await this.userRepository.insert({
      ...newUserDto,
    });

    return user.raw[0];
  }

  async updateUser(id: number, input: UpdateUserInput): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneOrFail({
        where: { id },
      });

      return (await this.userRepository.update({ id: existingUser.id }, input))
        .raw[0];
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UserNotFoundError();
      }

      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UserNotFoundError();
      }

      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { email },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UserNotFoundError();
      }

      throw error;
    }
  }

  async getUsers({
    pageOptions,
  }: {
    pageOptions: PageOptionsDTO;
  }): Promise<ResponseWithPagination<User>> {
    const searchOptions = { role: UserRole.user };
    const itemsTotal = await this.userRepository.count({
      where: searchOptions,
    });
    const data = await this.userRepository.find({
      where: searchOptions,
      take: pageOptions.take,
      skip: pageOptions.skip,
    });

    return { data, meta: new PageMetaDTO(itemsTotal, pageOptions) };
  }

  async updateLastLogin(userId: number) {
    await this.userRepository.update(userId, { lastLogin: new Date() });
  }
}
