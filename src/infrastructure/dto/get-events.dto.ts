import { Field, ObjectType } from '@nestjs/graphql';
import { IGetEventsOutput } from 'src/domain/domain/entities/use-case/get-events.interface';
import { Event } from '../entities/entities/event.entity';

@ObjectType()
export class GetEventsOutput extends IGetEventsOutput {
  @Field(() => [Event])
  events: Event[];
}
