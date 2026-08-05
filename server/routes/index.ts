import { Hono } from 'hono'
import { db } from '../db/client'
import { etalase } from '../db/schema'
import { eq } from 'drizzle-orm'

const app = new Hono()

app.get('/home', async (c) => {
  const data = await db.select().from(etalase).all()
  return c.json(data)
})

app.get('/etalase', async (c) => {
  const data = await db.select().from(etalase).all()
  return c.json(data)
})

app.get('/etalase/:slug', async (c) => {
  const slug = c.req.param('slug')
  const data = await db.select().from(etalase).where(eq(etalase.slug, slug)).get()
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

export default app