import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/user/user.entity';

@ObjectType()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createEvent(
    location: string,
    date: Date,
    organizer: User,
    description?: string,
  ) {
    return await this.prisma.event.create({
      data: {
        description: description,
        date: new Date(date),
        location: location,
        status: EventStatus.MAYBE,
        userId: organizer.id,
        organizer: {
          connect: {
            id: organizer.id,
          },
        },
      },
    });
  }

  async edit(id: number, location?: string, date?: Date, description?: string) {
    const event = await this.prisma.event.findFirst({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('This event does not exist');
    }
    return this.prisma.event.update({
      where: { id },
      data: {
        location: location,
        date: date,
        description: description,
      },
    });
  }

  async attend(eventId: number, userId: number) {
    return await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: EventStatus.ACCEPTED,
        users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });
  }

  async changeDecision(eventId: number, userId: number, answer: EventStatus) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId },
    });

    if (answer === 'ACCEPTED') {
      this.prisma.event.update({
        where: { id: event.id },
        data: {
          status: answer,
        },
      });
      return this.attend(eventId, userId);
    }

    return this.prisma.event.update({
      where: { id: event.id },
      data: {
        status: answer,
      },
    });
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }

  async findEventById(id: number) {
    const event = await this.prisma.event.findFirst({
      where: { id },
    });

    if (!event) {
      throw HttpStatus.NOT_FOUND;
    }
    return event;
  }
}
