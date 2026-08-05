import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomUUID()
const JWT_EXPIRES_IN = '24h'

export interface JwtPayload {
  id: number
  name: string
  email: string
  role: 'admin' | 'umkm_owner'
}

export type ContextVariables = {
  user?: JwtPayload
}

export async function generateToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(new TextEncoder().encode(JWT_SECRET))
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return {
      id: payload.id as number,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as JwtPayload['role'],
    }
  } catch {
    return null
  }
}

export async function authMiddleware(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }

  c.set('user', payload)
  await next()
}

export function requireRole(role: 'admin' | 'umkm_owner') {
  return async (c: any, next: any) => {
    const user = c.get('user')
    if (!user) return c.json({ error: 'Unauthorized' }, 401)
    if (user.role !== role) return c.json({ error: 'Forbidden' }, 403)
    await next()
  }
}

export function requireAnyRole(...roles: Array<'admin' | 'umkm_owner'>) {
  return async (c: any, next: any) => {
    const user = c.get('user')
    if (!user) return c.json({ error: 'Unauthorized' }, 401)
    if (!roles.includes(user.role)) return c.json({ error: 'Forbidden' }, 403)
    await next()
  }
}