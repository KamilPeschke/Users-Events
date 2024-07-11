import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IEvent } from 'src/domain/domain/entities/event.entity';
import { Event } from '../entities/entities/event.entity';
import { IsDate, IsString } from 'class-validator';
import { User } from '../entities/entities/user.entity';
import {
  ICreateEventInput,
  ICreateEventOutput,
} from 'src/domain/domain/entities/use-case/create-event.interface';

@InputType()
export class CreateEventInput extends ICreateEventInput {
  @Field()
  @IsString()
  location: string;
  @Field()
  @IsDate()
  date: Date;
  @Field()
  @IsString()
  description?: string;
}

@ObjectType()
export class CreateEventOutput extends ICreateEventOutput {
  @Field(() => Event)
  event: IEvent;
  @Field(() => User)
  organizer: User;
}
