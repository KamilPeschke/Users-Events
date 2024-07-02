import { Field, InputType } from '@nestjs/graphql';

import { IsDate, IsString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  location: string;

  @Field()
  @IsString()
  description?: string;

  @Field()
  @IsDate()
  date: Date;
}
