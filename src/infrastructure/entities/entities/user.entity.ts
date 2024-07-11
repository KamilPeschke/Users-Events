import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IUser } from 'src/domain/domain/entities/user.entity';
import { Event } from './event.entity';

@ObjectType()
export class User implements IUser {
  @Field(() => Int)
  id: number;

  @Field()
  email?: string;

  @Field()
  username?: string;

  @Field()
  password?: string;

  @Field(() => [Event], { nullable: true })
  event?: Event[];

  @Field(() => [Event], { nullable: true })
  organized?: Event[];
}
