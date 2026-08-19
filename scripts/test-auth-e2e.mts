const BASE = 'http://localhost:4000'

async function req(path: string, opts: RequestInit = {}): Promise<{ status: number; body: any }> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  })
  const body = await res.json().catch(() => null)
  return { status: res.status, body }
}

let passed = 0, failed = 0
function assert(name: string, ok: boolean, detail?: string) {
  if (ok) { passed++; console.log(`PASS: ${name}`) }
  else { failed++; console.log(`FAIL: ${name}${detail ? ' — ' + detail : ''}`) }
}

// Test 1: health check
const hRes = await fetch(`${BASE}/health`)
assert('GET /health → 200', hRes.status === 200 && await hRes.text() === 'OK', `got ${hRes.status}`)

// Test 2: login with valid credentials
const login = await req('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: 'admin@kuanyar.desa.id', password: 'admin123' }),
})
assert('POST /api/auth/login valid → 200 + token', login.status === 200 && !!login.body?.token, JSON.stringify(login.body))
const adminToken = login.body?.token

// Test 3: login with wrong password
const wrongPw = await req('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: 'admin@kuanyar.desa.id', password: 'wrong' }),
})
assert('POST /api/auth/login wrong password → 401', wrongPw.status === 401, JSON.stringify(wrongPw.body))

// Test 4: login with unknown email
const unknown = await req('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: 'nobody@test.com', password: 'x' }),
})
assert('POST /api/auth/login unknown email → 401', unknown.status === 401, JSON.stringify(unknown.body))

// Test 5: login with empty payload
const emptyP = await req('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({}),
})
assert('POST /api/auth/login empty payload → 400 or 401', emptyP.status === 400 || emptyP.status === 401, JSON.stringify(emptyP.body))

// Test 6: register role=admin (must be ignored)
const regAdmin = await req('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify({ name: 'Hacker', email: `hacker${Date.now()}@test.com`, password: 'pass1234', role: 'admin' }),
})
assert('POST /api/auth/register with role=admin → user gets umkm_owner', regAdmin.status === 200 && regAdmin.body?.user?.role === 'umkm_owner', JSON.stringify(regAdmin.body))

// Test 7: /api/auth/me with no token
const noToken = await req('/api/auth/me')
assert('GET /api/auth/me no token → 401', noToken.status === 401, JSON.stringify(noToken.body))

// Test 8: /api/auth/me with invalid token
const badToken = await req('/api/auth/me', { headers: { Authorization: 'Bearer invalidtoken' } })
assert('GET /api/auth/me invalid token → 401', badToken.status === 401, JSON.stringify(badToken.body))

// Test 9: /api/auth/me with valid token
const me = await req('/api/auth/me', { headers: { Authorization: `Bearer ${adminToken}` } })
assert('GET /api/auth/me valid token → 200 + user', me.status === 200 && me.body?.user?.email === 'admin@kuanyar.desa.id', JSON.stringify(me.body))

// Test 10: admin API with no token
const adminNoAuth = await req('/api/admin/posts')
assert('GET /api/admin/posts no token → 401', adminNoAuth.status === 401, JSON.stringify(adminNoAuth.body))

// Test 11: admin API with umkm_owner token
const ownerLogin = await req('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email: 'sutrisno@kuanyar.desa.id', password: 'owner123' }),
})
assert('login umkm_owner → 200', ownerLogin.status === 200 && !!ownerLogin.body?.token, JSON.stringify(ownerLogin.body))
const ownerToken = ownerLogin.body?.token
const adminWithOwner = await req('/api/admin/posts', { headers: { Authorization: `Bearer ${ownerToken}` } })
assert('GET /api/admin/posts with umkm_owner → 403', adminWithOwner.status === 403, JSON.stringify(adminWithOwner.body))

// Test 12: owner API with admin token
const adminOwnerApi = await req('/api/owner/me/umkm', { headers: { Authorization: `Bearer ${adminToken}` } })
assert('GET /api/owner/me/umkm with admin → 200 or 201', adminOwnerApi.status === 200 || adminOwnerApi.status === 201, JSON.stringify(adminOwnerApi.body))

// Test 13: public posts endpoint (no auth required)
const publicPosts = await req('/api/posts')
assert('GET /api/posts → 200', publicPosts.status === 200, JSON.stringify(publicPosts.body))

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed === 0 ? 0 : 1)