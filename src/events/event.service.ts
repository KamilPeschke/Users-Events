import { Injectable, Logger } from '@nestjs/common';
import { EventRepository } from './repo/event.repository';
import { User } from 'src/user/user.entity';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  private readonly logger = new Logger(EventRepository.name);

  public async create(
    location: string,
    organizer: User,
    userId: number,
    description?: string,
  ) {
    const newEvent = this.eventRepository.createEvent(
      location,
      organizer,
      userId,
      description,
    );

    if (!userId) {
      this.logger.debug('user not found!');
      throw new Error('User not found');
    }

    return newEvent;
  }

  public async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }
}
