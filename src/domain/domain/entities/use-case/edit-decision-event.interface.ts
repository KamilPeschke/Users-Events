import { EventStatus } from '@prisma/client';

export class IEditDecisionEventInput {
  eventId: number;
  answer: EventStatus;
}
