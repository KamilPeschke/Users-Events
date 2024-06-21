import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  providers: [UserResolver, AuthService, PrismaService, JwtService],
})
export class UserModule {}
