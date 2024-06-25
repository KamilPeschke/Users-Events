import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('haslo12345', 10);

  const users = [{ username: 'user1', email: 'user1@jwt.com', password }];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
