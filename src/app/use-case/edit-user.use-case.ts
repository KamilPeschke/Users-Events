import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IEditUserInput } from 'src/domain/domain/entities/use-case/edit-user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data?: IEditUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.userRepository.editCurrentUser(
      data.id,
      data.email,
      data.username,
      hashedPassword,
    );
  }
}
