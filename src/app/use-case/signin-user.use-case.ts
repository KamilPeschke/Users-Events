import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';

import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import {
  ISignInUserInput,
  ISignInUserOutput,
} from 'src/domain/domain/entities/use-case/signin-user.interface';

@Injectable()
export class SignInUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  private readonly logger = new Logger(SignInUserUseCase.name);

  public async execute(data: ISignInUserInput): Promise<ISignInUserOutput> {
    const currentUser = await this.userRepository.findUserByUsername(
      data.username,
    );

    if (!currentUser) {
      this.logger.debug('This user does not exist');
      throw new UnauthorizedException();
    }
    const token = this.authService.generateJwtTokenForUser(currentUser);

    const isPasswordValid = await bcrypt.compare(
      data.password,
      currentUser.password,
    );

    if (!isPasswordValid) {
      this.logger.debug('Invalid email or password');
      throw new UnauthorizedException();
    }
    return {
      user: currentUser,
      access_token: token,
    };
  }
}
