import { Field, InputType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import { IEditDecisionEventInput } from 'src/domain/domain/entities/use-case/edit-decision-event.interface';

@InputType()
export class EditDecisionEvenInput extends IEditDecisionEventInput {
  @Field()
  eventId: number;
  @Field()
  answer: EventStatus;
}
