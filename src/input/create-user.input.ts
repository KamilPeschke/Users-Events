import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class CreateUserInput{

    constructor(partial?: Partial<CreateUserInput>){
        Object.assign(this,partial)
    }

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    username: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}