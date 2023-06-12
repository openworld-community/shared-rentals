import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './dto';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';

export class UserNotFoundError extends Error {}
export class UserViaEmailAlreadyExists extends Error {}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // It will be changed after PEREDELANO PASSPORt integration
  async createUser(input: CreateUserInput): Promise<User | null> {
    const existingUser = await this.userRepository.exist({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new UserViaEmailAlreadyExists();
    }

    const newlyCreatedUser = (await this.userRepository.insert(input)).raw[0];

    return newlyCreatedUser;
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
}
