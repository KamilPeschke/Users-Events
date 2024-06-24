import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class EditUserInput extends PartialType(CreateUserInput){
}