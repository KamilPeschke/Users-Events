import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput } from './input/create-event.input';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuardlocalGql } from 'src/auth/auth.guard.local.gql';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  @UseGuards(AuthGuardlocalGql)
  async createEvent(
    @Args('input') input: CreateEventInput,
    @CurrentUser() organizer: User,
  ): Promise<Event> {
    return this.eventService.create(
      input.location,
      organizer,
      input.userId,
      input.description,
    );
  }

  @Query(() => [Event])
  async findAllEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }
}
