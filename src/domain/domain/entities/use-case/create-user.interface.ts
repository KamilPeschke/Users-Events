import { User } from 'src/infrastructure/entities/entities/user.entity';

export class ICreateUserInput {
  id: number;
  email: string;
  username: string;
  password: string;
}

export class ICreateUserOutput {
  access_token: string;
  user: User;
}
