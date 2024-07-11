import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { GetEventsUseCase } from 'src/app/use-case/get-event.use-case';
import { EventResolver } from '../event.resolver';
import { EventRepository } from '../repositories/event.repository';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEventUseCase } from 'src/app/use-case/create-event.use-case';
import { EditEventUseCase } from 'src/app/use-case/edit-event.use-case';
import { EditDecisionEventUseCase } from 'src/app/use-case/edit-decision-event.use-case';
import { DeleteEventUseCase } from 'src/app/use-case/delete-event.use-case';

@Module({
  providers: [
    AuthService,
    JwtService,
    GetEventsUseCase,
    EventResolver,
    EventRepository,
    UserRepository,
    PrismaService,
    CreateEventUseCase,
    EditEventUseCase,
    EditDecisionEventUseCase,
    DeleteEventUseCase,
    GetEventsUseCase,
  ],
})
export class EventModule {}
