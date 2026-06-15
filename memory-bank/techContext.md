# Tech Context — majumotor-web

## Stack
| Layer | Teknologi | Versi |
|-------|-----------|-------|
| Framework | Next.js (App Router) | ^14.2.0 |
| Language | TypeScript | ^5 |
| ORM | Prisma | ^5.22.0 |
| Database | SQLite | (via Prisma) |
| Auth — JWT | jose | ^6.2.3 |
| Auth — password | bcryptjs | ^3.0.3 |
| Test — unit | Vitest | ^2.1.0 |
| Test — E2E | Playwright | ^1.60.0 |
| CSS | Pure CSS | (no framework) |

## Dev environment
- Host (macOS) — tidak ada Docker
- Node.js + npm
- SQLite DB: `prisma/prisma/dev.db` (path dari `DATABASE_URL` di `.env`)

## Setup dari clone
```bash
cp .env.example .env           # isi DATABASE_URL dan JWT_SECRET
npm install
npx prisma migrate dev         # buat DB + jalankan migrations + seed otomatis
npm run dev                    # http://localhost:3000
```

## Commands
```bash
npm run dev          # dev server
npm test             # unit tests (Vitest)
npx playwright test  # E2E tests
npx prisma migrate dev --name <name>  # migration baru
npx prisma db seed   # seed manual
npm run lint         # ESLint via next lint
```

## Env vars
- `DATABASE_URL` — contoh: `file:./prisma/dev.db`
- `JWT_SECRET` — min 32 karakter random, wajib diganti dari default di production

## External integrations
- Logitask MCP — fetch tiket untuk acceptance criteria sebelum implementasi
- GitHub: `https://github.com/faishallogique/training_majumotor_project`
  - Default branch: `main`; development branch: `develop`

## Dependencies baru yang perlu diperhatikan
- `jose` — harus dipakai (bukan `jsonwebtoken`) karena Next.js middleware jalan di Edge runtime
- `bcryptjs` — pure JS, tidak butuh native bindings (aman di macOS/Linux)
- `ts-node` — untuk menjalankan `prisma/seed.ts`
