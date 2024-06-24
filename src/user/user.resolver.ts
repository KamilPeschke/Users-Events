import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/input/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth.guard.jwt.gql';
import { AuthPayload } from 'src/auth/auth.payload';
import { LoginUserInput } from 'src/input/login-user.input';
import { CurrentUser } from './current-user.decorator';
import { EditUserInput } from 'src/input/edit-user.input';

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

    @Query(() => User)
    public findUserByEmail(
        @Args('input', {type: () => String})
        email: string):Promise<User>{
            return this.authService.findUserByEmail(email)
        }

    @Mutation(() => AuthPayload, {name: 'registerUser'})
    public async registerUser(
        @Args('input', {type: ()=> CreateUserInput})
        input: CreateUserInput): Promise<AuthPayload>{
        
        return this.authService.register(input);
    }

    @Mutation(() => AuthPayload, {name: 'login'})
    public async login(
        @Args('input')
        input: LoginUserInput):Promise<AuthPayload>{
           return this.authService.login(input);
    }

    @Query(() => User)
    @UseGuards(AuthGuardJwtGql)
    public async me(@CurrentUser() user: User):Promise<User>{
        return user;
    }

    @Mutation(() => User)
    @UseGuards(AuthGuardJwtGql)
    async edit(
        @Args('id') id:number, @Args('input')input: EditUserInput
    ):Promise<User>{

        return this.authService.edit(id, input);
    }
}
