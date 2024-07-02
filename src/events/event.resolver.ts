import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput } from './input/create-event.input';
import { Event } from './event.entity';
import { CurrentUser } from 'src/user/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth.guard.jwt.gql';
import { EventUser } from './event-user';
import { User } from 'src/user/user.entity';
import { EventService } from './service/event.service';
import { EditEventInput } from './input/edit-event.input';
import { EventStatus } from '@prisma/client';
// import { AttendInput } from './input/attend.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => EventUser)
  @UseGuards(AuthGuardJwtGql)
  async createEvent(
    @Args('input') input: CreateEventInput,
    @CurrentUser() organizer: User,
  ): Promise<EventUser> {
    const newEvent = await this.eventService.create(
      input.location,
      input.date,
      organizer,
      input.description,
    );

    return {
      event: newEvent,
      organizer: organizer,
    };
  }

  @Mutation(() => Event)
  @UseGuards(AuthGuardJwtGql)
  editEvent(
    @Args('id') id: number,
    @Args('input') input: EditEventInput,
  ): Promise<Event> {
    return this.eventService.editEvent(
      id,
      input.location,
      input.date,
      input.description,
    );
  }

  @Mutation(() => Event)
  @UseGuards(AuthGuardJwtGql)
  changeDecision(
    @Args('id') eventId: number,
    @CurrentUser() user: User,
    @Args('input') answer: EventStatus,
  ): Promise<Event> {
    return this.eventService.changeDecision(eventId, user.id, answer);
  }

  // @Mutation(() => Event)
  // attend(
  //   @Args('input') input: AttendInput,
  //   @CurrentUser() currentUser: User,
  // ): Promise<Event> {
  //   return this.eventService.attend(input.eventId, currentUser.id);
  // }

  @Query(() => [Event])
  findAllEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  findEventById(@Args('input') input: number): Promise<Event> {
    return this.eventService.findEventById(input);
  }
}
