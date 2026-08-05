import { db } from '../db/client'
import {
  users as usersTbl,
  umkm as umkmTbl,
  products as productsTbl,
  posts as postsTbl,
  postImages as postImagesTbl,
  categories as categoriesTbl,
  villageProfile as villageProfileTbl,
} from '../db/schema'
import { eq, like, and, or, desc, type SQL } from 'drizzle-orm'
import { verifyPassword } from '../middleware/password'

const nowISO = () => new Date().toISOString()

// Users / Auth
export async function getUserByEmail(email: string) {
  const rows = await db.select().from(usersTbl).where(eq(usersTbl.email, email)).limit(1)
  return rows[0] ?? null
}

export async function getUserById(id: number) {
  const rows = await db.select().from(usersTbl).where(eq(usersTbl.id, id)).limit(1)
  return rows[0] ?? null
}

export async function createUser(data: typeof usersTbl.$inferInsert) {
  const rows = await db.insert(usersTbl).values(data).returning()
  return rows[0]
}

export async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null
  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) return null
  return user
}

// UMKM
export async function listUmkms(search?: string) {
  const conditions: SQL[] = []
  if (search) {
    const q = `%${search}%`
    conditions.push(or(like(umkmTbl.name, q), like(umkmTbl.address, q))!)
  }
  const query = db.select().from(umkmTbl)
  const rows = conditions.length ? await query.where(and(...conditions)) : await query
  return { data: rows }
}

export async function getUmkm(id: number) {
  const rows = await db.select().from(umkmTbl).where(eq(umkmTbl.id, id)).limit(1)
  return rows[0] ? { data: rows[0] } : null
}

export async function listUmkmProducts(umkmId: number) {
  const rows = await db.select().from(productsTbl).where(eq(productsTbl.umkmId, umkmId))
  return { data: rows }
}

export async function createUmkm(data: typeof umkmTbl.$inferInsert) {
  const rows = await db.insert(umkmTbl).values({ ...data, createdAt: nowISO(), updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}

export async function updateUmkm(id: number, data: Partial<typeof umkmTbl.$inferInsert>) {
  const rows = await db.update(umkmTbl).set({ ...data, updatedAt: nowISO() }).where(eq(umkmTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteUmkm(id: number) {
  const rows = await db.delete(umkmTbl).where(eq(umkmTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// Products
export async function listProducts(search?: string) {
  const conditions: SQL[] = []
  if (search) conditions.push(like(productsTbl.name, `%${search}%`))

  const query = db.select().from(productsTbl)
  const rows = conditions.length ? await query.where(and(...conditions)) : await query
  return { data: rows }
}

export async function getProduct(id: number) {
  const rows = await db.select().from(productsTbl).where(eq(productsTbl.id, id)).limit(1)
  return rows[0] ? { data: rows[0] } : null
}

export async function createProduct(data: typeof productsTbl.$inferInsert) {
  const rows = await db.insert(productsTbl).values({ ...data, createdAt: nowISO(), updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}

export async function updateProduct(id: number, data: Partial<typeof productsTbl.$inferInsert>) {
  const rows = await db.update(productsTbl).set({ ...data, updatedAt: nowISO() }).where(eq(productsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deleteProduct(id: number) {
  const rows = await db.delete(productsTbl).where(eq(productsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// Posts (merged Berita + Galeri)
export async function listPosts(search?: string, category?: string, limit = 50, offset = 0) {
  const conditions: SQL[] = []
  if (search) conditions.push(like(postsTbl.title, `%${search}%`))
  if (category) conditions.push(eq(postsTbl.category, category))

  const query = db.select().from(postsTbl).orderBy(desc(postsTbl.publishedAt))
  const rows = conditions.length
    ? await query.where(and(...conditions)).limit(limit).offset(offset)
    : await query.limit(limit).offset(offset)
  return { data: rows }
}

export async function getPostBySlug(slug: string) {
  const rows = await db.select().from(postsTbl).where(eq(postsTbl.slug, slug)).limit(1)
  const post = rows[0]
  if (!post) return null
  const images = await db.select().from(postImagesTbl).where(eq(postImagesTbl.postId, post.id)).orderBy(postImagesTbl.sortOrder)
  return { data: { ...post, images } }
}

export async function createPost(data: typeof postsTbl.$inferInsert) {
  const rows = await db.insert(postsTbl).values({ ...data, createdAt: nowISO(), updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}

export async function updatePost(id: number, data: Partial<typeof postsTbl.$inferInsert>) {
  const rows = await db.update(postsTbl).set({ ...data, updatedAt: nowISO() }).where(eq(postsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deletePost(id: number) {
  await db.delete(postImagesTbl).where(eq(postImagesTbl.postId, id))
  const rows = await db.delete(postsTbl).where(eq(postsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function addPostImage(data: typeof postImagesTbl.$inferInsert) {
  const rows = await db.insert(postImagesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function deletePostImage(id: number) {
  const rows = await db.delete(postImagesTbl).where(eq(postImagesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// Categories
export async function listCategories() {
  const rows = await db.select().from(categoriesTbl)
  return { data: rows }
}

export async function createCategory(data: typeof categoriesTbl.$inferInsert) {
  const rows = await db.insert(categoriesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function deleteCategory(id: number) {
  const rows = await db.delete(categoriesTbl).where(eq(categoriesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

// Village Profile (singleton)
export async function getVillageProfile() {
  const rows = await db.select().from(villageProfileTbl).limit(1)
  return rows[0] ? { data: rows[0] } : null
}

export async function upsertVillageProfile(data: typeof villageProfileTbl.$inferInsert) {
  const existing = await db.select().from(villageProfileTbl).limit(1)
  if (existing[0]) {
    const rows = await db.update(villageProfileTbl).set({ ...data, updatedAt: nowISO() }).where(eq(villageProfileTbl.id, existing[0].id)).returning()
    return { data: rows[0] }
  }
  const rows = await db.insert(villageProfileTbl).values({ ...data, updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}
