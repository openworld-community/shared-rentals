import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/app/entities';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PageParams } from '../common';
import { CreateUserInput, UpdateUserInput } from './dto';
import { Injectable } from '@nestjs/common';
import {
  PageMetaDTO,
  PageOptionsDTO,
  ResponseWithPagination,
} from 'src/common/dto/pagination.dto';

export class UserNotFoundError extends Error {}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // It will be changed after PEREDELANO PASSPORt integration
  async createUser(input: CreateUserInput): Promise<User | null> {
    const existingUser = await this.userRepository.findOneBy({
      email: input.email,
    });

    if (existingUser !== null) {
      throw new Error(`User via ${input.email} email already exists`);
    }

    const newlyCreatedUser = await this.userRepository.save(input);

    return newlyCreatedUser;
  }

  async updateUser(id: number, input: UpdateUserInput): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneOrFail({
        where: { id },
      });

      return await this.userRepository.save({
        id: existingUser.id,
        ...input,
      });
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
