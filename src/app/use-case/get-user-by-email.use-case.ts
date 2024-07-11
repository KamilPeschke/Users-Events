import { Injectable } from '@nestjs/common';
import { IGetUsersByEmailInput } from 'src/domain/domain/entities/use-case/get-user-by-email.interface';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data: IGetUsersByEmailInput) {
    return await this.userRepository.findUserByEmail(data.email);
  }
}
