# Product Context — majumotor-web

## Problem solved
Dealer otomotif PT Maju Motor butuh:
1. Presence digital — website company profile untuk calon pembeli
2. Portal admin internal — staff bisa terima dan kelola booking test drive tanpa harus dikerjakan manual

## User journeys

### Calon pembeli (public)
- Buka website → lihat lineup mobil → isi form booking test drive → tunggu konfirmasi

### Staff dealer (admin)
- Buka `/admin` → login dengan email + password → lihat daftar booking yang masuk → logout

## UX principles
- **Simple over clever** — staff dealer bukan tech-savvy, form dan flow harus intuitif
- **Secure by default** — halaman admin tidak boleh dapat diakses publik sama sekali
- **No flash / no guesswork** — redirect unauthenticated terjadi server-side (middleware), bukan client-side guard

## Design direction
Clean / corporate-automotive. Dark navy (#1a1a2e) sebagai anchor premium, merah (#c1121f) sebagai aksen.
Lihat `DESIGN.md` untuk detail.
