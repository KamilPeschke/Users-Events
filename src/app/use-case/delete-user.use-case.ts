import { Injectable } from '@nestjs/common';
import {
  IDeleteUserInput,
  IDeleteUserOutput,
} from 'src/domain/domain/entities/use-case/delete-user.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data: IDeleteUserInput): Promise<IDeleteUserOutput> {
    return await this.userRepository.deleteUserById(data.id);
  }
}
