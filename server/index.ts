import { config } from 'dotenv'
config()
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { Hono } from 'hono'
import type { Context } from 'hono'
import { logger } from './middleware/logger.js'
import api from './routes/index.js'
import catalog from './routes/catalog.js'
import { MEDIA_KEY_RE } from './config/media.js'

const app = new Hono()

// Security headers middleware
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('X-XSS-Protection', '1; mode=block')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
})

app.use('*', logger)
app.route('/api', api)
app.route('/api', catalog)

app.get('/health', (c) => c.text('OK'))

// Local dev storage: serve uploaded files from ./uploads (production uses
// object storage, where this route never matches a real file).
app.get('/uploads/*', async (c) => {
  const key = decodeURIComponent(c.req.path.replace(/^\/uploads\//, ''))
  if (!MEDIA_KEY_RE.test(key)) return c.json({ success: false, error: 'Not found' }, 404)
  try {
    const data = await readFile(join(resolve(process.cwd(), 'uploads'), key))
    return c.body(new Uint8Array(data), 200, { 'Content-Type': 'image/webp' })
  } catch {
    return c.json({ success: false, error: 'Not found' }, 404)
  }
})

// Global error handler — always JSON, never HTML/text error pages
app.onError((err: Error, c: Context) => {
  console.error('[onError]', c.req.method, c.req.url, err?.message)
  return c.json({ success: false, error: 'Terjadi kesalahan pada server' }, 500)
})

// Not found — JSON for /api/*, fall through to Vercel for the rest (handled by rewrites)
app.notFound((c: Context) => {
  if (c.req.path.startsWith('/api') || c.req.path === '/health') {
    return c.json({ success: false, error: 'Not found' }, 404)
  }
  return c.text('Not found', 404)
})

export default app