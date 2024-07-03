import {
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    await this.prisma.user.update({
      where: {
        id: organizer.id,
      },
      data: {
        role: 'ADMIN',
      },
      include: {
        event: true,
      },
    });

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

  async edit(
    currentUser: number,
    id: number,
    location?: string,
    date?: Date,
    description?: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: { id: currentUser },
    });

    const event = await this.prisma.event.findFirst({
      where: { id },
    });

    if (event.organizerId !== user.id) {
      throw new UnauthorizedException('You cant edit this event');
    }

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

  async delete(id: number) {
    return await this.prisma.event.delete({
      where: { id },
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
