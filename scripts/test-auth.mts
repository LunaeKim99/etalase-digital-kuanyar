// Auth unit tests — run via: npx tsx scripts/test-auth.mts
// Verifies password hashing, JWT signing/verification, and rate limiter
// without needing a DB or running server.

import './load-env.ts'
import { jwtVerify, SignJWT } from 'jose'
import { generateToken, verifyToken } from '../server/middleware/auth.ts'
import { hashPassword, verifyPassword } from '../server/middleware/password.ts'
import { checkRateLimit } from '../server/middleware/rateLimit.ts'

let passed = 0
let failed = 0
const results: { name: string; ok: boolean; detail?: string }[] = []

function test(name: string, fn: () => boolean | Promise<boolean>) {
  return Promise.resolve().then(fn).then(
    (ok) => {
      results.push({ name, ok })
      if (ok) passed++
      else failed++
      console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`)
    },
    (err) => {
      results.push({ name, ok: false, detail: String(err) })
      failed++
      console.log(`FAIL: ${name} — ${err}`)
    },
  )
}

const secret = process.env.JWT_SECRET
if (!secret || secret.length < 32) {
  console.error('Set JWT_SECRET in env (>= 32 chars) before running this test.')
  process.exit(1)
}

await test('hashPassword produces verifiable hash', () => {
  const hash = hashPassword('hello123')
  return verifyPassword('hello123', hash)
})

await test('verifyPassword rejects wrong password', () => {
  const hash = hashPassword('hello123')
  return verifyPassword('wrong', hash) === false
})

await test('verifyPassword rejects malformed hash', () => {
  return verifyPassword('hello', 'not-a-valid-hash') === false
})

await test('generateToken produces valid JWT verified by verifyToken', async () => {
  const token = await generateToken({ id: 1, name: 'Test', email: 't@e.com', role: 'admin' })
  const payload = await verifyToken(token)
  return payload !== null && payload.id === 1 && payload.role === 'admin'
})

await test('verifyToken rejects malformed token', async () => {
  return (await verifyToken('not-a-jwt')) === null
})

await test('verifyToken rejects empty string', async () => {
  return (await verifyToken('')) === null
})

await test('verifyToken rejects token signed with different secret', async () => {
  const otherSecret = new TextEncoder().encode('a'.repeat(32))
  const fakeToken = await new SignJWT({ id: 99, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(otherSecret)
  return (await verifyToken(fakeToken)) === null
})

await test('verifyToken rejects expired token', async () => {
  const seconds = new TextEncoder().encode(secret)
  const expiredToken = await new SignJWT({ id: 1, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(Math.floor(Date.now() / 1000) - 7200)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 3600)
    .sign(seconds)
  return (await verifyToken(expiredToken)) === null
})

await test('verifyToken rejects payload with invalid role', async () => {
  const seconds = new TextEncoder().encode(secret)
  const badRoleToken = await new SignJWT({ id: 1, role: 'superuser' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(seconds)
  return (await verifyToken(badRoleToken)) === null
})

await test('verifyToken rejects payload with non-numeric id', async () => {
  const seconds = new TextEncoder().encode(secret)
  const badIdToken = await new SignJWT({ id: 'abc', role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(seconds)
  return (await verifyToken(badIdToken)) === null
})

await test('verifyToken rejects tampered payload (signature mismatch)', async () => {
  const token = await generateToken({ id: 1, name: 'A', email: 'a@b.c', role: 'admin' })
  const parts = token.split('.')
  const tampered = parts[0] + '.' + parts[1].slice(0, -3) + 'XXX.' + parts[2]
  return (await verifyToken(tampered)) === null
})

await test('rate limit allows initial requests then blocks', () => {
  const key = `test:limit:${Date.now()}:${Math.random()}`
  let allowed = 0
  for (let i = 0; i < 12; i++) {
    if (checkRateLimit(key).allowed) allowed++
  }
  return allowed === 10
})

await test('rate limit blocks different key independently', () => {
  const a = `test:independent:${Date.now()}:a`
  const b = `test:independent:${Date.now()}:b`
  for (let i = 0; i < 12; i++) checkRateLimit(a)
  return checkRateLimit(b).allowed === true
})

// Smoke test for raw jose library — confirms our JWT_SECRET is valid base
await test('jose library accepts our JWT_SECRET', async () => {
  const seconds = new TextEncoder().encode(secret)
  const token = await new SignJWT({ test: true }).setProtectedHeader({ alg: 'HS256' }).sign(seconds)
  await jwtVerify(token, seconds)
  return true
})

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)