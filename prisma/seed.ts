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

  // Seed time slots: next 7 days × 3 time slots per day
  await prisma.bookingVehicle.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.timeSlot.deleteMany();
  const slotTimes = ['09:00', '11:00', '14:00'];
  let slotCount = 0;

  for (let dayOffset = 1; dayOffset <= 7; dayOffset++) {
    for (const time of slotTimes) {
      const [hour, minute] = time.split(':').map(Number);
      const dateTime = new Date();
      dateTime.setDate(dateTime.getDate() + dayOffset);
      dateTime.setHours(hour, minute, 0, 0);
      await prisma.timeSlot.create({ data: { dateTime, capacity: 2 } });
      slotCount++;
    }
  }

  console.log(`Seeded ${slotCount} time slots`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
