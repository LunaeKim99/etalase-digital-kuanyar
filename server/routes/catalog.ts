import { Hono } from 'hono'
import type { ContextVariables } from '../middleware/auth.js'
import { safeJson } from '../middleware/safe.js'
import { validateBody } from '../middleware/validate.js'
import {
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
  listPotensiCategories,
  listPotensiItems,
  getPotensiItem,
  createPotensiCategory,
  updatePotensiCategory,
  deletePotensiCategory,
  createPotensiItem,
  updatePotensiItem,
  deletePotensiItem,
  addPotensiImage,
  deletePotensiImage,
  listPotensiImageRows,
  reorderPotensiImages,
  addPotensiFeature,
  deletePotensiFeature,
  reorderPostImages,
} from '../services/catalog.js'
import { processAndStoreImage, deleteMediaByUrl, MediaValidationError } from '../services/media.js'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { checkRateLimit, getClientIp } from '../middleware/rateLimit.js'
import { categorySchema, postSchema, postImageSchema, villageProfileSchema, reorderImagesSchema } from '../validation/schemas.js'
import { isMediaContext, MAX_UPLOAD_BYTES } from '../config/media.js'

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

// Public: Potensi Desa
app.get('/potensi/categories', (c) => safeJson(c, () => listPotensiCategories()))

app.get('/potensi/items', (c) => safeJson(c, async () => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  return await listPotensiItems(search, category)
}))

app.get('/potensi/items/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const data = await getPotensiItem(id)
  if (!data) return c.json({ error: 'Not found' }, 404)
  return data
}))

// Protected admin routes
const admin = new Hono<{ Variables: ContextVariables }>()
admin.use('*', authMiddleware)
admin.use('*', requireRole('admin'))

admin.get('/categories', (c) => safeJson(c, () => listCategories()))

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

admin.get('/posts', (c) => safeJson(c, async () => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  const limit = Number(c.req.query('limit')) || 50
  const offset = Number(c.req.query('offset')) || 0
  return await listPosts(search, category, limit, offset)
}))

admin.post('/posts', (c) => safeJson(c, async () => {
  const result = await validateBody(c, postSchema)
  if (result.error) return result.error
  const user = c.get('user')
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  return await createPost({ ...result.data, authorId: user.id })
}))

admin.put('/posts/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const result = await validateBody(c, postSchema)
  if (result.error) return result.error
  return await updatePost(id, result.data)
}))

admin.delete('/posts/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePost(id)
}))

admin.post('/posts/:id/images', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const result = await validateBody(c, postImageSchema)
  if (result.error) return result.error
  return await addPostImage({ ...result.data, postId: id })
}))

admin.get('/images', (c) => safeJson(c, async () => {
  return await listPostImages()
}))

admin.delete('/images/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePostImage(id)
}))

admin.put('/posts/images/reorder', (c) => safeJson(c, async () => {
  const result = await validateBody(c, reorderImagesSchema)
  if (result.error) return result.error
  return await reorderPostImages(result.data.orderedIds)
}))

// Admin: media upload (multipart/form-data)
admin.post('/media/upload', async (c) => {
  // Admin-only endpoint, but multi-file uploads are legitimate — allow more
  // requests per minute than the auth endpoints' default limit.
  const limit = checkRateLimit(`media:${getClientIp(c)}`, 60)
  if (!limit.allowed) {
    c.header('Retry-After', String(limit.retryAfterSec))
    return c.json({ success: false, error: 'Terlalu banyak upload, coba lagi nanti' }, 429)
  }

  try {
    const body = await c.req.parseBody()
    const file = body.file
    const context = body.context
    if (!(file instanceof File)) {
      return c.json({ success: false, error: 'File tidak ditemukan' }, 400)
    }
    if (!isMediaContext(context)) {
      return c.json({ success: false, error: 'Context tidak valid' }, 400)
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return c.json({
        success: false,
        error: `Gambar terlalu besar. Maksimum ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))} MB.`,
      }, 413)
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await processAndStoreImage(buffer, file.type, context)
    return c.json({ success: true, data })
  } catch (err) {
    if (err instanceof MediaValidationError) {
      return c.json({ success: false, error: err.message }, 400)
    }
    console.error('[media upload]', err)
    return c.json({ success: false, error: 'Upload gagal. Silakan coba lagi.' }, 500)
  }
})

// Admin: rollback orphan upload (only URLs matching our own storage key pattern)
admin.delete('/media', (c) => safeJson(c, async () => {
  const url = c.req.query('url')
  if (!url) return c.json({ success: false, error: 'URL wajib diisi' }, 400)
  await deleteMediaByUrl(url)
  return { success: true }
}))

admin.get('/village-profile', (c) => safeJson(c, async () => {
  const profile = await getVillageProfile()
  if (!profile) return { data: null }
  return profile
}))

admin.put('/village-profile', (c) => safeJson(c, async () => {
  const result = await validateBody(c, villageProfileSchema)
  if (result.error) return result.error
  return await upsertVillageProfile(result.data)
}))

// Admin: Potensi Desa
admin.get('/potensi/categories', (c) => safeJson(c, () => listPotensiCategories()))

admin.post('/potensi/categories', (c) => safeJson(c, async () => {
  const body = await c.req.json()
  return await createPotensiCategory(body)
}))

admin.put('/potensi/categories/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json()
  return await updatePotensiCategory(id, body)
}))

admin.delete('/potensi/categories/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePotensiCategory(id)
}))

admin.get('/potensi/items', (c) => safeJson(c, async () => {
  const search = c.req.query('search')
  const category = c.req.query('category')
  return await listPotensiItems(search, category)
}))

admin.post('/potensi/items', (c) => safeJson(c, async () => {
  const body = await c.req.json()
  return await createPotensiItem(body)
}))

admin.put('/potensi/items/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json()
  return await updatePotensiItem(id, body)
}))

admin.delete('/potensi/items/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePotensiItem(id)
}))

admin.post('/potensi/items/:id/images', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json()
  return await addPotensiImage({ ...body, itemId: id })
}))

admin.delete('/potensi/images/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePotensiImage(id)
}))

admin.get('/potensi/items/:id/images', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await listPotensiImageRows(id)
}))

admin.put('/potensi/items/:id/images/reorder', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const result = await validateBody(c, reorderImagesSchema)
  if (result.error) return result.error
  const reordered = await reorderPotensiImages(id, result.data.orderedIds)
  if (!reordered) return c.json({ error: 'Beberapa gambar tidak ditemukan pada item ini' }, 400)
  return reordered
}))

admin.post('/potensi/items/:id/features', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  const body = await c.req.json()
  return await addPotensiFeature({ ...body, itemId: id })
}))

admin.delete('/potensi/features/:id', (c) => safeJson(c, async () => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) return c.json({ error: 'Invalid id' }, 400)
  return await deletePotensiFeature(id)
}))

// Mount protected routers
app.route('/admin', admin)

export default app