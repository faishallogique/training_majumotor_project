import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    timeSlot: {
      findUnique: vi.fn(),
    },
    booking: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

import { GET, POST } from './route';
import { prisma } from '@/lib/db';

const mockSlotFindUnique = prisma.timeSlot.findUnique as ReturnType<typeof vi.fn>;
const mockBookingCreate = prisma.booking.create as ReturnType<typeof vi.fn>;
const mockBookingFindMany = prisma.booking.findMany as ReturnType<typeof vi.fn>;

const validBody = {
  customerName: 'Budi Santoso',
  customerPhone: '081234567890',
  customerEmail: 'budi@example.com',
  customerKtp: '3201234567890001',
  timeSlotId: 'slot-1',
  vehicleSlugs: ['mm-city'],
};

function makeRequest(body: object) {
  return new Request('http://localhost/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const availableSlot = {
  id: 'slot-1',
  dateTime: new Date('2026-06-20T09:00:00.000Z'),
  capacity: 2,
  _count: { bookings: 1 },
};

describe('GET /api/bookings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with bookings array', async () => {
    mockBookingFindMany.mockResolvedValue([
      {
        id: 'booking-1',
        customerName: 'Budi Santoso',
        customerPhone: '081234567890',
        customerEmail: 'budi@example.com',
        customerKtp: '3201234567890001',
        timeSlotId: 'slot-1',
        createdAt: new Date('2026-06-18T10:00:00.000Z'),
        vehicles: [{ id: 'bv-1', bookingId: 'booking-1', vehicleSlug: 'mm-city' }],
        timeSlot: { id: 'slot-1', dateTime: new Date('2026-06-20T09:00:00.000Z'), capacity: 2 },
      },
    ]);

    const res = await GET(new Request('http://localhost/api/bookings'));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.bookings).toHaveLength(1);
    expect(body.bookings[0].customerName).toBe('Budi Santoso');
    expect(body.bookings[0].vehicles).toHaveLength(1);
    expect(body.bookings[0].timeSlot).toBeDefined();
  });

  it('returns 200 with empty array when no bookings', async () => {
    mockBookingFindMany.mockResolvedValue([]);

    const res = await GET(new Request('http://localhost/api/bookings'));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.bookings).toHaveLength(0);
  });
});

describe('POST /api/bookings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when customerName is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, customerName: '' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it('returns 400 when customerPhone is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, customerPhone: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when customerEmail is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, customerEmail: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when customerKtp is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, customerKtp: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when timeSlotId is missing', async () => {
    const res = await POST(makeRequest({ ...validBody, timeSlotId: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when vehicleSlugs is empty', async () => {
    const res = await POST(makeRequest({ ...validBody, vehicleSlugs: [] }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when vehicleSlugs has more than 2 items', async () => {
    const res = await POST(makeRequest({ ...validBody, vehicleSlugs: ['mm-city', 'mm-cruiser', 'mm-family'] }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when timeSlotId does not exist', async () => {
    mockSlotFindUnique.mockResolvedValue(null);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it('returns 409 when slot is fully booked', async () => {
    mockSlotFindUnique.mockResolvedValue({ ...availableSlot, _count: { bookings: 2 } });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it('returns 201 and booking data on valid request', async () => {
    mockSlotFindUnique.mockResolvedValue(availableSlot);
    mockBookingCreate.mockResolvedValue({
      id: 'booking-1',
      ...validBody,
      vehicles: [{ id: 'bv-1', bookingId: 'booking-1', vehicleSlug: 'mm-city' }],
      createdAt: new Date(),
    });

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.booking.id).toBe('booking-1');
    expect(mockBookingCreate).toHaveBeenCalledOnce();
  });
});
