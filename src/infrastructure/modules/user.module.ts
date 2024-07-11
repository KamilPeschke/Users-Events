import { Module } from '@nestjs/common';
import { UserResolver } from '../user.resolver';
import { GetUsersUseCase } from 'src/app/use-case/get-users.use-case';
import { CreateUserUseCase } from 'src/app/use-case/create-user.use-case';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from 'src/auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserUseCase } from 'src/app/use-case/signin-user.use-case';
import { PrismaService } from 'prisma/prisma.service';
import { EditUserUseCase } from 'src/app/use-case/edit-user.use-case';
import { DeleteUserUseCase } from 'src/app/use-case/delete-user.use-case';
import { GetUserByIdUseCase } from 'src/app/use-case/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from 'src/app/use-case/get-user-by-email.use-case';

@Module({
  providers: [
    UserResolver,
    GetUsersUseCase,
    CreateUserUseCase,
    UserRepository,
    AuthService,
    JwtService,
    SignInUserUseCase,
    PrismaService,
    EditUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
  ],
})
export class UserModule {}
