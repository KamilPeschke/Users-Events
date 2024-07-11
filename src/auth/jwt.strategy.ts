import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserJwtPayload } from 'src/domain/domain/entities/interfaces/userPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  async validate(payload: UserJwtPayload) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: payload.sub,
      },
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
