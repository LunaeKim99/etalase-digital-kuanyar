import { Hono } from 'hono'
import type { ContextVariables } from '../middleware/auth.js'
import { safeJson } from '../middleware/safe.js'
import { validateBody } from '../middleware/validate.js'
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
  listPostImages,
  listCategories,
  createCategory,
  deleteCategory,
  getVillageProfile,
  upsertVillageProfile,
} from '../services/catalog.js'
import { authMiddleware, requireRole, requireAnyRole } from '../middleware/auth.js'
import { categorySchema, umkmSchema, productSchema, postSchema, postImageSchema, villageProfileSchema } from '../validation/schemas.js'

const app = new Hono<{ Variables: ContextVariables }>()

// Public: village profile
app.get('/village-profile', (c) => safeJson(c, async () => {
  const profile = await getVillageProfile()
  if (!profile) return { data: null }
  return profile
}))

// Public: posts (Berita & Galeri)
app.get('/posts', (c) => safeJson(c, async () => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  const limit = Number(c.req.query('limit')) || 50
  const offset = Number(c.req.query('offset')) || 0
  return await listPosts(search, category, limit, offset)
}))

app.get('/posts/:slug', (c) => safeJson(c, async () => {
  const data = await getPostBySlug(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return data
}))

app.get('/categories', (c) => safeJson(c, () => listCategories()))

// Public: UMKM + products
app.get('/umkm', (c) => safeJson(c, async () => {
  const search = c.req.query('search')
  return await listUmkms(search)
}))

app.get('/umkm/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const data = await getUmkm(id)
  if (!data) return c.json({ error: 'Not found' }, 404)
  return data
}))

app.get('/umkm/:id/products', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await listUmkmProducts(id)
}))

app.get('/products', (c) => safeJson(c, async () => {
  const search = c.req.query('search')
  return await listProducts(search)
}))

app.get('/products/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const data = await getProduct(id)
  if (!data) return c.json({ error: 'Not found' }, 404)
  return data
}))

// Protected owner routes (both admin and umkm_owner can manage their UMKM data)
const owner = new Hono<{ Variables: ContextVariables }>()
owner.use('*', authMiddleware)
owner.use('*', requireAnyRole('admin', 'umkm_owner'))

// Current user's UMKM management
owner.get('/me/umkm', (c) => safeJson(c, async () => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  const umkms = await listUmkms()
  const myUmkms = umkms.data.filter((u) => u.ownerId === user.id)
  return { data: myUmkms }
}))

// Protected admin routes
const admin = new Hono<{ Variables: ContextVariables }>()
admin.use('*', authMiddleware)
admin.use('*', requireRole('admin'))

admin.post('/categories', (c) => safeJson(c, async () => {
  const result = await validateBody(c, categorySchema)
  if (result.error) return result.error
  return await createCategory(result.data)
}))

admin.delete('/categories/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deleteCategory(id)
}))

admin.post('/umkm', (c) => safeJson(c, async () => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.name || !body.ownerId) return c.json({ error: 'Validation gagal' }, 400)
  return await createUmkm(body)
}))

admin.put('/umkm/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return await updateUmkm(id, body)
}))

admin.delete('/umkm/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deleteUmkm(id)
}))

admin.post('/products', (c) => safeJson(c, async () => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.name || !body.umkmId || !body.price) return c.json({ error: 'Validation gagal' }, 400)
  return await createProduct(body)
}))

admin.put('/products/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return await updateProduct(id, body)
}))

admin.delete('/products/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deleteProduct(id)
}))

admin.post('/posts', (c) => safeJson(c, async () => {
  const body = await c.req.json().catch(() => ({}))
  if (!body.title || !body.slug || !body.content) return c.json({ error: 'Validation gagal' }, 400)
  const user = c.get('user')
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return await createPost({ ...body, authorId: user.id })
}))

admin.put('/posts/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return await updatePost(id, body)
}))

admin.delete('/posts/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePost(id)
}))

admin.post('/posts/:id/images', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  return await addPostImage({ ...body, postId: id })
}))

admin.get('/images', (c) => safeJson(c, async () => {
  return await listPostImages()
}))

admin.delete('/images/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePostImage(id)
}))

admin.get('/village-profile', (c) => safeJson(c, async () => {
  const profile = await getVillageProfile()
  if (!profile) return { data: null }
  return profile
}))

admin.put('/village-profile', (c) => safeJson(c, async () => {
  const body = await c.req.json().catch(() => ({}))
  return await upsertVillageProfile(body)
}))

// Mount protected routers
app.route('/owner', owner)
app.route('/admin', admin)

export default app