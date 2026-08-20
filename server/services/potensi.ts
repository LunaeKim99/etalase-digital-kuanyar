import { db } from '../db/client.js'
import {
  potensiItems as potensiItemsTbl,
  potensiImages as potensiImagesTbl,
  potensiFeatures as potensiFeaturesTbl,
  potensiSectorData as potensiSectorDataTbl,
  potensiCategories as potensiCategoriesTbl,
} from '../db/schema.js'
import { eq, like, and, or, desc, asc, type SQL } from 'drizzle-orm'

export interface PotensiItemResponse {
  id: number
  name: string
  description: string
  category: string
  owner: string | null
  rtRw: string | null
  dusun: string | null
  yearFounded: number | null
  capacity: string | null
  whatsapp: string | null
  instagram: string | null
  tiktok: string | null
  marketplace: string | null
  isSector: boolean
  images: { imageUrl: string; caption: string | null; sortOrder: number }[]
  features: string[]
  sectorData: {
    komoditas: { nama: string; deskripsi: string }[]
    musimTanam: { musim: string; lahanAktif: string; lahanKosong: string }[]
    kelompokTani: string[]
    pemasaran: string
    modernisasi: string
  } | null
  createdAt: string
  updatedAt: string
}

export interface PotensiCategoryResponse {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  lightColor: string
}

function mapKomoditas(raw: { nama?: string; deskripsi?: string }[]): { nama: string; deskripsi: string }[] {
  return raw.map((k) => ({ nama: k.nama ?? '', deskripsi: k.deskripsi ?? '' }))
}

export async function listPotensiItems(search?: string, category?: string) {
  const conditions: SQL[] = []
  if (search) {
    const q = `%${search}%`
    conditions.push(or(like(potensiItemsTbl.name, q), like(potensiItemsTbl.description, q))!)
  }
  if (category) conditions.push(eq(potensiItemsTbl.category, category))

  const query = db.select().from(potensiItemsTbl).orderBy(desc(potensiItemsTbl.isSector), asc(potensiItemsTbl.id))
  const rows = conditions.length ? await query.where(and(...conditions)) : await query

  const items: PotensiItemResponse[] = []
  for (const row of rows) {
    items.push(await buildPotensiItem(row))
  }
  return { data: items }
}

export async function getPotensiItemById(id: number) {
  const rows = await db.select().from(potensiItemsTbl).where(eq(potensiItemsTbl.id, id)).limit(1)
  if (!rows[0]) return null
  return { data: await buildPotensiItem(rows[0]) }
}

export async function getPotensiItemByStringId(strId: string) {
  const id = Number(strId.match(/\d+/)?.[0] ?? strId)
  return getPotensiItemById(id)
}

export async function listPotensiCategories() {
  const rows = await db.select().from(potensiCategoriesTbl)
  return { data: rows }
}

async function buildPotensiItem(row: typeof potensiItemsTbl.$inferSelect): Promise<PotensiItemResponse> {
  const images = await db
    .select()
    .from(potensiImagesTbl)
    .where(eq(potensiImagesTbl.potensiId, row.id))
    .orderBy(potensiImagesTbl.sortOrder)

  const featuresRows = await db
    .select()
    .from(potensiFeaturesTbl)
    .where(eq(potensiFeaturesTbl.potensiId, row.id))
    .orderBy(potensiFeaturesTbl.sortOrder)

  const sectorRows = await db
    .select()
    .from(potensiSectorDataTbl)
    .where(eq(potensiSectorDataTbl.potensiId, row.id))
    .limit(1)

  let sectorData = null
  if (sectorRows[0]) {
    const s = sectorRows[0]
    sectorData = {
      komoditas: mapKomoditas(JSON.parse(s.komoditas)),
      musimTanam: JSON.parse(s.musimTanam),
      kelompokTani: JSON.parse(s.kelompokTani),
      pemasaran: s.pemasaran,
      modernisasi: s.modernisasi,
    }
  }

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    owner: row.owner ?? null,
    rtRw: row.rtRw ?? null,
    dusun: row.dusun ?? null,
    yearFounded: row.yearFounded ?? null,
    capacity: row.capacity ?? null,
    whatsapp: row.whatsapp ?? null,
    instagram: row.instagram ?? null,
    tiktok: row.tiktok ?? null,
    marketplace: row.marketplace ?? null,
    isSector: Boolean(row.isSector),
    images: images.map((img) => ({ imageUrl: img.imageUrl, caption: img.caption ?? null, sortOrder: img.sortOrder })),
    features: featuresRows.map((f) => f.feature),
    sectorData,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}
