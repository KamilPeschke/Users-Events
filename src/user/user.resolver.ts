import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/input/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth.guard.jwt.gql';
import { AuthPayload } from 'src/auth/auth.payload';
import { LoginUserInput } from 'src/input/login-user.input';

@Resolver()
export class UserResolver {

constructor(
    private readonly authService: AuthService
){}

    @Query(() => [User])
    public async findAllUsers():Promise<User[]>{
        return this.authService.findAllUsers()
    }

    @Query(() => User)
    public findUserById(
        @Args('id', {type: () => Int})
        id: number):Promise<User>{
        return this.authService.findUserById(id)
    }

    @Mutation(() => AuthPayload, {name: 'registerUser'})
    public async registerUser(
        @Args('input', {type: ()=> CreateUserInput})
        input: CreateUserInput): Promise<AuthPayload>{
        
        return this.authService.register(input);
    }

    // @Query(() => AuthPayload, {name: 'login'})
    // @UseGuards(AuthGuardJwtGql)
    // public async login(
    //     @Args('input',{type: () => LoginUserInput})
    //     input: LoginUserInput):Promise<AuthPayload>{

    //     return this.authService.validateUser(input);
    // }
}
