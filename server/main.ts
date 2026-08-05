import { serve } from '@hono/node-server'
import app from './index'

const port = Number(process.env.PORT) || 4000

serve({ fetch: app.fetch, port })
console.log(`Server running on http://localhost:${port}`)
