# majumotor-web — Starter Repo Training

Baseline website **PT Maju Motor** (klien fiktif) untuk coaching session
"Claude End-to-End Flow" LOGIQUE. Repo ini adalah titik awal Part 3 demo:
fitur **Booking Test Drive** (tiket TMM-1 s.d. TMM-7 di Logitask) akan
diimplementasikan dari sini.

## Persiapan sebelum sesi (trainer)

```bash
npm install
npx prisma generate
npm run dev          # cek baseline jalan di http://localhost:3000
```

Lalu push ke GitHub:

```bash
git remote add origin <url-repo-github>
git push -u origin main develop
```

## Yang sudah ada di baseline
- Homepage dealer (hero + lineup mobil dari `lib/cars.ts`)
- Prisma + SQLite ter-setup (schema kosong, model `Booking` dibuat saat demo)
- `CLAUDE.md` berisi konvensi repo (branch/commit per SOP B-3)

## Yang sengaja BELUM ada (dibuat saat demo)
- `/test-drive` — form booking (TMM-3, TMM-4)
- `POST/GET /api/bookings` + model `Booking` (TMM-5)
- `/admin/bookings` — daftar booking untuk sales (TMM-7)
