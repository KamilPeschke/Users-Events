import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/infrastructure/entities/entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
