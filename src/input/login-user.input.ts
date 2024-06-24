import { Field, InputType} from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class LoginUserInput{

    @Field()
    @IsString()
    username:string

    @Field()
    @IsString()
    password: string

}