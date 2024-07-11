import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from './entities/entities/event.entity';
import { GetEventsUseCase } from 'src/app/use-case/get-event.use-case';
import { CreateEventInput, CreateEventOutput } from './dto/create-event.dot';
import { CreateEventUseCase } from 'src/app/use-case/create-event.use-case';
import { CurrentUser } from 'src/auth/current-user';
import { User } from './entities/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth.guard.jwt.gql';
import { EditEventInput, EditEventOutput } from './dto/edit-event.dto';
import { RolesGuard } from 'src/auth/admin.guard';
import { EditEventUseCase } from 'src/app/use-case/edit-event.use-case';
import { EditDecisionEventUseCase } from 'src/app/use-case/edit-decision-event.use-case';
import { EditDecisionEvenInput } from './dto/change-decision-event.dto';
import { DeleteEventInput, DeleteEventOutput } from './dto/delete-event.dto';
import { DeleteEventUseCase } from 'src/app/use-case/delete-event.use-case';

@Resolver()
export class EventResolver {
  constructor(
    private readonly getEventsUseCase: GetEventsUseCase,
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly editEventUseCase: EditEventUseCase,
    private readonly editDecisionEventUseCase: EditDecisionEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
  ) {}

  @Query(() => [Event])
  public async findAllEvents(): Promise<Event[]> {
    return await this.getEventsUseCase.execute();
  }

  @Mutation(() => CreateEventOutput)
  @UseGuards(AuthGuardJwtGql)
  public async createEvent(
    @Args('input') input: CreateEventInput,
    @CurrentUser() user: User,
  ): Promise<CreateEventOutput> {
    const newEvent = await this.createEventUseCase.execute({
      location: input.location,
      date: input.date,
      organizer: user,
      description: input.description,
    });
    return {
      event: newEvent.event,
      organizer: user,
    };
  }

  @Mutation(() => Event)
  @UseGuards(AuthGuardJwtGql, RolesGuard)
  public async editEvent(
    @Args('input') input: EditEventInput,
    @Args('id') id: number,
    @CurrentUser() user: User,
  ): Promise<EditEventOutput> {
    return await this.editEventUseCase.execute(user.id, id, input);
  }

  @Mutation(() => Event)
  @UseGuards(AuthGuardJwtGql)
  public async changeDecision(
    @Args('data') data: EditDecisionEvenInput,
    @CurrentUser() user: User,
  ): Promise<Event> {
    return await this.editDecisionEventUseCase.execute(user.id, data);
  }

  @Mutation(() => DeleteEventOutput)
  @UseGuards(AuthGuardJwtGql, RolesGuard)
  public async deleteEvent(
    @Args('input') input: DeleteEventInput,
  ): Promise<DeleteEventOutput> {
    return await this.deleteEventUseCase.execute(input);
  }
}
