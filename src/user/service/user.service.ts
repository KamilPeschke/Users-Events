import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/repo/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly logger = new Logger(UserService.name);

  async create(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createNewUser(email, username, hashedPassword);
  }

  async edit(
    id: number,
    email?: string,
    username?: string,
    password?: string,
  ): Promise<User> {
    return this.userRepository.editCurrentUser(id, email, username, password);
  }

  async delete(id: number): Promise<User> {
    try {
      return await this.userRepository.deleteUserById(id);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findUserByUsername(username);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }
}
