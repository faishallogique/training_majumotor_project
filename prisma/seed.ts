import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const staff = await prisma.staffUser.upsert({
    where: { email: 'staff@majumotor.com' },
    update: {},
    create: {
      email: 'staff@majumotor.com',
      hashedPassword,
    },
  });

  console.log(`Seeded staff: ${staff.email}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
