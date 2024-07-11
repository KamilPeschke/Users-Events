import { Injectable } from '@nestjs/common';
import { IGetUsersByIdInput } from 'src/domain/domain/entities/use-case/get-user-by-id.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data: IGetUsersByIdInput) {
    return await this.userRepository.findUserById(data.id);
  }
}
