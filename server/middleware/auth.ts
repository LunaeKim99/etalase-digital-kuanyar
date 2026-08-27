import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    '[auth] JWT_SECRET environment variable is required and must be at least 32 characters. ' +
    'Set JWT_SECRET in Vercel env vars (or .env for local dev).',
  )
}

const secretBytes = new TextEncoder().encode(JWT_SECRET)
const JWT_EXPIRES_IN = '24h'

export interface JwtPayload {
  id: number
  name: string
  email: string
  role: 'admin'
}

export type ContextVariables = {
  user?: JwtPayload
}

export async function generateToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretBytes)
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretBytes)
    if (
      typeof payload.id !== 'number' ||
      typeof payload.role !== 'string' ||
      payload.role !== 'admin'
    ) {
      return null
    }
    return {
      id: payload.id,
      name: typeof payload.name === 'string' ? payload.name : '',
      email: typeof payload.email === 'string' ? payload.email : '',
      role: payload.role,
    }
  } catch {
    return null
  }
}

export async function authMiddleware(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Missing Authorization header' }, 401)
  }
  const match = /^Bearer\s+(\S+)$/.exec(authHeader)
  if (!match) {
    return c.json({ success: false, error: 'Malformed Authorization header' }, 401)
  }
  const token = match[1]
  if (!token) {
    return c.json({ success: false, error: 'Empty token' }, 401)
  }
  const payload = await verifyToken(token)
  if (!payload) {
    return c.json({ success: false, error: 'Invalid or expired token' }, 401)
  }
  c.set('user', payload)
  await next()
}

export function requireRole(role: 'admin') {
  return async (c: any, next: any) => {
    const user = c.get('user')
    if (!user) return c.json({ success: false, error: 'Unauthorized' }, 401)
    if (user.role !== role) return c.json({ success: false, error: 'Forbidden' }, 403)
    await next()
  }
}
