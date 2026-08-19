import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema.js'

const url = process.env.TURSO_DATABASE_URL || 'file:./sqlite.db'
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url) {
  console.error('[db] TURSO_DATABASE_URL not set; falling back to file:./sqlite.db')
}

const client = createClient({
  url,
  authToken: authToken || undefined,
  // ponytail: no explicit retry; libsql client has internal reconnect. Add custom retry if Turso flaps.
})

export const db = drizzle(client, { schema })
export type DB = typeof db
export { client }