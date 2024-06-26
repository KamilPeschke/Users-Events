import { ObjectType } from '@nestjs/graphql';
import { EventStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/user/user.entity';

@ObjectType()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createEvent(
    location: string,
    organizer: User,
    userId: number,
    description?: string,
  ) {
    return this.prisma.event.create({
      data: {
        description: description,
        location: location,
        status: EventStatus.ACCEPTED,
        userId: userId,
        organizer: {
          connect: {
            id: organizer.id,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }
}
