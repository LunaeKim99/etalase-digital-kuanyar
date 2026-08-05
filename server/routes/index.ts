import { Hono } from 'hono'
import { hashPassword } from '../middleware/password'
import { authenticateUser, createUser } from '../services/catalog'
import { generateToken } from '../middleware/auth'

const publicRoutes = new Hono()

publicRoutes.post('/auth/login', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const email = body.email
  const password = body.password
  if (!email || !password) return c.json({ error: 'Email dan password wajib diisi' }, 400)
  const user = await authenticateUser(email, password)
  if (!user) return c.json({ error: 'Email atau password salah' }, 401)
  const token = await generateToken({ id: user.id, name: user.name, email: user.email, role: user.role as any })
  return c.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})

publicRoutes.post('/auth/register', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { name, email, password, role } = body
  if (!name || !email || !password) return c.json({ error: 'Nama, email, dan password wajib diisi' }, 400)
  const existing = await createUser({ name, email, passwordHash: hashPassword(password), role: role || 'umkm_owner', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  return c.json({ token: await generateToken({ id: existing.id, name: existing.name, email: existing.email, role: existing.role as any }), user: { id: existing.id, name: existing.name, email: existing.email, role: existing.role } })
})

export default publicRoutes