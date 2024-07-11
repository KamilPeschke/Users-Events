import { ObjectType } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';

@ObjectType()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, username: string, password: string) {
    const user = this.prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
      },
    });
    console.log(user);
    return user;
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
