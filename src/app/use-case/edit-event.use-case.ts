import { Injectable } from '@nestjs/common';
import { IEditEventInput } from 'src/domain/domain/entities/use-case/edit-event.interface';
import { EventRepository } from 'src/infrastructure/repositories/event.repository';

@Injectable()
export class EditEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  public async execute(
    currentUser: number,
    id: number,
    data?: IEditEventInput,
  ) {
    return await this.eventRepository.edit(
      currentUser,
      id,
      data.location,
      data.date,
      data.description,
    );
  }
}
