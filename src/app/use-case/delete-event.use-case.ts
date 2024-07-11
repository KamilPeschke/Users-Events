import { Injectable } from '@nestjs/common';
import {
  IDeleteEventInput,
  IDeleteEventOutput,
} from 'src/domain/domain/entities/use-case/delete-event.interface';
import { EventRepository } from 'src/infrastructure/repositories/event.repository';

@Injectable()
export class DeleteEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  public async execute(data: IDeleteEventInput): Promise<IDeleteEventOutput> {
    return await this.eventRepository.delete(data.id);
  }
}
