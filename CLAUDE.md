# majumotor-web

Website company profile PT Maju Motor (klien fiktif — project training internal LOGIQUE).

## Stack
- Next.js 14 (App Router) + TypeScript
- Prisma + SQLite (schema masih kosong — model ditambahkan per tiket)
- CSS murni di `app/globals.css` (tanpa Tailwind)

## Struktur
- `app/` — pages & layout (App Router)
- `lib/cars.ts` — satu-satunya sumber data lineup mobil (statis)
- `prisma/schema.prisma` — schema database

## Konvensi (mengikuti SOP B-3 Development Process LOGIQUE)
- Branch: `feat/<ticket>-<slug>`, mis. `feat/TMM-3-booking-form` — dibuat dari `develop`
- Commit: Conventional Commits, mis. `feat(booking): add test drive form page`
- PR selalu ke `develop`; sertakan nomor tiket Logitask di judul PR

## Testing
- Test runner: **Vitest**. Jalankan dengan `npm test` (atau `npm run test:watch`).
- Unit test fungsi murni diletakkan bersebelahan dengan source-nya, mis. `lib/cars.test.ts`.
- Untuk **bug fixing** (`/fix`): ikuti TDD SOP B-3 — tulis dulu test yang **mereproduksi** bug
  (harus gagal), baru perbaiki kodenya hingga test lulus.

## Task tracking
Tiket ada di Logitask project **TMM (TRAINING - Maju Motor)**. Ambil detail tiket
(acceptance criteria, definition of done) via Logitask MCP sebelum mulai implementasi.
