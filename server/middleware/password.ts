import { scryptSync, timingSafeEqual, randomBytes } from 'node:crypto'

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derivedKey}`
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, derivedKey] = hash.split(':')
  if (!salt || !derivedKey) return false
  const key = scryptSync(password, salt, 64).toString('hex')
  return timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derivedKey, 'hex'))
}