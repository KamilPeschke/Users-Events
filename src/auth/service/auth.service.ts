import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/infrastructure/entities/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly logger = new Logger(AuthService.name);

  public generateJwtTokenForUser(user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }
}
