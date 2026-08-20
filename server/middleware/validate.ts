import type { Context } from 'hono'
import type { ZodSchema } from 'zod'

export async function validateBody<T>(c: Context, schema: ZodSchema<T>): Promise<{ data: T; error?: never } | { data?: never; error: Response }> {
  const body = await c.req.json().catch(() => null)
  if (body === null) {
    return { error: c.json({ error: 'Request body tidak valid' }, 400) }
  }
  const result = schema.safeParse(body)
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Validasi gagal'
    return { error: c.json({ error: message }, 400) }
  }
  return { data: result.data }
}
