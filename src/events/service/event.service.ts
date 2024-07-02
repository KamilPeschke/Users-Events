import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { EventRepository } from '../repo/event.repository';
import { Event } from '../event.entity';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  private readonly logger = new Logger(EventRepository.name);

  public async create(
    location: string,
    date: Date,
    organizer: User,
    description?: string,
  ) {
    const newEvent = await this.eventRepository.createEvent(
      location,
      date,
      organizer,
      description,
    );

    if (!organizer.id) {
      this.logger.debug('user not found!');
      throw new Error('User not found');
    }

    return newEvent;
  }

  async editEvent(
    id: number,
    location?: string,
    date?: Date,
    description?: string,
  ): Promise<Event> {
    return await this.eventRepository.edit(id, location, date, description);
  }

  async changeDecision(eventId: number, userId: number, answer: EventStatus) {
    return this.eventRepository.changeDecision(eventId, userId, answer);
  }

  async attend(eventId: number, userId: number) {
    return await this.eventRepository.attend(eventId, userId);
  }

  public async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  public async findEventById(id: number): Promise<Event> {
    return this.eventRepository.findEventById(id);
  }
}
