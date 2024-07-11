import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import {
  IDeleteEventInput,
  IDeleteEventOutput,
} from 'src/domain/domain/entities/use-case/delete-event.interface';

@InputType()
export class DeleteEventInput extends IDeleteEventInput {
  @Field()
  @IsNumber()
  id: number;
}

@ObjectType()
export class DeleteEventOutput extends IDeleteEventOutput {
  @Field()
  id: number;
}
