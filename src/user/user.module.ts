import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { AuthService } from '../auth/service/auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repo/user.repository';
import { UserService } from './service/user.service';

@Module({
  providers: [
    UserResolver,
    AuthService,
    PrismaService,
    JwtService,
    UserRepository,
    UserService,
  ],
})
export class UserModule {}
