import { User } from 'src/user/user.entity';
import { Event } from './event.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EventUser {
  @Field(() => Event)
  event: Event;
  @Field(() => User)
  organizer: User;
}
