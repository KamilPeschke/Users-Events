import { Injectable } from '@nestjs/common';
import {
  ICreateEventInput,
  ICreateEventOutput,
} from 'src/domain/domain/entities/use-case/create-event.interface';
import { EventRepository } from 'src/infrastructure/repositories/event.repository';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  public async execute(data: ICreateEventInput): Promise<ICreateEventOutput> {
    const newEvent = await this.eventRepository.createEvent(
      data.location,
      data.date,
      data.organizer,
      data.description,
    );
    return {
      event: newEvent,
    };
  }
}
