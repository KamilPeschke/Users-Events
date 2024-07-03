import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ATTENDANCE,
  ADMIN,
}

registerEnumType(UserRole, { name: 'UserRole' });
