import { Hono } from 'hono'
import type { ContextVariables } from '../middleware/auth'
import {
  listUmkms,
  getUmkm,
  listUmkmProducts,
  listProducts,
  getProduct,
  createUmkm,
  updateUmkm,
  deleteUmkm,
  createProduct,
  updateProduct,
  deleteProduct,
  listPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  addPostImage,
  deletePostImage,
  listCategories,
  createCategory,
  deleteCategory,
  getVillageProfile,
  upsertVillageProfile,
} from '../services/catalog'
import { authMiddleware, requireRole, requireAnyRole } from '../middleware/auth'

const app = new Hono<{ Variables: ContextVariables }>()

// Public: village profile
app.get('/village-profile', async (c) => {
  const profile = await getVillageProfile()
  if (!profile) return c.json({ data: null })
  return c.json(profile)
})

// Public: posts (Berita & Galeri)
app.get('/posts', async (c) => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  const limit = Number(c.req.query('limit')) || 50
  const offset = Number(c.req.query('offset')) || 0
  return c.json(await listPosts(search, category, limit, offset))
})

app.get('/posts/:slug', async (c) => {
  const data = await getPostBySlug(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

app.get('/categories', async (c) => {
  return c.json(await listCategories())
})

// Public: UMKM + products
app.get('/umkm', async (c) => {
  const search = c.req.query('search')
  return c.json(await listUmkms(search))
})

app.get('/umkm/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const data = await getUmkm(id)
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

app.get('/umkm/:id/products', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await listUmkmProducts(id))
})

app.get('/products', async (c) => {
  const search = c.req.query('search')
  return c.json(await listProducts(search))
})

app.get('/products/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const data = await getProduct(id)
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

// Protected owner routes (both admin and umkm_owner can manage their UMKM data)
const owner = new Hono<{ Variables: ContextVariables }>()
owner.use('*', authMiddleware)
owner.use('*', requireAnyRole('admin', 'umkm_owner'))

// Current user's UMKM management
owner.get('/me/umkm', async (c) => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  const umkms = await listUmkms()
  const myUmkms = umkms.data.filter((u) => u.ownerId === user.id)
  return c.json({ data: myUmkms })
})

// Protected admin routes
const admin = new Hono<{ Variables: ContextVariables }>()
admin.use('*', authMiddleware)
admin.use('*', requireRole('admin'))

admin.post('/categories', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.name || !body.slug) return c.json({ error: 'Validation gagal' }, 400)
  return c.json(await createCategory(body))
})

admin.delete('/categories/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteCategory(id))
})

admin.post('/umkm', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.name || !body.ownerId) return c.json({ error: 'Validation gagal' }, 400)
  return c.json(await createUmkm(body))
})

admin.put('/umkm/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return c.json(await updateUmkm(id, body))
})

admin.delete('/umkm/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteUmkm(id))
})

admin.post('/products', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.name || !body.umkmId || !body.price) return c.json({ error: 'Validation gagal' }, 400)
  return c.json(await createProduct(body))
})

admin.put('/products/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return c.json(await updateProduct(id, body))
})

admin.delete('/products/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteProduct(id))
})

admin.post('/posts', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.title || !body.slug || !body.content) return c.json({ error: 'Validation gagal' }, 400)
  const user = c.get('user')
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return c.json(await createPost({ ...body, authorId: user.id }))
})

admin.put('/posts/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return c.json(await updatePost(id, body))
})

admin.delete('/posts/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deletePost(id))
})

admin.post('/posts/:id/images', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return c.json(await addPostImage({ ...body, postId: id }))
})

admin.delete('/images/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deletePostImage(id))
})

admin.get('/village-profile', async (c) => {
  const profile = await getVillageProfile()
  if (!profile) return c.json({ data: null })
  return c.json(profile)
})

admin.put('/village-profile', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  return c.json(await upsertVillageProfile(body))
})

// Mount protected routers
app.route('/owner', owner)
app.route('/admin', admin)

export default app