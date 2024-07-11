import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { ISignInUserInput } from 'src/domain/domain/entities/use-case/signin-user.interface';

@InputType()
export class SignInUserInput extends ISignInUserInput {
  @Field()
  @IsString()
  @MinLength(4)
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
