import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AttendInput {
  @Field()
  eventId: number;
}
