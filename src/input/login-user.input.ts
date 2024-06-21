import { Field, InputType, ObjectType} from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class LoginUserInput{

    constructor(partial?: Partial<LoginUserInput>){
        Object.assign(this,partial)
    }

    @Field()
    @IsString()
    password: string

    @Field()
    @IsEmail()
    email:string
}