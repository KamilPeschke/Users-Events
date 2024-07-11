import { IEvent } from '../event.entity';
import { IUser } from '../user.entity';

export class ICreateEventInput {
  location: string;
  date: Date;
  organizer: IUser;
  description?: string;
}

export class ICreateEventOutput {
  event: IEvent;
}
