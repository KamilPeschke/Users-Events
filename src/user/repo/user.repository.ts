import { ObjectType } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';

@ObjectType()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNewUser(email: string, username: string, password: string) {
    try {
      return await this.prisma.user.create({
        data: {
          username: username,
          password: password,
          email: email,
        },
      });
    } catch (error) {
      throw new Error('username or email already exist');
    }
  }

  async editCurrentUser(
    id: number,
    email?: string,
    username?: string,
    password?: string,
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: email,
        username: username,
        password: password,
      },
    });
  }

  async deleteUserById(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    return this.prisma.user.findFirstOrThrow({
      where: { id },
    });
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
