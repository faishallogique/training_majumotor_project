import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const isValid = token ? await verifyJwt(token) : null;

  if (!isValid) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
