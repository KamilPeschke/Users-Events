import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { IEditEventInput } from 'src/domain/domain/entities/use-case/edit-event.interface';

@InputType()
export class EditEventInput extends IEditEventInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location?: string;
  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  date?: Date;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}

@ObjectType()
export class EditEventOutput extends PartialType(EditEventInput) {}
