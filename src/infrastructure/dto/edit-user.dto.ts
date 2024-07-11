import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { IEditUserInput } from 'src/domain/domain/entities/use-case/edit-user.interface';

@InputType()
export class EditUserInput extends IEditUserInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(4)
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}

@ObjectType()
export class EditUserOutput extends PartialType(EditUserInput) {}
