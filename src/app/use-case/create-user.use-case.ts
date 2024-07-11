import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import {
  ICreateUserInput,
  ICreateUserOutput,
} from 'src/domain/domain/entities/use-case/create-user.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  public async execute(data: ICreateUserInput): Promise<ICreateUserOutput> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.createUser(
      data.email,
      data.username,
      hashedPassword,
    );

    const newToken = this.authService.generateJwtTokenForUser(user);

    return {
      access_token: newToken,
      user: user,
    };
  }
}
