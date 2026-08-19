import type { Context } from 'hono'

type FnResult = Promise<unknown> | Record<string, unknown> | Response | unknown

export async function safeJson(c: Context, fn: () => FnResult, status: 200 | 201 = 200) {
  try {
    const data: any = await fn()
    if (data && typeof data === 'object' && typeof (data as Response).status === 'number' && typeof (data as Response).json === 'function') {
      return data as Response
    }
    return c.json(data as any, status)
  } catch (err: any) {
    const msg = typeof err?.message === 'string' ? err.message : 'Unknown error'
    console.error('[route error]', c.req.method, c.req.path, msg)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
}