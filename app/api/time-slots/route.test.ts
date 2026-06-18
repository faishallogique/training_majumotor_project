import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    timeSlot: {
      findMany: vi.fn(),
    },
  },
}));

import { GET } from './route';
import { prisma } from '@/lib/db';

const mockFindMany = prisma.timeSlot.findMany as ReturnType<typeof vi.fn>;

function makeRequest() {
  return new Request('http://localhost/api/time-slots');
}

describe('GET /api/time-slots', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with available slots', async () => {
    mockFindMany.mockResolvedValue([
      {
        id: 'slot-1',
        dateTime: new Date('2026-06-20T09:00:00.000Z'),
        capacity: 2,
        createdAt: new Date(),
        _count: { bookings: 1 },
      },
    ]);

    const res = await GET(makeRequest());

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slots).toHaveLength(1);
    expect(body.slots[0].id).toBe('slot-1');
    expect(body.slots[0].booked).toBe(1);
  });

  it('excludes fully booked slots', async () => {
    mockFindMany.mockResolvedValue([
      {
        id: 'slot-full',
        dateTime: new Date('2026-06-20T11:00:00.000Z'),
        capacity: 2,
        createdAt: new Date(),
        _count: { bookings: 2 },
      },
    ]);

    const res = await GET(makeRequest());

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slots).toHaveLength(0);
  });

  it('returns only available slots when mix of full and available', async () => {
    mockFindMany.mockResolvedValue([
      {
        id: 'slot-available',
        dateTime: new Date('2026-06-20T09:00:00.000Z'),
        capacity: 2,
        createdAt: new Date(),
        _count: { bookings: 0 },
      },
      {
        id: 'slot-full',
        dateTime: new Date('2026-06-20T11:00:00.000Z'),
        capacity: 2,
        createdAt: new Date(),
        _count: { bookings: 2 },
      },
    ]);

    const res = await GET(makeRequest());

    const body = await res.json();
    expect(body.slots).toHaveLength(1);
    expect(body.slots[0].id).toBe('slot-available');
  });
});
