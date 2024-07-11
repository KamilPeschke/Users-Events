import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import {
  IDeleteUserInput,
  IDeleteUserOutput,
} from 'src/domain/domain/entities/use-case/delete-user.interface';

@InputType()
export class DeleteUserInput extends IDeleteUserInput {
  @Field()
  @IsNumber()
  id: number;
}

@ObjectType()
export class DeleteUserOutput extends IDeleteUserOutput {
  @Field()
  id: number;
}
