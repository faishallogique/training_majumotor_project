import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

/**
 * Playwright global setup — dijalankan SEKALI sebelum seluruh suite E2E.
 *
 * Tujuan: reset test data agar setiap suite run dimulai dari state bersih.
 * Mencegah akumulasi data antar run yang bikin test jadi flaky atau ambigu.
 *
 * Defensive: setiap operasi model baru (Booking, TimeSlot) dibungkus try/catch
 * sehingga aman dijalankan di branch yang belum punya model tersebut.
 */
export default async function globalSetup() {
  const prisma = new PrismaClient();

  try {
    // Hapus data booking dan slot (kalau model sudah ada)
    try {
      await (prisma as any).booking.deleteMany();
      console.log('[e2e setup] bookings cleared');
    } catch {
      // Model belum ada di schema — skip
    }

    try {
      await (prisma as any).timeSlot.deleteMany();
      console.log('[e2e setup] timeSlots cleared');
    } catch {
      // Model belum ada di schema — skip
    }

    // Reset staff user (upsert — idempoten)
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.staffUser.upsert({
      where: { email: 'staff@majumotor.com' },
      update: { hashedPassword },
      create: { email: 'staff@majumotor.com', hashedPassword },
    });
    console.log('[e2e setup] staff user seeded');

    // Seed time slots (kalau model sudah ada)
    try {
      const slotTimes = ['09:00', '11:00', '14:00'];
      let count = 0;
      for (let dayOffset = 1; dayOffset <= 7; dayOffset++) {
        for (const time of slotTimes) {
          const [hour, minute] = time.split(':').map(Number);
          const dateTime = new Date();
          dateTime.setDate(dateTime.getDate() + dayOffset);
          dateTime.setHours(hour, minute, 0, 0);
          await (prisma as any).timeSlot.create({ data: { dateTime, capacity: 2 } });
          count++;
        }
      }
      console.log(`[e2e setup] ${count} time slots seeded`);
    } catch {
      // Model belum ada di schema — skip
    }
  } finally {
    await prisma.$disconnect();
  }
}
