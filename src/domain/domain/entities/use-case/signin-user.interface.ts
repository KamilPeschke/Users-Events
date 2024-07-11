import { IUser } from '../user.entity';

export class ISignInUserInput {
  username: string;
  password: string;
}

export class ISignInUserOutput {
  user: IUser;
  access_token: string;
}
