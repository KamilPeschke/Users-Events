import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from '../auth/service/auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth.guard.jwt.gql';
import { AuthPayload } from 'src/auth/auth.payload';
import { CurrentUser } from './current-user.decorator';
import { DeleteUserEntity } from './input/delete-user.entity';
import { CreateUserInput } from 'src/user/input/create-user.input';
import { LoginUserInput } from 'src/user/input/login-user.input';
import { EditUserInput } from 'src/user/input/edit-user.input';
import { DeleteUserInput } from 'src/user/input/delete-user.input';
import { UserService } from './service/user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [User])
  public async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Query(() => User)
  public findUserById(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Query(() => User)
  public findUserByEmail(
    @Args('input', { type: () => String })
    email: string,
  ): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  @Mutation(() => AuthPayload, { name: 'registerUser' })
  public async registerUser(
    @Args('input', { type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<AuthPayload> {
    return this.authService.register(
      input.email,
      input.username,
      input.password,
    );
  }

  @Mutation(() => AuthPayload, { name: 'login' })
  public async login(
    @Args('input')
    input: LoginUserInput,
  ): Promise<AuthPayload> {
    return this.authService.login(input.username, input.password);
  }

  @Query(() => User)
  @UseGuards(AuthGuardJwtGql)
  public async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => User)
  @UseGuards(AuthGuardJwtGql)
  async edit(
    @Args('id') id: number,
    @Args('input') input: EditUserInput,
  ): Promise<User> {
    return this.userService.edit(
      id,
      input.email,
      input.username,
      input.password,
    );
  }

  @Mutation(() => DeleteUserEntity)
  @UseGuards(AuthGuardJwtGql)
  async delete(@Args('data') data: DeleteUserInput): Promise<DeleteUserEntity> {
    return this.userService.delete(data.id);
  }
}
