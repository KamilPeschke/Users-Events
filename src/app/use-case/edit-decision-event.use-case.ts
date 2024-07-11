import { Injectable } from '@nestjs/common';
import { IEditDecisionEventInput } from 'src/domain/domain/entities/use-case/edit-decision-event.interface';
import { EventRepository } from 'src/infrastructure/repositories/event.repository';

@Injectable()
export class EditDecisionEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  public async execute(userId: number, data: IEditDecisionEventInput) {
    return await this.eventRepository.changeDecision(
      data.eventId,
      userId,
      data.answer,
    );
  }
}
