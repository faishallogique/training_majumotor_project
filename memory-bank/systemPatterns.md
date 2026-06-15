# System Patterns — majumotor-web

## Architecture overview
Next.js 14 App Router — full-stack dalam satu repo.

```
Client request
  → middleware.ts          (auth guard, server-side, sebelum render)
  → app/[route]/page.tsx   (React Server Component atau Client Component)
  → app/api/[route]/route.ts  (API handler, dipanggil dari client)
  → lib/                   (business logic, helpers)
  → prisma (Prisma Client) → SQLite
```

## Key patterns

### Auth flow
- Login: `POST /api/auth/login` → validasi creds (Prisma) → sign JWT (jose) → set httpOnly cookie `auth_token`
- Logout: `POST /api/auth/logout` → clear cookie
- Route protection: `middleware.ts` intercept `/admin/*` → `verifyJwt(cookie)` → redirect `/login` jika invalid
- JWT expiry: 8 jam, alg HS256

### Database access
- Singleton pattern via `lib/db.ts` — satu PrismaClient instance (mencegah connection pool exhaustion di dev)
- Model ditambahkan ke `prisma/schema.prisma` per tiket, migration dibuat per fitur

### Data layer
- Static data (lineup mobil): `lib/cars.ts` — array statis, tidak ke DB
- Dynamic data (booking, users): via Prisma

### Testing pattern
- Unit test: file bersebelahan source (`lib/auth.test.ts` → `lib/auth.ts`)
- Prisma di-mock via `vi.mock('@/lib/db')` di test API route
- E2E: Playwright, file di `e2e/`, webServer auto-start via `playwright.config.ts`
- TDD mandatory — test tulis dulu (RED), baru implementasi (GREEN)

## Component boundaries
- `middleware.ts` — HANYA proteksi route, tidak boleh berisi business logic
- `lib/auth.ts` — pure functions, tidak ada side effect selain crypto ops
- `lib/db.ts` — tidak dipakai langsung di middleware (Edge runtime) — hanya di API routes
