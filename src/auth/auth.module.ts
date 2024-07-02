import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserResolver } from 'src/user/user.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/user/repo/user.repository';
import { AuthService } from './service/auth.service';
import { UserService } from 'src/user/service/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {
        expiresIn: '60m',
      },
    }),
  ],
  providers: [
    UserResolver,
    AuthService,
    PrismaService,
    JwtStrategy,
    UserRepository,
    UserService,
  ],
})
export class AuthModule {}
