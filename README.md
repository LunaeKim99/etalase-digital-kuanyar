# Etalase Digital Desa Kuanyar

> Platform digital untuk mempromosikan potensi Desa Kuanyar — profil desa, UMKM, produk unggulan, berita, galeri, dan kontak.

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=fff">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=fff">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff">
  <img alt="Hono" src="https://img.shields.io/badge/Hono-4-00C896?logo=hono&logoColor=fff">
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle&logoColor=000">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=fff">
  <img alt="SQLite/Turso" src="https://img.shields.io/badge/SQLite_|_Turso-003B57?logo=sqlite&logoColor=fff">
  <img alt="Vercel" src="https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=fff">
</p>

---

## Daftar Isi

- [Tentang](#tentang)
- [Fitur Utama](#fitur-utama)
- [Stack Teknologi](#stack-teknologi)
- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Struktur Proyek](#struktur-proyek)
- [Frontend Routes](#frontend-routes)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Default Admin](#default-admin)
- [Development Notes](#development-notes)
- [Roadmap](#roadmap)
- [Catatan Produksi](#catatan-produksi)
- [License](#license)
- [Kontribusi](#kontribusi)

---

## Tentang

Etalase Digital Desa Kuanyar mempromosikan potensi Desa Kuanyar (Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah) seperti UMKM, produk unggulan, dan berita desa. Frontend static SPA + backend Hono API di-deploy ke Vercel, dengan database Turso (libSQL/SQLite).

## Fitur Utama

| Halaman | Deskripsi |
|---------|-----------|
| **Beranda** | Hero, statistik desa, UMKM unggulan, berita terkini |
| **Profil Desa** | Sejarah, visi & misi, data demografi, fasilitas, info administrasi, lokasi (Leaflet) |
| **UMKM** | Daftar UMKM dengan pencarian, detail UMKM (profil, produk, kontak WhatsApp) |
| **Produk** | Katalog produk UMKM dengan pencarian & detail produk |
| **Berita & Galeri** | Daftar berita dengan filter kategori, detail berita dengan galeri gambar |
| **Kontak** | Informasi kantor desa, peta lokasi |
| **Admin Panel** | Login JWT, dashboard, CRUD UMKM/produk/berita/kategori/profil desa |

## Stack Teknologi

**Frontend**
- React 19 + TypeScript
- Vite 8 (build & dev server)
- React Router v7 (lazy loading)
- TanStack Query v5 (server state)
- Tailwind CSS v4 (styling)
- Leaflet + React Leaflet (peta)
- Lucide React (iktimeout)
- React Hook Form + Zod (validasi)
- React Helmet Async (SEO meta)
- NProgress (progress bar)

**Backend**
- Hono v4 (API server)
- Drizzle ORM + libSQL (SQLite/Turso)
- JWT auth (jose, HS256) + scrypt password hashing
- Hono Vercel adapter (serverless)

**Database**
- SQLite lokal (dev) / Turso libSQL remote (production)
- Migrasi via Drizzle Kit (SQL file di `drizzle/`)
- Seed idempotent (`server/db/seed.ts`)

**Tooling**
- Oxlint (linting)
- tsx (TypeScript runner untuk server dev & seed)
- Vite plugin Tailwind (`@tailwindcss/vite`)

## Quick Start

### Prasyarat
- Node.js 20+
- npm (atau pnpm/yarn)

### Instalasi

```bash
git clone git@github.com:LunaeKim99/etalase-digital-kuanyar.git
cd etalase-digital-kuanyar
npm install

cp .env.example .env
# Edit .env: set TURSO_DATABASE_URL & TURSO_AUTH_TOKEN (lihat .env.example)

# Apply migrasi ke database
npm run db:migrate

# Seed data mock (opsional, idempotent — aman dijalankan ulang)
npm run seed

# Jalankan 2 terminal:
npm run dev:server   # Terminal 1: API server (Hono) di http://localhost:4000
npm run dev          # Terminal 2: Frontend (Vite) di http://localhost:5173
```

Frontend Vite mem-proxy `/api/*` → `http://localhost:4000`. Health check: `http://localhost:4000/health`.

## Scripts

| Perintah | Deskripsi |
|----------|-----------|
| `npm run dev` | Frontend dev server (Vite) |
| `npm run dev:server` | Backend API server (Hono via tsx) |
| `npm run build` | Build production — `tsc -b` + `vite build` |
| `npm run type-check` | TypeScript check tanpa emit |
| `npm run lint` | Oxlint |
| `npm run preview` | Preview build production |
| `npm run seed` | Seed database (idempotent, skip jika sudah ada) |
| `npm run db:generate` | Generate migrasi Drizzle Kit dari skema |
| `npm run db:migrate` | Apply migrasi |
| `npm run db:studio` | Buka Drizzle Studio (GUI database) |

## Struktur Proyek

```
etalase-digital-kuanyar/
├── api/
│   └── index.ts             # Vercel serverless function entry (Hono Vercel adapter, lazy import)
├── server/                   # Backend Hono API
│   ├── db/
│   │   ├── client.ts           # Drizzle + libSQL client (env fallback)
│   │   ├── schema.ts           # Schema database (7 tabel)
│   │   └── seed.ts             # Seeder idempotent
│   ├── middleware/
│   │   ├── auth.ts             # JWT sign/verify + middleware role
│   │   ├── password.ts         # scrypt hash & verify
│   │   ├── safe.ts             # safeJson wrapper (structured JSON errors)
│   │   └── logger.ts           # Request logger
│   ├── routes/
│   │   ├── index.ts            # /api/auth/* routes
│   │   └── catalog.ts          # /api/* public + /api/admin/* + /api/owner/*
│   ├── services/
│   │   └── catalog.ts          # Business logic & CRUD semua entitas
│   ├── data/
│   │   └── mockData.ts         # Data seed development
│   ├── index.ts                # App Hono utama (mount routes + onError + notFound)
│   └── main.ts                 # Entry point server lokal (@hono/node-server)
├── src/                       # Frontend React
│   ├── components/{admin,cards,layout,sections,ui}/
│   ├── contexts/AuthContext.tsx
│   ├── hooks/
│   ├── layouts/{MainLayout,AdminLayout}.tsx
│   ├── lib/utils.ts
│   ├── pages/                 # Home, Profil, Umkm, ProductDetail, BeritaGaleri, Kontak, NotFound, admin/*
│   ├── services/{api,admin}.ts
│   ├── types/
│   ├── router.tsx             # React Router config + lazy
│   ├── App.tsx, main.tsx, index.css, nprogress.css
├── drizzle/                   # Migrasi SQL (0000_wakeful_bloodstorm.sql) + meta/
├── public/                   # Static assets (favicon, robots, sitemap)
├── DEPLOYMENT.md              # Checklist deploy Vercel (env vars, migration, verification)
├── vercel.json                # Config deploy: rewrites + includeFiles server/**
├── vite.config.ts             # Vite + Tailwind + proxy /api
├── drizzle.config.ts          # Drizzle Kit config
├── tsconfig{,.app,.node,.server}.json
└── package.json
```

## Frontend Routes

| Path | Halaman |
|------|---------|
| `/` | Home (beranda) |
| `/profil` | Profil Desa |
| `/umkm` | Daftar UMKM |
| `/umkm/:id` | Detail UMKM |
| `/produk/:id` | Detail Produk |
| `/berita-galeri` | Daftar Berita & Galeri |
| `/berita-galeri/:slug` | Detail Berita |
| `/kontak` | Kontak + peta |
| `/admin/login` | Login admin |
| `/admin/dashboard` | Dashboard admin |
| `/admin/umkm` | CRUD UMKM |
| `/admin/produk` | CRUD Produk |
| `/admin/berita-galeri` | CRUD Berita/Galeri |
| `/admin/profil` | CRUD Profil Desa |

## API Endpoints

Semua endpoint return `application/json`. Format response: `{ success: false, error, details }` saat error, `{ data: ... }` saat sukses.

### Publik

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/health` | Health check (return "OK") |
| `GET` | `/api/village-profile` | Profil desa |
| `GET` | `/api/posts` | List berita & galeri (`?search=&category=&limit=&offset=`) |
| `GET` | `/api/posts/:slug` | Detail berita + images |
| `GET` | `/api/categories` | Daftar kategori |
| `GET` | `/api/umkm` | List UMKM (`?search=`) |
| `GET` | `/api/umkm/:id` | Detail UMKM |
| `GET` | `/api/umkm/:id/products` | Produk milik UMKM |
| `GET` | `/api/products` | List produk (`?search=`) |
| `GET` | `/api/products/:id` | Detail produk |

### Autentikasi

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/auth/login` | Login (body: `{email, password}` → `{token, user}`) |
| `POST` | `/api/auth/register` | Register user baru |

### Admin (butuh `Authorization: Bearer <token>`, role `admin`)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/admin/village-profile` | Get profil desa |
| `PUT` | `/api/admin/village-profile` | Upsert profil desa |
| `POST` | `/api/admin/categories` | Tambah kategori |
| `DELETE` | `/api/admin/categories/:id` | Hapus kategori |
| `POST` | `/api/admin/umkm` | Tambah UMKM |
| `PUT` | `/api/admin/umkm/:id` | Update UMKM |
| `DELETE` | `/api/admin/umkm/:id` | Hapus UMKM |
| `POST` | `/api/admin/products` | Tambah produk |
| `PUT` | `/api/admin/products/:id` | Update produk |
| `DELETE` | `/api/admin/products/:id` | Hapus produk |
| `POST` | `/api/admin/posts` | Tambah berita |
| `PUT` | `/api/admin/posts/:id` | Update berita |
| `DELETE` | `/api/admin/posts/:id` | Hapus berita |
| `POST` | `/api/admin/posts/:id/images` | Tambah image ke post |
| `DELETE` | `/api/admin/images/:id` | Hapus image |

### Owner (butuh JWT, role `admin` atau `umkm_owner`)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/owner/me/umkm` | List UMKM milik user login |

## Database Schema

7 tabel (`server/db/schema.ts`):

| Tabel | Kolom utama | Deskripsi |
|-------|-------------|-----------|
| `users` | id, name, email, passwordHash, role | Admin & UMKM owner (role: `admin` / `umkm_owner`) |
| `umkm` | id, ownerId, name, status | Data UMKM (status: `pending`/`approved`/`rejected`) |
| `products` | id, umkmId, name, price, stock, status | Produk UMKM (status: `active`/`draft`/`inactive`) |
| `posts` | id, title, slug, content, category, authorId, coverImage | Berita/artikel |
| `post_images` | id, postId, imageUrl, caption, sortOrder | Gambar galeri untuk post |
| `categories` | id, name, slug | Kategori global |
| `village_profile` | id, name, overview, history, vision, mission, demographics, lat, lng | Profil desa (singleton) |

## Environment Variables

| Variable | Required | Default | Deskripsi |
|----------|----------|---------|-----------|
| `TURSO_DATABASE_URL` | Yes | `file:./sqlite.db` | libSQL/Turso URL. Production: `libsql://...turso.io` |
| `TURSO_AUTH_TOKEN` | Yes (Turso) | — | Auth token Turso (opsional jika local file SQLite) |
| `JWT_SECRET` | Yes (prod) | random UUID per restart | Secret HS256 sign/verify. Set di production agar session persist |
| `PORT` | No | `4000` | Port API server (local dev saja, Vercel abaikan) |
| `VITE_API_BASE_URL` | No | `http://localhost:4000` | Base URL API frontend (dev) |
| `SITE_URL` | No | — | URL canonical untuk SEO/OG |

> Lihat `.env.example` sebagai template, dan `DEPLOYMENT.md` untuk panduan setup Vercel.

## Deployment

### Vercel (recommended)

`vercel.json` sudah menangani:
- Rewrites: `/api/*` dan `/health` → `api/index.ts` (serverless function); lainnya → `/index.html` (SPA)
- `functions.api/index.ts.includeFiles: "server/**"` agar server code ikut di-bundle function
- Cache headers untuk `/assets/*`

Langkah:
1. Push ke GitHub (branch `master` auto-deploy)
2. Import project di Vercel
3. Set Environment Variables di Vercel dashboard (Production + Preview):
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `JWT_SECRET`
   - (opsional) `SITE_URL`
4. Deploy pertama → jalankan migrasi & seed sekali (lihat `DEPLOYMENT.md`)
5. Verify endpoints (lihat tabel verification di `DEPLOYMENT.md`)

### Manual (VPS)

```bash
npm run build
NODE_ENV=production node --import tsx server/main.ts
# Atau deploy dengan process manager (PM2, systemd) + reverse proxy (nginx)
```

## Default Admin

- Email: `admin@kuanyar.desa.id`
- Password: `admin123`

Dibuat oleh `npm run seed`. Ganti password di production via DB update langsung.

## Development Notes

- **Lazy loading**: semua halaman gunakan `React.lazy` + `Suspense`
- **Path aliases**: `@/` → `src/` (di-config di `tsconfig.app.json` paths + Vite)
- **Zod**: validasi form sisi frontend
- **SEO**: `react-helmet-async` per halaman
- **Maps**: Leaflet (OSM tiles)
- **Auth**: JWT HS256 via jose; password di-hash dengan `scrypt` (`server/middleware/password.ts`)
- **Error handling produksi**: semua route API dibungkus `safeJson()` (`server/middleware/safe.ts`) untuk memastikan response selalu `application/json` (503 jika tabel tidak ada atau DB config rusak, 500 untuk lainnya)
- **Seed idempotent**: `server/db/seed.ts` cek count existing + `onConflictDoNothing`; aman dijalankan ulang

## Roadmap

- [ ] Role-based access granular (editor, viewer)
- [ ] Image upload (Supabase Storage / Cloudflare R2)
- [ ] PWA (offline, install prompt)
- [ ] Unit/Integration tests (Vitest + Playwright)
- [ ] i18n (Indonesia/English/Jawa)
- [ ] Analytics (Plausible/Umami)
- [ ] Webhook notifikasi (WhatsApp/Email)
- [ ] Rate limiting & API pagination cursor

## Catatan Produksi

- Jangan jalankan auto-migrate saat function cold-start serverless (race condition antar instance). Jalankan migration manual sekali setelah schema change — lihat `DEPLOYMENT.md`.
- Jangan commit `.env` (sudah di `.gitignore`).
- Jangan `Get-Process -Name node | Stop-Process` saat menjalankan server lokal — membunuh proses Node lain yang tidak terkait. Kill berdasarkan PID spesifik.
- Turso DB persisten & shared; migration & seed dijalankan sekali perubahan skema.

## License

MIT License — bebas digunakan untuk keperluan desa/komunitas.

## Kontribusi

PR & issue welcome. Untuk perubahan besar, buka issue dulu untuk diskusi.

---

**Dibangun untuk Desa Kuanyar** 🌾