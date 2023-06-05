import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/entities';
import { Repository } from 'typeorm';
import { PageParams } from '../common';
import { CreateUserInput, UpdateUserInput } from './dto';

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

  async updateUser(id: number, input: UpdateUserInput): Promise<User | null> {
    const existingUser = await this.userRepository.findOneBy({
      id,
    });

    if (existingUser === null) {
      throw new Error(`User not found`);
    }

    return await this.userRepository.save({
      id: existingUser.id,
      ...input,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async getUsers(pageParams: PageParams): Promise<[User[], number] | []> {
    return await this.userRepository.findAndCount({
      skip: pageParams.skip,
      take: pageParams.take,
    });
  }
}
