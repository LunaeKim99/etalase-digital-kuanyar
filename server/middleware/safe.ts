import type { Context } from 'hono'

type FnResult = Promise<unknown> | Record<string, unknown> | Response | unknown

export async function safeJson(c: Context, fn: () => FnResult, status: 200 | 201 = 200) {
  try {
    const data: any = await fn()
    // If handler already returned a Response (e.g. c.json({error}, 400)), pass through
    if (data && typeof data === 'object' && typeof (data as Response).status === 'number' && typeof (data as Response).json === 'function') {
      return data as Response
    }
    return c.json(data as any, status)
  } catch (err: any) {
    console.error('[route error]', c.req.method, c.req.path, err?.message)
    if (err?.message?.includes('no such table')) {
      return c.json({ success: false, error: 'Database not initialized', details: 'Tables missing — run migration', table: err.message.match(/no such table: (\w+)/)?.[1] }, 503)
    }
    if (err?.message?.includes('HTTP status 401') || err?.message?.includes('TOKEN') || err?.message?.includes('URL_INVALID') || err?.message?.includes('URL malformed')) {
      return c.json({ success: false, error: 'Database configuration error', details: 'Check TURSO_DATABASE_URL and TURSO_AUTH_TOKEN' }, 503)
    }
    return c.json({ success: false, error: 'Internal server error', details: err?.message ?? 'Unknown error' }, 500)
  }
}