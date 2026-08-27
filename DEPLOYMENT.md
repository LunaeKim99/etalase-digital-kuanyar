# Deployment Checklist — Ruang Digital Potensi dan Karya Desa Kuanyar

## Vercel Environment Variables (Production)

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `TURSO_DATABASE_URL` | YES | `libsql://<db>.turso.io` | Remote Turso libSQL URL. Not `file:` in prod. |
| `TURSO_AUTH_TOKEN` | YES (if Turso) | `eyJ...` | Turso auth token. |
| `JWT_SECRET` | YES | 64+ random base64 | Used for HS256 sign/verify. If unset, server generates random per cold start (sessions invalidate on restart). |
| `MEDIA_STORAGE` | YES (prod) | `vercel-blob` | Must be `vercel-blob` on Vercel. `local` (dev default) fails: serverless filesystem is read-only. |
| `BLOB_READ_WRITE_TOKEN` | YES (if `MEDIA_STORAGE=vercel-blob`) | `vercel_blob_rw_...` | Auto-injected when creating a Blob store via Project → Storage tab. |
| `SITE_URL` | Optional | `https://etalase-digital-kuanyar.vercel.app` | For SEO/OG canonical. |
| `PORT` | No | `4000` | Only for local `dev:server`; ignored by Vercel. |
| `VITE_API_BASE_URL` | No | — | Frontend uses relative `/api/*` in prod. |

Verify in Vercel dashboard → Project → Settings → Environment Variables. Production + Preview must both have these.

## First-time Setup (or after schema changes)

1. Push code to `master`.
2. In Vercel, set env vars above (if missing).
3. Deploy (auto on push).
4. Run migration against Turso remote (once):
   ```powershell
   $env:TURSO_DATABASE_URL="<prod-url>"; $env:TURSO_AUTH_TOKEN="<token>"
   npx tsx scripts/migrate-remote.mjs   # or: npx drizzle-kit migrate (if config picks env)
   ```
   - ponigrass: drizzle-kit migrate sometimes hangs on Windows. Use direct SQL apply via `scripts/migrate-remote.mjs` as fallback.
5. Seed (idempotent — safe to rerun):
   ```powershell
   $env:TURSO_DATABASE_URL="<prod-url>"; $env:TURSO_AUTH_TOKEN="<token>"
   npx tsx server/db/seed.ts
   ```
   Skips automatically if data already exists.

## Verification Endpoints (after deploy)

| Endpoint | Expected | Check |
|----------|----------|-------|
| `GET /health` | `200 text/plain "OK"` | Server alive |
| `GET /api/potensi/categories` | `200 application/json {"data":[...]}` | Potensi tables |
| `GET /api/potensi/items` | `200 application/json {"data":[...]}` | Potensi items table |
| `GET /api/posts` | `200 application/json {"data":[...]}` | Posts table |
| `GET /api/village-profile` | `200 application/json {"data":{...}}` | village_profile table |
| `GET /api/categories` | `200 application/json {"data":[...]}` | categories table |
| `POST /api/auth/login` (body: `{"email":"admin@kuanyar.desa.id","password":"admin123"}`) | `200 application/json {"token":"...","user":{...}}` | Admin user + JWT works |
| `GET /api/nonexistent` | `404 application/json {"error":"Not found"}` | Not-found handler JSON |

Any `500 text/html` or `500 text/plain "A server e..."` = regression. Error handler should always return `application/json`.

## Default Admin

- Email: `admin@kuanyar.desa.id`
- Password: `admin123`
- Set via seed only. Change in prod by updating DB row.

## Failure Modes & Handling

| Symptom | Cause | Fix |
|---------|-------|-----|
| `{"success":false,"error":"Database not initialized"}` (503) | Turso DB has no tables | Run migration. |
| `{"success":false,"error":"Database configuration error"}` (503) | `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN` missing or invalid | Set Vercel env vars. |
| `{"success":false,"error":"Internal server error"}` (500) | Other runtime error | Check Vercel function logs. |
| Frontend `Unexpected token 'A' is not valid JSON` | Server returned HTML text error page | Should not happen after hardening; check if route bypasses `safeJson`. |

## DO NOT

- Do NOT run `seed.ts` on every request. It is script-only via `npx tsx server/db/seed.ts`.
- Do NOT commit `.env` (gitignored).
- Do NOT use `Get-Process -Name node | Stop-Process` (kills unrelated Node processes — e.g. 9router). Kill by specific PID.
- Do NOT add auto-migrate to cold start (risk: concurrent migrations on scaled serverless). Run migration manually once after schema changes.