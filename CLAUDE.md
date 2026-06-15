# majumotor-web

Website company profile PT Maju Motor (klien fiktif — project training internal LOGIQUE).

## Stack
- Next.js 14 (App Router) + TypeScript
- Prisma 5 + SQLite (`prisma/schema.prisma` — model ditambahkan per tiket)
- Pure CSS di `app/globals.css` (tanpa Tailwind)
- Auth: `jose` (JWT, Edge-compatible) + `bcryptjs` (password hashing)

## Struktur
- `app/` — pages & layout (App Router)
- `app/api/` — API routes
- `app/login/` — halaman login staff
- `app/admin/` — portal admin (protected)
- `middleware.ts` — proteksi route `/admin/*` via JWT cookie
- `lib/auth.ts` — helper JWT & bcrypt
- `lib/db.ts` — Prisma client singleton
- `lib/cars.ts` — data lineup mobil (statis)
- `prisma/schema.prisma` — schema DB (StaffUser, model lain ditambah per tiket)
- `prisma/seed.ts` — seed akun staff dealer
- `e2e/` — Playwright E2E tests

## Commands
```bash
npm run dev          # dev server (localhost:3000)
npm test             # unit tests (Vitest)
npx playwright test  # E2E tests
npx prisma migrate dev --name <name>  # buat migration baru
npx prisma db seed   # seed database
```

## Env vars
Buat `.env` dari `.env.example` sebelum mulai:
- `DATABASE_URL` — path ke SQLite DB, mis. `file:./prisma/dev.db`
- `JWT_SECRET` — **wajib diganti dari default sebelum production**

## Konvensi (SOP B-3 Development Process LOGIQUE)
- Branch: `feat/<ticket>-<slug>` dari `develop`, mis. `feat/MMTDB-3-booking-form`
- Commit: Conventional Commits, mis. `feat(booking): add test drive form page`
- PR selalu ke `develop`; sertakan nomor tiket Logitask di judul PR

## Testing
- Unit tests: Vitest, diletakkan bersebelahan source (`lib/auth.test.ts`)
- E2E: Playwright (`e2e/`), baseURL `http://localhost:3000`, auto-start dev server
- Bug fixing (`/fix`): TDD — tulis test reproduksi dulu (harus gagal), baru perbaiki

## Out of bounds
- `prisma/migrations/` — JANGAN edit file migration yang sudah di-apply
- `.env` — JANGAN commit atau overwrite; gunakan `.env.example` sebagai referensi

## Security baseline
Fitur auth: setiap perubahan pada `middleware.ts`, `lib/auth.ts`, atau API route auth wajib dijalankan `/security-review` sebelum merge.

## Design system
Lihat `DESIGN.md` untuk color palette, typography, dan pola komponen.

## Task tracking
Tiket ada di Logitask project **TMM (TRAINING - Maju Motor)**. Ambil detail tiket via Logitask MCP sebelum implementasi.
