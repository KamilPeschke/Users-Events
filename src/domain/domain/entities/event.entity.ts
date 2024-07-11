import { IUser } from './user.entity';

export interface IEvent {
  id: number;
  description?: string;
  location: string;
  date: Date;
  users?: IUser[];
  userId?: number;
  organizer?: IUser;
  organizerId: number;
}
