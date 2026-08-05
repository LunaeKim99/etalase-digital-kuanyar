import { Hono } from 'hono'
import {
  listUmkms,
  getUmkm,
  listUmkmProducts,
  listProducts,
  getProduct,
  listTourisms,
  getTourism,
  getTourismGallery,
  listCultures,
  getCulture,
  listEvents,
  getEvent,
  listGallery,
  getGalleryItem,
  listArticles,
  getArticle,
  listCategories,
  listGalleryCategories,
  listArticleCategories,
  createCategory,
  deleteCategory,
  createUmkm,
  updateUmkm,
  deleteUmkm,
  createProduct,
  updateProduct,
  deleteProduct,
  createTourism,
  updateTourism,
  deleteTourism,
  createCulture,
  updateCulture,
  deleteCulture,
  createEvent,
  updateEvent,
  deleteEvent,
  createGallery,
  updateGallery,
  deleteGallery,
  createArticle,
  updateArticle,
  deleteArticle,
  authenticateAdmin,
} from '../services/catalog'
import { authMiddleware, generateToken } from '../middleware/auth'
import {
  loginSchema,
  categorySchema,
  umkmSchema,
  productSchema,
  tourismSchema,
  cultureSchema,
  eventSchema,
  gallerySchema,
  articleSchema,
} from '../validation/schemas'

const catalog = new Hono()

// Public auth endpoint
catalog.post('/auth/login', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const result = loginSchema.safeParse(body)
  if (!result.success) return c.json({ error: 'Username dan password wajib diisi' }, 400)
  const { username, password } = result.data
  const admin = await authenticateAdmin(username, password)
  if (!admin) return c.json({ error: 'Username atau password salah' }, 401)
  const token = await generateToken(admin.data.username, admin.data.role, admin.data.name)
  return c.json({ token, user: { id: admin.data.id, username: admin.data.username, name: admin.data.name, role: admin.data.role } })
})

// Protected admin routes
const admin = new Hono()
admin.use('*', authMiddleware)

admin.post('/kategori', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = categorySchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createCategory(parsed.data))
})

admin.delete('/kategori/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteCategory(id))
})

// UMKM
admin.post('/umkm', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = umkmSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createUmkm(parsed.data))
})

admin.put('/umkm/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = umkmSchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await updateUmkm(id, parsed.data))
})

admin.delete('/umkm/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteUmkm(id))
})

// Produk
admin.post('/produk', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = productSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createProduct(parsed.data))
})

admin.put('/produk/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = productSchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await updateProduct(id, parsed.data))
})

admin.delete('/produk/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteProduct(id))
})

// Wisata
admin.post('/wisata', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = tourismSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  const insert = {
    ...parsed.data,
    gallery: parsed.data.gallery ? JSON.stringify(parsed.data.gallery) : undefined,
    facilities: parsed.data.facilities ? JSON.stringify(parsed.data.facilities) : undefined,
  } as typeof import('../db/schema').tourism.$inferInsert
  return c.json(await createTourism(insert))
})

admin.put('/wisata/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = tourismSchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  const update: Record<string, unknown> = { ...parsed.data }
  if (Array.isArray(update.gallery)) update.gallery = JSON.stringify(update.gallery)
  if (Array.isArray(update.facilities)) update.facilities = JSON.stringify(update.facilities)
  return c.json(await updateTourism(id, update))
})

admin.delete('/wisata/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteTourism(id))
})

// Budaya
admin.post('/budaya', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = cultureSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createCulture(parsed.data))
})

admin.put('/budaya/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = cultureSchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await updateCulture(id, parsed.data))
})

admin.delete('/budaya/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteCulture(id))
})

// Event
admin.post('/event', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createEvent(parsed.data))
})

admin.put('/event/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = eventSchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await updateEvent(id, parsed.data))
})

admin.delete('/event/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteEvent(id))
})

// Galeri
admin.post('/galeri', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = gallerySchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createGallery(parsed.data))
})

admin.put('/galeri/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = gallerySchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await updateGallery(id, parsed.data))
})

admin.delete('/galeri/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteGallery(id))
})

// Artikel
admin.post('/artikel', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const parsed = articleSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await createArticle(parsed.data))
})

admin.put('/artikel/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json().catch(() => ({}))
  const parsed = articleSchema.partial().safeParse(body)
  if (!parsed.success) return c.json({ error: 'Validation gagal', details: parsed.error.flatten().fieldErrors }, 400)
  return c.json(await updateArticle(id, parsed.data))
})

admin.delete('/artikel/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return c.json(await deleteArticle(id))
})

// Mount admin routes under /admin prefix
catalog.route('/admin', admin)

// Public GET routes
catalog.get('/kategori', async (c) => {
  return c.json(await listCategories())
})

catalog.get('/umkm', async (c) => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  return c.json(await listUmkms(search, category))
})

catalog.get('/umkm/:slug', async (c) => {
  const data = await getUmkm(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/umkm/:slug/produk', async (c) => {
  return c.json(await listUmkmProducts(c.req.param('slug')))
})

catalog.get('/produk', async (c) => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  return c.json(await listProducts(search, category))
})

catalog.get('/produk/:slug', async (c) => {
  const data = await getProduct(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/wisata', async (c) => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  return c.json(await listTourisms(search, category))
})

catalog.get('/wisata/:slug', async (c) => {
  const data = await getTourism(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/wisata/:slug/galeri', async (c) => {
  const data = await getTourismGallery(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/budaya', async (c) => {
  return c.json(await listCultures())
})

catalog.get('/budaya/:slug', async (c) => {
  const data = await getCulture(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/event', async (c) => {
  return c.json(await listEvents())
})

catalog.get('/event/:slug', async (c) => {
  const data = await getEvent(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/galeri', async (c) => {
  const type = c.req.query('type')
  const category = c.req.query('category')
  return c.json(await listGallery(type, category))
})

catalog.get('/galeri/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const data = await getGalleryItem(id)
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/galeri-kategori', async (c) => {
  return c.json({ data: await listGalleryCategories() })
})

catalog.get('/artikel', async (c) => {
  const search = c.req.query('search')
  const kategori = c.req.query('kategori')
  return c.json(await listArticles(search, kategori))
})

catalog.get('/artikel/:slug', async (c) => {
  const data = await getArticle(c.req.param('slug'))
  if (!data) return c.json({ error: 'Not found' }, 404)
  return c.json(data)
})

catalog.get('/artikel-kategori', async (c) => {
  return c.json({ data: await listArticleCategories() })
})

export default catalog