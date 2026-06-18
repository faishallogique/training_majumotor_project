import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(_req: Request) {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { customerName, customerPhone, customerEmail, customerKtp, timeSlotId, vehicleSlugs } = body;

  if (!customerName || !customerPhone || !customerEmail || !customerKtp || !timeSlotId) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
  }

  if (!Array.isArray(vehicleSlugs) || vehicleSlugs.length === 0) {
    return NextResponse.json({ error: 'Pilih minimal 1 kendaraan' }, { status: 400 });
  }

  if (vehicleSlugs.length > 2) {
    return NextResponse.json({ error: 'Maksimal 2 kendaraan per booking' }, { status: 400 });
  }

  const slot = await prisma.timeSlot.findUnique({
    where: { id: timeSlotId },
    include: { _count: { select: { bookings: true } } },
  });

  if (!slot) {
    return NextResponse.json({ error: 'Slot tidak ditemukan' }, { status: 400 });
  }

  if (slot._count.bookings >= slot.capacity) {
    return NextResponse.json({ error: 'Slot sudah penuh' }, { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: {
      customerName,
      customerPhone,
      customerEmail,
      customerKtp,
      timeSlotId,
      vehicles: {
        create: (vehicleSlugs as string[]).map((slug) => ({ vehicleSlug: slug })),
      },
    },
    include: { vehicles: true },
  });

  return NextResponse.json({ ok: true, booking }, { status: 201 });
}
