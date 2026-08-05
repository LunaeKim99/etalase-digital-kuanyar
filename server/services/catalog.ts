import { db } from '../db/client'
import {
  categories as categoriesTbl,
  umkms as umkmsTbl,
  products as productsTbl,
  tourism as tourismTbl,
  cultures as culturesTbl,
  events as eventsTbl,
  gallery as galleryTbl,
  articles as articlesTbl,
  admins as adminsTbl,
} from '../db/schema'
import { eq, like, and, or, isNotNull, type SQL } from 'drizzle-orm'

const productWithUmkm = {
  id: productsTbl.id,
  slug: productsTbl.slug,
  name: productsTbl.name,
  umkmId: productsTbl.umkmId,
  umkmName: umkmsTbl.name,
  umkmSlug: umkmsTbl.slug,
  category: productsTbl.category,
  price: productsTbl.price,
  unit: productsTbl.unit,
  stock: productsTbl.stock,
  description: productsTbl.description,
  image: productsTbl.image,
  createdAt: productsTbl.createdAt,
}

function parseTourismRow(row: typeof tourismTbl.$inferSelect) {
  return {
    ...row,
    gallery: JSON.parse(row.gallery ?? '[]') as string[],
    facilities: JSON.parse(row.facilities ?? '[]') as string[],
  }
}

export async function listUmkms(search?: string, category?: string) {
  const conditions: SQL[] = []
  if (search) {
    const q = `%${search}%`
    conditions.push(or(like(umkmsTbl.name, q), like(umkmsTbl.owner, q))!)
  }
  if (category) conditions.push(eq(umkmsTbl.category, category))

  const rows = conditions.length
    ? await db.select().from(umkmsTbl).where(and(...conditions))
    : await db.select().from(umkmsTbl)
  return { data: rows }
}

export async function getUmkm(slug: string) {
  const rows = await db.select().from(umkmsTbl).where(eq(umkmsTbl.slug, slug)).limit(1)
  const row = rows[0]
  return row ? { data: row } : null
}

export async function listUmkmProducts(umkmSlug: string) {
  const rows = await db
    .select(productWithUmkm)
    .from(productsTbl)
    .innerJoin(umkmsTbl, eq(productsTbl.umkmId, umkmsTbl.id))
    .where(eq(umkmsTbl.slug, umkmSlug))
  return { data: rows }
}

export async function listProducts(search?: string, category?: string) {
  const conditions: SQL[] = []
  if (search) conditions.push(like(productsTbl.name, `%${search}%`))
  if (category) conditions.push(eq(productsTbl.category, category))

  const query = db
    .select(productWithUmkm)
    .from(productsTbl)
    .leftJoin(umkmsTbl, eq(productsTbl.umkmId, umkmsTbl.id))
  const rows = conditions.length
    ? await query.where(and(...conditions))
    : await query
  return { data: rows }
}

export async function getProduct(slug: string) {
  const rows = await db
    .select(productWithUmkm)
    .from(productsTbl)
    .leftJoin(umkmsTbl, eq(productsTbl.umkmId, umkmsTbl.id))
    .where(eq(productsTbl.slug, slug))
    .limit(1)
  const row = rows[0]
  return row ? { data: row } : null
}

export async function listTourisms(search?: string, category?: string) {
  const conditions: SQL[] = []
  if (search) {
    const q = `%${search}%`
    conditions.push(or(like(tourismTbl.name, q), like(tourismTbl.location, q))!)
  }
  if (category) conditions.push(eq(tourismTbl.category, category))

  const rows = conditions.length
    ? await db.select().from(tourismTbl).where(and(...conditions))
    : await db.select().from(tourismTbl)
  return { data: rows.map(parseTourismRow) }
}

export async function getTourism(slug: string) {
  const rows = await db.select().from(tourismTbl).where(eq(tourismTbl.slug, slug)).limit(1)
  const row = rows[0]
  return row ? { data: parseTourismRow(row) } : null
}

export async function getTourismGallery(slug: string) {
  const rows = await db
    .select({ gallery: tourismTbl.gallery })
    .from(tourismTbl)
    .where(eq(tourismTbl.slug, slug))
    .limit(1)
  const row = rows[0]
  if (!row) return null
  return { data: JSON.parse(row.gallery ?? '[]') as string[] }
}

export async function listCultures() {
  const rows = await db.select().from(culturesTbl)
  return { data: rows }
}

export async function getCulture(slug: string) {
  const rows = await db.select().from(culturesTbl).where(eq(culturesTbl.slug, slug)).limit(1)
  const row = rows[0]
  return row ? { data: row } : null
}

export async function listEvents() {
  const rows = await db.select().from(eventsTbl)
  return { data: rows }
}

export async function getEvent(slug: string) {
  const rows = await db.select().from(eventsTbl).where(eq(eventsTbl.slug, slug)).limit(1)
  const row = rows[0]
  return row ? { data: row } : null
}

export async function listGallery(type?: string, category?: string) {
  const conditions: SQL[] = []
  if (type) conditions.push(eq(galleryTbl.type, type))
  if (category) conditions.push(eq(galleryTbl.category, category))

  const rows = conditions.length
    ? await db.select().from(galleryTbl).where(and(...conditions))
    : await db.select().from(galleryTbl)
  return { data: rows }
}

export async function getGalleryItem(id: number) {
  const rows = await db.select().from(galleryTbl).where(eq(galleryTbl.id, id)).limit(1)
  const row = rows[0]
  return row ? { data: row } : null
}

export async function listArticles(search?: string, category?: string) {
  const conditions: SQL[] = []
  if (search) conditions.push(like(articlesTbl.title, `%${search}%`))
  if (category) conditions.push(eq(articlesTbl.category, category))

  const rows = conditions.length
    ? await db.select().from(articlesTbl).where(and(...conditions))
    : await db.select().from(articlesTbl)
  return { data: rows }
}

export async function getArticle(slug: string) {
  const rows = await db.select().from(articlesTbl).where(eq(articlesTbl.slug, slug)).limit(1)
  const row = rows[0]
  return row ? { data: row } : null
}

export async function listCategories() {
  const rows = await db.select().from(categoriesTbl)
  return { data: rows }
}

function mapCategoryValues(values: string[]) {
  const seen = new Set<string>()
  return values
    .map((v) => v.trim())
    .filter((v) => v.length > 0)
    .map((v) => {
      const id = v.toLowerCase()
      const label = id.charAt(0).toUpperCase() + id.slice(1)
      return { id, label }
    })
    .filter(({ id }) => (seen.has(id) ? false : (seen.add(id), true)))
}

export async function listGalleryCategories() {
  const rows = await db
    .selectDistinct({ value: galleryTbl.category })
    .from(galleryTbl)
    .where(isNotNull(galleryTbl.category))
  return mapCategoryValues(rows.map((r) => r.value))
}

export async function listArticleCategories() {
  const rows = await db
    .selectDistinct({ value: articlesTbl.category })
    .from(articlesTbl)
    .where(isNotNull(articlesTbl.category))
  return mapCategoryValues(rows.map((r) => r.value))
}

// CRUD functions for each entity

// umkms
export async function createUmkm(data: typeof umkmsTbl.$inferInsert) {
  const rows = await db.insert(umkmsTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updateUmkm(id: number, data: Partial<typeof umkmsTbl.$inferInsert>) {
  const rows = await db.update(umkmsTbl).set(data).where(eq(umkmsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteUmkm(id: number) {
  const rows = await db.delete(umkmsTbl).where(eq(umkmsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// products
export async function createProduct(data: typeof productsTbl.$inferInsert) {
  const rows = await db.insert(productsTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updateProduct(id: number, data: Partial<typeof productsTbl.$inferInsert>) {
  const rows = await db.update(productsTbl).set(data).where(eq(productsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteProduct(id: number) {
  const rows = await db.delete(productsTbl).where(eq(productsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// tourism
export async function createTourism(data: typeof tourismTbl.$inferInsert) {
  const rows = await db.insert(tourismTbl).values(data).returning()
  return { data: parseTourismRow(rows[0]) }
}

export async function updateTourism(id: number, data: Partial<typeof tourismTbl.$inferInsert>) {
  const rows = await db.update(tourismTbl).set(data).where(eq(tourismTbl.id, id)).returning()
  return rows[0] ? { data: parseTourismRow(rows[0]) } : null
}

export async function deleteTourism(id: number) {
  const rows = await db.delete(tourismTbl).where(eq(tourismTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// cultures
export async function createCulture(data: typeof culturesTbl.$inferInsert) {
  const rows = await db.insert(culturesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updateCulture(id: number, data: Partial<typeof culturesTbl.$inferInsert>) {
  const rows = await db.update(culturesTbl).set(data).where(eq(culturesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteCulture(id: number) {
  const rows = await db.delete(culturesTbl).where(eq(culturesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// events
export async function createEvent(data: typeof eventsTbl.$inferInsert) {
  const rows = await db.insert(eventsTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updateEvent(id: number, data: Partial<typeof eventsTbl.$inferInsert>) {
  const rows = await db.update(eventsTbl).set(data).where(eq(eventsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteEvent(id: number) {
  const rows = await db.delete(eventsTbl).where(eq(eventsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// gallery
export async function createGallery(data: typeof galleryTbl.$inferInsert) {
  const rows = await db.insert(galleryTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updateGallery(id: number, data: Partial<typeof galleryTbl.$inferInsert>) {
  const rows = await db.update(galleryTbl).set(data).where(eq(galleryTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteGallery(id: number) {
  const rows = await db.delete(galleryTbl).where(eq(galleryTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// articles
export async function createArticle(data: typeof articlesTbl.$inferInsert) {
  const rows = await db.insert(articlesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updateArticle(id: number, data: Partial<typeof articlesTbl.$inferInsert>) {
  const rows = await db.update(articlesTbl).set(data).where(eq(articlesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteArticle(id: number) {
  const rows = await db.delete(articlesTbl).where(eq(articlesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// categories (simplified CRUD)
export async function createCategory(data: typeof categoriesTbl.$inferInsert) {
  const rows = await db.insert(categoriesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function deleteCategory(id: number) {
  const rows = await db.delete(categoriesTbl).where(eq(categoriesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

import { verifyPassword } from '../middleware/password'

// auth service
export async function getAdmin(username: string) {
  const rows = await db.select().from(adminsTbl).where(eq(adminsTbl.username, username)).limit(1)
  return rows[0] ?? null
}

export async function authenticateAdmin(username: string, password: string) {
  const row = await getAdmin(username)
  if (!row) return null
  const valid = await verifyPassword(password, row.passwordHash)
  if (!valid) return null
  return { data: row }
}
