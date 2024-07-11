import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { IGetUsersByIdInput } from 'src/domain/domain/entities/use-case/get-user-by-id.interface';

@InputType()
export class GetUserByIdInput extends IGetUsersByIdInput {
  @Field()
  @IsNumber()
  id: number;
}
