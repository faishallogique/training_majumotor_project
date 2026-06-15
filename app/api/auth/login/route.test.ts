import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({
  prisma: {
    staffUser: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@/lib/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/auth')>();
  return {
    ...actual,
    comparePassword: vi.fn(),
  };
});

import { POST } from './route';
import { prisma } from '@/lib/db';
import { comparePassword } from '@/lib/auth';

const mockFindUnique = prisma.staffUser.findUnique as ReturnType<typeof vi.fn>;
const mockCompare = comparePassword as ReturnType<typeof vi.fn>;

function makeRequest(body: object) {
  return new Request('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when email or password missing', async () => {
    const res = await POST(makeRequest({ email: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 401 when user not found', async () => {
    mockFindUnique.mockResolvedValue(null);
    const res = await POST(makeRequest({ email: 'x@x.com', password: 'pass' }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it('returns 401 when password wrong', async () => {
    mockFindUnique.mockResolvedValue({ id: '1', email: 'staff@maju.com', hashedPassword: 'hash' });
    mockCompare.mockResolvedValue(false);
    const res = await POST(makeRequest({ email: 'staff@maju.com', password: 'wrong' }));
    expect(res.status).toBe(401);
  });

  it('returns 200 and sets auth cookie on valid credentials', async () => {
    mockFindUnique.mockResolvedValue({ id: '1', email: 'staff@maju.com', hashedPassword: 'hash' });
    mockCompare.mockResolvedValue(true);
    const res = await POST(makeRequest({ email: 'staff@maju.com', password: 'correct' }));
    expect(res.status).toBe(200);
    const setCookie = res.headers.get('set-cookie');
    expect(setCookie).toContain('auth_token');
    expect(setCookie).toContain('HttpOnly');
  });
});
