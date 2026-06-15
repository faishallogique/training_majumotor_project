# Progress — majumotor-web

_Last updated: 2026-06-15_

## Feature status

| Fitur | Status | Tiket | Branch/PR |
|-------|--------|-------|-----------|
| Company profile homepage | ✅ Done | baseline | `main` |
| Lineup mobil (getFeaturedCars) | ✅ Done | baseline | `main` |
| Staff authentication | ✅ Done | MMTDB-2 | PR #1 → `develop` |
| — Login page UI | ✅ Done | MMTDB-3 | (bagian MMTDB-2) |
| — POST /auth/login | ✅ Done | MMTDB-4 | (bagian MMTDB-2) |
| — Session management (JWT cookie) | ✅ Done | MMTDB-5 | (bagian MMTDB-2) |
| — Route protection middleware | ✅ Done | MMTDB-6 | (bagian MMTDB-2) |
| — Seed akun staff | ✅ Done | MMTDB-7 | (bagian MMTDB-2) |
| — Logout | ✅ Done | MMTDB-8 | (bagian MMTDB-2) |
| Form booking test drive | ⬜ Planned | TMM-? | — |
| Daftar booking di admin | ⬜ Planned | TMM-? | — |

## Test coverage

| Area | Type | Count | Status |
|------|------|-------|--------|
| lib/auth.ts | Unit (Vitest) | 4 | ✅ Pass |
| POST /auth/login | Unit (Vitest) | 4 | ✅ Pass |
| Auth E2E flow | E2E (Playwright) | 5 | ✅ Pass |
| lib/cars.ts | Unit (Vitest) | — | ✅ Pass (dari baseline) |

## Known issues
- `prisma/prisma/` directory muncul di working tree (duplikat path, perlu dihapus)
- `start.sh`, `stop.sh` untracked — belum dicek apakah perlu di-commit atau diabaikan
- `.gitignore` punya uncommitted changes — perlu dicek

## Recent milestones
- 2026-06-15: Staff Authentication (MMTDB-2) selesai, PR #1 dibuat
- 2026-06-15: Playwright setup (host, chromium)
- 2026-06-15: Prisma migration pertama applied (StaffUser model)
- 2026-06-15: Onboarding Claude context — CLAUDE.md, DESIGN.md, .env.example, memory-bank
