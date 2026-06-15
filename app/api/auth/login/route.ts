import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePassword, signJwt } from '@/lib/auth';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  const user = await prisma.staffUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
  }

  const valid = await comparePassword(password, user.hashedPassword);
  if (!valid) {
    return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
  }

  const token = await signJwt({ sub: user.id, email: user.email });

  const response = NextResponse.json({ ok: true });
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}
