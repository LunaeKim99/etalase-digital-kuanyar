import { config } from 'dotenv'
config()
import { Hono } from 'hono'
import type { Context } from 'hono'
import { logger } from './middleware/logger.js'
import api from './routes/index.js'
import catalog from './routes/catalog.js'

const app = new Hono()

app.use('*', logger)
app.route('/api', api)
app.route('/api', catalog)

app.get('/health', (c) => c.text('OK'))

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