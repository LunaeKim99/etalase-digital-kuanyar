import { config } from 'dotenv'
config()
import { serve } from '@hono/node-server'

const app = (await import('./index.js')).default

const port = Number(process.env.PORT) || 4000

serve({ fetch: app.fetch, port })
console.log(`Server running on http://localhost:${port}`)
