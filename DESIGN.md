# DESIGN.md — majumotor-web

Design system PT Maju Motor. Semua keputusan visual baru harus merujuk ke dokumen ini.

## Brand identity

**Project:** Website company profile + portal admin PT Maju Motor (dealer otomotif)  
**Audience:** Calon pembeli mobil (public) + staff dealer (admin)  
**Personality:** Profesional, terpercaya, tegas — automotive dealer premium tapi approachable

## Aesthetic direction

Clean / corporate-automotive. Dark navy sebagai anchor warna premium, merah sebagai aksen energik.  
Referensi arah: Toyota Indonesia, Daihatsu Indonesia — bukan sporty/aggressive.

## Color system

```css
:root {
  --mm-red:  #c1121f;  /* primary action, accent, brand highlight */
  --mm-dark: #1a1a2e;  /* header bg, hero bg, dark text */
  --mm-gray: #f4f4f6;  /* page bg, card bg, subtle surface */
}

/* Warna tambahan (inline, belum dijadikan var) */
/* #2d2d4e  — hero gradient endpoint (dark navy variant)   */
/* #666     — secondary text, meta info                    */
/* #777     — footer text, placeholder                     */
/* #ddd     — input border default                         */
/* #fef2f2  — error background (red-50)                    */
/* #fecaca  — error border (red-200)                       */
/* #b91c1c  — error text (red-700)                         */
```

**Aturan warna:**
- `--mm-red` untuk: CTA button, price text, brand highlight, focus state border, hover fill
- `--mm-dark` untuk: header/hero background, body text utama
- `--mm-gray` untuk: page background, card background, section surface
- Jangan tambah warna baru tanpa menambahkannya sebagai CSS var di `:root`

## Typography

```css
font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
line-height: 1.6;
```

**Scale yang dipakai:**
| Role | Size |
|------|------|
| Hero heading | 2rem |
| Brand / nav | 1.25rem (font-weight 800) |
| Login brand | 1.5rem (font-weight 800) |
| Body | 1rem |
| Label / meta | 0.85rem |
| Small / footer | 0.85rem |

Tidak ada custom font — intentional untuk performa. Jangan tambah Google Fonts tanpa diskusi.

## Spacing & layout

- Container max-width: `960px`, padding horizontal `1.25rem`
- Section padding: `3rem 0` (standard), `4rem 0` (hero)
- Card padding: `1.25rem`
- Border radius: `10px` (card), `8px` (input, button, error box), `12px` (login card)
- Gap grid: `1rem`

## Component patterns

### Button — primary (`.btn-login`)
```css
background: var(--mm-red); color: #fff;
border-radius: 8px; padding: 0.75rem;
font-size: 1rem; font-weight: 600;
opacity hover: 0.88; disabled: 0.6;
```

### Button — outline (`.btn-logout`)
```css
border: 1.5px solid var(--mm-red); color: var(--mm-red);
hover: background var(--mm-red), color #fff;
```

### Card (`.car-card`)
```css
background: var(--mm-gray); border-radius: 10px; padding: 1.25rem;
```

### Form field (`.field input`)
```css
border: 1.5px solid #ddd; border-radius: 8px; padding: 0.65rem 0.85rem;
focus: border-color var(--mm-red);
```

### Error / alert box (`.login-error`)
```css
background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;
role="alert" wajib untuk accessibility;
```

### Login card (`.login-card`)
```css
max-width: 400px; border-radius: 12px; padding: 2.5rem 2rem;
box-shadow: 0 4px 24px rgba(0,0,0,0.08);
```

## Anti-patterns

- **Jangan hardcode warna hex** di komponen baru — pakai CSS var yang sudah ada
- **Jangan tambah library UI** (Bootstrap, Shadcn, dll) tanpa diskusi — project intentionally pure CSS
- **Jangan ubah `max-width: 960px`** container tanpa pertimbangan layout seluruh halaman
- **Jangan pakai inline style** untuk warna atau spacing yang sudah ada pola CSS-nya
