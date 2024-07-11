import { Injectable } from '@nestjs/common';
import { IGetUsersOutput } from 'src/domain/domain/entities/use-case/get-users.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(): Promise<IGetUsersOutput> {
    const users = await this.userRepository.findAllUsers();

    return {
      users,
    };
  }
}
