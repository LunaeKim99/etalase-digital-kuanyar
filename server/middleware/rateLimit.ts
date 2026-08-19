const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 10

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

function getBucket(key: string): Bucket {
  const now = Date.now()
  let bucket = buckets.get(key)
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS }
    buckets.set(key, bucket)
  }
  return bucket
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const bucket = getBucket(key)
  bucket.count++
  if (bucket.count > MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((bucket.resetAt - Date.now()) / 1000)
    return { allowed: false, retryAfterSec: Math.max(retryAfter, 1) }
  }
  return { allowed: true, retryAfterSec: 0 }
}

export function getClientIp(c: any): string {
  return (
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    c.req.header('x-real-ip') ||
    'unknown'
  )
}

setInterval(() => {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key)
  }
}, 300_000).unref?.()
