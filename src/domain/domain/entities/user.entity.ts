import { IEvent } from './event.entity';

export interface IUser {
  id: number;
  email?: string;
  username?: string;
  password?: string;
  event?: IEvent[];
  organized?: IEvent[];
}
