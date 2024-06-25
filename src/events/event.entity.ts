import { Field, ObjectType } from '@nestjs/graphql';
import { EventStatus } from './events.status';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Event {
  id: number;

  @Field()
  description: string;

  @Field()
  status: EventStatus;

  @Field(() => [User], { nullable: true })
  users: User[];
}
