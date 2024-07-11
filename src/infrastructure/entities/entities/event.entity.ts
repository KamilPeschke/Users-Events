import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IEvent } from 'src/domain/domain/entities/event.entity';
import { User } from './user.entity';

@ObjectType()
export class Event implements IEvent {
  @Field(() => Int)
  id: number;

  @Field()
  description?: string;

  @Field()
  location: string;

  @Field()
  date: Date;

  @Field(() => [User], { nullable: true, name: 'Attendance' })
  users?: User[];

  @Field()
  userId?: number;

  @Field(() => User, { name: 'Organizer' })
  organizer?: User;

  @Field()
  organizerId: number;
}
