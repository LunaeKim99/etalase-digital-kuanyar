import { Hono } from 'hono'
import { logger } from './middleware/logger'
import api from './routes'
import catalog from './routes/catalog'
import { authenticateUser, createUser } from './services/catalog'
import { generateToken } from './middleware/auth'
import { hashPassword } from './middleware/password'

const app = new Hono()

app.use('*', logger)
app.route('/api', api)
app.route('/api', catalog)

app.get('/health', (c) => c.text('OK'))

// Auth endpoints
app.post('/api/auth/login', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const email = body.email
  const password = body.password
  if (!email || !password) return c.json({ error: 'Email dan password wajib diisi' }, 400)
  const user = await authenticateUser(email, password)
  if (!user) return c.json({ error: 'Email atau password salah' }, 401)
  const token = await generateToken({ id: user.id, name: user.name, email: user.email, role: user.role as any })
  return c.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

app.post('/api/auth/register', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { name, email, password, role } = body
  if (!name || !email || !password) return c.json({ error: 'Nama, email, dan password wajib diisi' }, 400)
  const existing = await createUser({ name, email, passwordHash: hashPassword(password), role: role || 'umkm_owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  const token = await generateToken({ id: existing.id, name: existing.name, email: existing.email, role: existing.role as any })
  return c.json({ token, user: { id: existing.id, name: existing.name, email: existing.email, role: existing.role } })
})

export default app