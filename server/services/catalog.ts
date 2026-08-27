import { db } from '../db/client.js'
import {
  users as usersTbl,
  posts as postsTbl,
  postImages as postImagesTbl,
  categories as categoriesTbl,
  villageProfile as villageProfileTbl,
  potensiCategories as potensiCategoriesTbl,
  potensiItems as potensiItemsTbl,
  potensiImages as potensiImagesTbl,
  potensiFeatures as potensiFeaturesTbl,
} from '../db/schema.js'
import { eq, like, and, or, desc, asc, inArray, type SQL } from 'drizzle-orm'
import { verifyPassword } from '../middleware/password.js'
import { deleteMediaByUrl } from './media.js'

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

type PostCreate = Omit<typeof postsTbl.$inferInsert, 'createdAt' | 'updatedAt' | 'id'>
type PostUpdate = Partial<PostCreate>

export async function createPost(data: PostCreate) {
  const rows = await db.insert(postsTbl).values({ ...data, createdAt: nowISO(), updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}

export async function updatePost(id: number, data: PostUpdate) {
  const existing = await db.select().from(postsTbl).where(eq(postsTbl.id, id)).limit(1)
  const rows = await db.update(postsTbl).set({ ...data, updatedAt: nowISO() }).where(eq(postsTbl.id, id)).returning()
  if (rows[0] && existing[0] && existing[0].coverImage && existing[0].coverImage !== rows[0].coverImage) {
    await deleteMediaByUrl(existing[0].coverImage)
  }
  return rows[0] ? { data: rows[0] } : null
}

export async function deletePost(id: number) {
  const images = await db.select().from(postImagesTbl).where(eq(postImagesTbl.postId, id))
  await db.delete(postImagesTbl).where(eq(postImagesTbl.postId, id))
  const rows = await db.delete(postsTbl).where(eq(postsTbl.id, id)).returning()
  const deleted = rows[0] ?? null
  if (deleted) {
    await Promise.all([
      deleteMediaByUrl(deleted.coverImage),
      ...images.map((img) => deleteMediaByUrl(img.imageUrl)),
    ])
  }
  return deleted ? { data: deleted } : null
}

export async function addPostImage(data: typeof postImagesTbl.$inferInsert) {
  const rows = await db.insert(postImagesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function listPostImages() {
  const rows = await db.select().from(postImagesTbl).orderBy(postImagesTbl.sortOrder)
  return { data: rows }
}

export async function deletePostImage(id: number) {
  const rows = await db.delete(postImagesTbl).where(eq(postImagesTbl.id, id)).returning()
  const deleted = rows[0] ?? null
  if (deleted) await deleteMediaByUrl(deleted.imageUrl)
  return deleted ? { data: deleted } : null
}

export async function reorderPostImages(orderedIds: number[]) {
  await Promise.all(
    orderedIds.map((id, index) =>
      db.update(postImagesTbl).set({ sortOrder: index }).where(eq(postImagesTbl.id, id)),
    ),
  )
  return { data: { orderedIds } }
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

type VillageProfileUpsert = Omit<typeof villageProfileTbl.$inferInsert, 'updatedAt' | 'id'>

export async function upsertVillageProfile(data: VillageProfileUpsert) {
  const existing = await db.select().from(villageProfileTbl).limit(1)
  if (existing[0]) {
    const rows = await db.update(villageProfileTbl).set({ ...data, updatedAt: nowISO() }).where(eq(villageProfileTbl.id, existing[0].id)).returning()
    return { data: rows[0] }
  }
  const rows = await db.insert(villageProfileTbl).values({ ...data, updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}

// Potensi Desa
export async function listPotensiCategories() {
  const rows = await db.select().from(potensiCategoriesTbl).orderBy(asc(potensiCategoriesTbl.sortOrder))
  return { data: rows }
}

export async function listPotensiItems(search?: string, categorySlug?: string) {
  const conditions: SQL[] = []

  if (categorySlug) {
    const catRows = await db.select().from(potensiCategoriesTbl).where(eq(potensiCategoriesTbl.slug, categorySlug)).limit(1)
    if (catRows[0]) {
      conditions.push(eq(potensiItemsTbl.categoryId, catRows[0].id))
    }
  }

  if (search) {
    const q = `%${search}%`
    conditions.push(or(
      like(potensiItemsTbl.name, q),
      like(potensiItemsTbl.description, q),
      like(potensiItemsTbl.owner, q),
      like(potensiItemsTbl.dusun, q),
      like(potensiItemsTbl.rtRw, q)
    )!)
  }

  const query = db.select().from(potensiItemsTbl).orderBy(asc(potensiItemsTbl.sortOrder))
  const items = conditions.length ? await query.where(and(...conditions)) : await query

  // Fetch related data for each item
  const itemsWithRelations = await Promise.all(items.map(async (item) => {
    const [category, images, features] = await Promise.all([
      db.select().from(potensiCategoriesTbl).where(eq(potensiCategoriesTbl.id, item.categoryId)).limit(1),
      db.select().from(potensiImagesTbl).where(eq(potensiImagesTbl.itemId, item.id)).orderBy(asc(potensiImagesTbl.sortOrder)),
      db.select().from(potensiFeaturesTbl).where(eq(potensiFeaturesTbl.itemId, item.id)).orderBy(asc(potensiFeaturesTbl.sortOrder)),
    ])

    return {
      ...item,
      category: category[0]?.slug ?? '',
      images: images.map(i => i.imageUrl),
      features: features.map(f => f.feature),
    }
  }))

  return { data: itemsWithRelations }
}

export async function getPotensiItem(id: number) {
  const rows = await db.select().from(potensiItemsTbl).where(eq(potensiItemsTbl.id, id)).limit(1)
  const item = rows[0]
  if (!item) return null

  const [category, images, features] = await Promise.all([
    db.select().from(potensiCategoriesTbl).where(eq(potensiCategoriesTbl.id, item.categoryId)).limit(1),
    db.select().from(potensiImagesTbl).where(eq(potensiImagesTbl.itemId, item.id)).orderBy(asc(potensiImagesTbl.sortOrder)),
    db.select().from(potensiFeaturesTbl).where(eq(potensiFeaturesTbl.itemId, item.id)).orderBy(asc(potensiFeaturesTbl.sortOrder)),
  ])

  return {
    data: {
      ...item,
      category: category[0]?.slug ?? '',
      images: images.map(i => i.imageUrl),
      features: features.map(f => f.feature),
    }
  }
}

type PotensiCategoryCreate = Omit<typeof potensiCategoriesTbl.$inferInsert, 'id'>
type PotensiCategoryUpdate = Partial<PotensiCategoryCreate>

export async function createPotensiCategory(data: PotensiCategoryCreate) {
  const rows = await db.insert(potensiCategoriesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function updatePotensiCategory(id: number, data: PotensiCategoryUpdate) {
  const rows = await db.update(potensiCategoriesTbl).set(data).where(eq(potensiCategoriesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deletePotensiCategory(id: number) {
  const rows = await db.delete(potensiCategoriesTbl).where(eq(potensiCategoriesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

type PotensiItemCreate = Omit<typeof potensiItemsTbl.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>
type PotensiItemUpdate = Partial<PotensiItemCreate>

export async function createPotensiItem(data: PotensiItemCreate) {
  const rows = await db.insert(potensiItemsTbl).values({ ...data, createdAt: nowISO(), updatedAt: nowISO() }).returning()
  return { data: rows[0] }
}

export async function updatePotensiItem(id: number, data: PotensiItemUpdate) {
  const rows = await db.update(potensiItemsTbl).set({ ...data, updatedAt: nowISO() }).where(eq(potensiItemsTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}

export async function deletePotensiItem(id: number) {
  const images = await db.select().from(potensiImagesTbl).where(eq(potensiImagesTbl.itemId, id))
  const rows = await db.delete(potensiItemsTbl).where(eq(potensiItemsTbl.id, id)).returning()
  const deleted = rows[0] ?? null
  if (deleted) {
    await Promise.all(images.map((img) => deleteMediaByUrl(img.imageUrl)))
  }
  return deleted ? { data: deleted } : null
}

export async function addPotensiImage(data: typeof potensiImagesTbl.$inferInsert) {
  const rows = await db.insert(potensiImagesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function listPotensiImageRows(itemId: number) {
  const rows = await db
    .select()
    .from(potensiImagesTbl)
    .where(eq(potensiImagesTbl.itemId, itemId))
    .orderBy(asc(potensiImagesTbl.sortOrder))
  return { data: rows }
}

export async function deletePotensiImage(id: number) {
  const rows = await db.delete(potensiImagesTbl).where(eq(potensiImagesTbl.id, id)).returning()
  const deleted = rows[0] ?? null
  if (deleted) await deleteMediaByUrl(deleted.imageUrl)
  return deleted ? { data: deleted } : null
}

export async function reorderPotensiImages(itemId: number, orderedIds: number[]) {
  // Only reorder images that actually belong to this item.
  const owned = await db
    .select({ id: potensiImagesTbl.id })
    .from(potensiImagesTbl)
    .where(and(eq(potensiImagesTbl.itemId, itemId), inArray(potensiImagesTbl.id, orderedIds)))
  const ownedIds = new Set(owned.map((row) => row.id))
  const valid = orderedIds.filter((id) => ownedIds.has(id))
  if (valid.length !== orderedIds.length) {
    return null
  }
  await Promise.all(
    valid.map((id, index) =>
      db.update(potensiImagesTbl).set({ sortOrder: index }).where(eq(potensiImagesTbl.id, id)),
    ),
  )
  return { data: { orderedIds: valid } }
}

export async function addPotensiFeature(data: typeof potensiFeaturesTbl.$inferInsert) {
  const rows = await db.insert(potensiFeaturesTbl).values(data).returning()
  return { data: rows[0] }
}

export async function deletePotensiFeature(id: number) {
  const rows = await db.delete(potensiFeaturesTbl).where(eq(potensiFeaturesTbl.id, id)).returning()
  return rows[0] ? { data: rows[0] } : null
}
