import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../auth/service/auth.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserResolver } from 'src/infrastructure/user.resolver';
import { CreateUserUseCase } from 'src/app/use-case/create-user.use-case';
import { GetUsersUseCase } from 'src/app/use-case/get-users.use-case';
import { SignInUserUseCase } from 'src/app/use-case/signin-user.use-case';
import { EditUserUseCase } from 'src/app/use-case/edit-user.use-case';
import { DeleteUserUseCase } from 'src/app/use-case/delete-user.use-case';
import { CreateEventUseCase } from 'src/app/use-case/create-event.use-case';
import { EventRepository } from 'src/infrastructure/repositories/event.repository';
import { EventResolver } from 'src/infrastructure/event.resolver';
import { GetEventsUseCase } from 'src/app/use-case/get-event.use-case';
import { EditEventUseCase } from 'src/app/use-case/edit-event.use-case';
import { EditDecisionEventUseCase } from 'src/app/use-case/edit-decision-event.use-case';
import { DeleteEventUseCase } from 'src/app/use-case/delete-event.use-case';
import { GetUserByIdUseCase } from 'src/app/use-case/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from 'src/app/use-case/get-user-by-email.use-case';

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
    CreateUserUseCase,
    GetUsersUseCase,
    SignInUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
    CreateEventUseCase,
    EventRepository,
    EventResolver,
    GetEventsUseCase,
    EditEventUseCase,
    EditDecisionEventUseCase,
    DeleteEventUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
  ],
})
export class AuthModule {}
