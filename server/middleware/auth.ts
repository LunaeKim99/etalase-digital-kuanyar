import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomUUID()
const JWT_EXPIRES_IN = '24h'

export async function generateToken(username: string, role: string, name: string): Promise<string> {
  return new SignJWT({ username, role, name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(new TextEncoder().encode(JWT_SECRET))
}

export async function verifyToken(token: string): Promise<{ username: string; role: string; name: string } | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return {
      username: payload.username as string,
      role: payload.role as string,
      name: payload.name as string,
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
