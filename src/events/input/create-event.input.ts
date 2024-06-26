import { Field, InputType } from '@nestjs/graphql';

import { IsString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  location: string;

  @Field()
  userId: number;

  @Field()
  @IsString()
  description?: string;
}
