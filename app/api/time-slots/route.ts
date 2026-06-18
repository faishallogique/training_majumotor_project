import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(_req: Request) {
  const slots = await prisma.timeSlot.findMany({
    where: { dateTime: { gte: new Date() } },
    include: { _count: { select: { bookings: true } } },
    orderBy: { dateTime: 'asc' },
  });

  const available = slots
    .filter((s) => s._count.bookings < s.capacity)
    .map((s) => ({
      id: s.id,
      dateTime: s.dateTime,
      capacity: s.capacity,
      booked: s._count.bookings,
    }));

  return NextResponse.json({ slots: available });
}
