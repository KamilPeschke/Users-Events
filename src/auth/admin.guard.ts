import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser || dbUser.role !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can do this action');
    }

    return true;
  }
}
