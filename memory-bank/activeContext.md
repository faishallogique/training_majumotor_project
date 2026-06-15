# Active Context — majumotor-web

_Last updated: 2026-06-15_

## Current state
Fitur Staff Authentication (MMTDB-1/MMTDB-2) selesai dan di-PR. Memory bank baru saja diinisialisasi. Onboarding Claude context juga selesai (CLAUDE.md diupdate, DESIGN.md dan .env.example digenerate).

## Recently completed (sesi ini)
- ✅ MMTDB-2: Staff Authentication — login, logout, JWT cookie, middleware protect `/admin`, seed staff
- ✅ PR #1 dibuat: `feat(auth): add staff authentication for admin portal (MMTDB-2)` → `develop`
- ✅ CLAUDE.md diupdate (36 → 345 words, tambah Commands, Env vars, Out of bounds, Security baseline, Design ref)
- ✅ DESIGN.md digenerate (color system, typography, component patterns, anti-patterns)
- ✅ `.env.example` digenerate
- ✅ Playwright setup (host mode, chromium, `e2e/` directory)
- ✅ Prisma migration `20260615080528_add_staff_user` applied
- ✅ Seed: `staff@majumotor.com` / `password123`

## Branch status
- `main` — baseline project
- `develop` — menerima PR dari feature branches
- `feat/MMTDB-2-staff-authentication` — merged via PR #1 (masih ada di remote)
- `fix/tmm-8-ev-missing-homepage-prepared` — ada di local, belum di-PR

## Open decisions
- PR #1 belum di-merge ke `develop` — perlu approval
- `fix/tmm-8-ev-missing-homepage-prepared` belum diketahui konteksnya — perlu dicek

## Next concrete steps
1. Merge PR #1 setelah review
2. Ambil tiket berikutnya dari Logitask TMM (kemungkinan form booking test drive atau daftar booking admin)
3. Buat branch `feat/<tiket>-<slug>` dari `develop` untuk tiket berikutnya
