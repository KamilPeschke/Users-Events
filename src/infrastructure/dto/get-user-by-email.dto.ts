import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IGetUsersByEmailInput } from 'src/domain/domain/entities/use-case/get-user-by-email.interface';

@InputType()
export class GetUserByEmailInput extends IGetUsersByEmailInput {
  @Field()
  @IsString()
  email: string;
}
