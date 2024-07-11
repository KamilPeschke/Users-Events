import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ICreateUserInput } from 'src/domain/domain/entities/use-case/create-user.interface';

@InputType()
export class CreateUserInput extends ICreateUserInput {
  @Field()
  @IsString()
  @MinLength(4)
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
