import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Event {
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
