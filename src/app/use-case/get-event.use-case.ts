import { Injectable } from '@nestjs/common';
import { IEvent } from 'src/domain/domain/entities/event.entity';
import { EventRepository } from 'src/infrastructure/repositories/event.repository';

@Injectable()
export class GetEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  public async execute(): Promise<IEvent[]> {
    return await this.eventRepository.findAllEvents();
  }
}
