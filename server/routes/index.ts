import { Hono } from 'hono'
import { hashPassword } from '../middleware/password'
import { authenticateUser, createUser, getUserById } from '../services/catalog'
import { generateToken, verifyToken } from '../middleware/auth'
import { checkRateLimit, getClientIp } from '../middleware/rateLimit'

const publicRoutes = new Hono()

publicRoutes.post('/auth/login', async (c) => {
  const ipKey = `login:ip:${getClientIp(c)}`
  const ipLimit = checkRateLimit(ipKey)
  if (!ipLimit.allowed) {
    c.header('Retry-After', String(ipLimit.retryAfterSec))
    return c.json({ success: false, error: 'Terlalu banyak percobaan, coba lagi nanti' }, 429)
  }

  try {
    const body = await c.req.json().catch(() => ({}))
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (!email || !password) return c.json({ success: false, error: 'Email atau password salah' }, 400)
    if (password.length > 200) return c.json({ success: false, error: 'Email atau password salah' }, 400)

    const emailLimit = checkRateLimit(`login:email:${email}`)
    if (!emailLimit.allowed) {
      c.header('Retry-After', String(emailLimit.retryAfterSec))
      return c.json({ success: false, error: 'Terlalu banyak percobaan, coba lagi nanti' }, 429)
    }
    const user = await authenticateUser(email, password)
    if (!user) return c.json({ success: false, error: 'Email atau password salah' }, 401)
    const token = await generateToken({ id: user.id, name: user.name, email: user.email, role: user.role as 'admin' | 'umkm_owner' })
    return c.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    console.error('[login error]', err)
    return c.json({ success: false, error: 'Email atau password salah' }, 500)
  }
})

publicRoutes.post('/auth/register', async (c) => {
  const ipKey = `register:ip:${getClientIp(c)}`
  const ipLimit = checkRateLimit(ipKey)
  if (!ipLimit.allowed) {
    c.header('Retry-After', String(ipLimit.retryAfterSec))
    return c.json({ success: false, error: 'Terlalu banyak percobaan, coba lagi nanti' }, 429)
  }

  try {
    const body = await c.req.json().catch(() => ({}))
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (!name || !email || !password) {
      return c.json({ success: false, error: 'Nama, email, dan password wajib diisi' }, 400)
    }
    if (password.length < 8 || password.length > 200) {
      return c.json({ success: false, error: 'Password minimal 8 karakter' }, 400)
    }
    const created = await createUser({
      name,
      email,
      passwordHash: hashPassword(password),
      role: 'umkm_owner',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    if (!created) return c.json({ success: false, error: 'Gagal membuat akun' }, 500)
    const token = await generateToken({ id: created.id, name: created.name, email: created.email, role: 'umkm_owner' })
    return c.json({
      success: true,
      token,
      user: { id: created.id, name: created.name, email: created.email, role: 'umkm_owner' },
    })
  } catch (err: any) {
    if (typeof err?.message === 'string' && err.message.includes('UNIQUE')) {
      return c.json({ success: false, error: 'Email sudah terdaftar' }, 409)
    }
    console.error('[register error]', err)
    return c.json({ success: false, error: 'Gagal membuat akun' }, 500)
  }
})

publicRoutes.get('/auth/me', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) return c.json({ success: false, error: 'Missing Authorization header' }, 401)
  const match = /^Bearer\s+(\S+)$/.exec(authHeader)
  if (!match) return c.json({ success: false, error: 'Malformed Authorization header' }, 401)
  const payload = await verifyToken(match[1])
  if (!payload) return c.json({ success: false, error: 'Invalid or expired token' }, 401)
  const user = await getUserById(payload.id)
  if (!user) return c.json({ success: false, error: 'User not found' }, 401)
  return c.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

export default publicRoutes