import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from 'src/auth/auth.payload';
import { UserRepository } from 'src/user/repo/user.repository';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  public generateJwtTokenForUser(user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthPayload> {
    const newUser = await this.userService.create(email, username, password);
    const token = this.generateJwtTokenForUser(newUser);

    return {
      access_token: token,
      user: newUser,
    };
  }

  async validateUser(username: string): Promise<User> {
    const currentUser = await this.userRepository.findUserByUsername(username);

    if (!currentUser) {
      this.logger.debug('This user does not exist');
      throw new UnauthorizedException();
    }

    return currentUser;
  }

  async login(username: string, password: string): Promise<AuthPayload> {
    const user = await this.validateUser(username);
    const token = this.generateJwtTokenForUser(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.debug('Invalid email or password');
      throw new UnauthorizedException();
    }
    return {
      access_token: token,
      user,
    };
  }
}
