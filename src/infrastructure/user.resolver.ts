import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthPayload } from 'src/auth/auth.payload';
import { CreateUserUseCase } from 'src/app/use-case/create-user.use-case';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './entities/entities/user.entity';
import { GetUsersUseCase } from 'src/app/use-case/get-users.use-case';
import { SignInUserUseCase } from 'src/app/use-case/signin-user.use-case';
import { SignInUserInput } from './dto/signin-user.dto';
import { AuthGuardJwtGql } from 'src/auth/auth.guard.jwt.gql';
import { UseGuards } from '@nestjs/common';
import { EditUserInput, EditUserOutput } from './dto/edit-user.dto';
import { EditUserUseCase } from 'src/app/use-case/edit-user.use-case';
import { CurrentUser } from 'src/auth/current-user';
import { DeleteUserInput, DeleteUserOutput } from './dto/delete-user.dto';
import { DeleteUserUseCase } from 'src/app/use-case/delete-user.use-case';
import { GetUserByIdUseCase } from 'src/app/use-case/get-user-by-id.use-case';
import { GetUserByIdInput } from './dto/get-user-by-id.dto';
import { GetUserByEmailUseCase } from 'src/app/use-case/get-user-by-email.use-case';
import { GetUserByEmailInput } from './dto/get-user-by-email.dto';

@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly signInUseCase: SignInUserUseCase,
    private readonly editUserUseCase: EditUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  @Query(() => [User])
  public async findAllUsers(): Promise<User[]> {
    const { users } = await this.getUsersUseCase.execute();
    return users;
  }

  @Mutation(() => AuthPayload, { name: 'registerUser' })
  public async registerUser(
    @Args('input', { type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<AuthPayload> {
    return await this.createUserUseCase.execute(input);
  }

  @Mutation(() => AuthPayload, { name: 'login' })
  public async login(
    @Args('input')
    input: SignInUserInput,
  ): Promise<AuthPayload> {
    return this.signInUseCase.execute(input);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuardJwtGql)
  async edit(
    @CurrentUser() user: User,
    @Args('input') input: EditUserInput,
  ): Promise<EditUserOutput> {
    return await this.editUserUseCase.execute({
      id: user.id,
      email: input.email,
      username: input.username,
      password: input.password,
    });
  }

  @Query(() => User)
  @UseGuards(AuthGuardJwtGql)
  public async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => DeleteUserOutput)
  @UseGuards(AuthGuardJwtGql)
  async delete(@Args('data') data: DeleteUserInput): Promise<DeleteUserOutput> {
    return this.deleteUserUseCase.execute(data);
  }

  @Query(() => User)
  public async findUserById(
    @Args('input')
    input: GetUserByIdInput,
  ): Promise<User> {
    return await this.getUserByIdUseCase.execute(input);
  }

  @Query(() => User)
  public findUserByEmail(
    @Args('input')
    input: GetUserByEmailInput,
  ): Promise<User> {
    return this.getUserByEmailUseCase.execute(input);
  }
}
