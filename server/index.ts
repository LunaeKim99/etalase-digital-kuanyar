import { Hono } from 'hono'
import { logger } from './middleware/logger'
import api from './routes'
import catalog from './routes/catalog'

const app = new Hono()

app.use('*', logger)
app.route('/api', api)
app.route('/api', catalog)

app.get('/health', (c) => c.text('OK'))

export default app