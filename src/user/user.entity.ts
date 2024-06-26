import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/events/event.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [Event], { nullable: true })
  event?: Promise<Event[]>;

  @Field(() => [Event], { nullable: true })
  organized?: Promise<Event[]>;
}
