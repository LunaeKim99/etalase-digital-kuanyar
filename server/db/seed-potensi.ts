import 'dotenv/config'
import { db } from './client.js'
import { potensiCategories, potensiItems, potensiImages, potensiFeatures, potensiSectorData } from './schema.js'
import * as potensiSeed from '../data/potensiSeedData.js'
import { sql } from 'drizzle-orm'

async function tableExists(tableName: string): Promise<boolean> {
  const r = await db.run(sql`SELECT name FROM sqlite_master WHERE type='table' AND name=${tableName}`)
  return (r.rows?.length ?? 0) > 0
}

async function countRows(tableName: string): Promise<number> {
  try {
    const r = await db.run(sql`SELECT COUNT(*) as c FROM ${sql.identifier(tableName)}`)
    return Number(r.rows?.[0]?.c ?? 0)
  } catch {
    return 0
  }
}

async function seedPotensi() {
  console.log('Seeding potensi data...')

  const hasTable = await tableExists('potensi_items')
  if (!hasTable) {
    console.error('Tables missing. Run migration first: npm run db:migrate')
    process.exit(1)
  }

  const count = await countRows('potensi_items')
  if (count > 0) {
    console.log('Potensi data already seeded. Skipping.')
    console.log(`  potensi_items: ${count}`)
    return
  }

  const now = new Date().toISOString()

  for (const c of potensiSeed.potensiCategories) {
    await db
      .insert(potensiCategories)
      .values({
        slug: c.slug,
        title: c.title,
        description: c.description,
        icon: c.icon,
        color: c.color,
        lightColor: c.lightColor,
      })
      .onConflictDoNothing({ target: potensiCategories.slug })
      .catch((e: Error) => console.warn(`category ${c.slug} skipped:`, e.message))
  }

  for (const item of potensiSeed.potensiItems) {
    await db
      .insert(potensiItems)
      .values({
        id: item.numId,
        name: item.name,
        description: item.description,
        category: item.category,
        owner: item.owner ?? null,
        rtRw: item.rtRw ?? null,
        dusun: item.dusun ?? null,
        yearFounded: item.yearFounded ?? null,
        capacity: item.capacity ?? null,
        whatsapp: item.whatsapp ?? null,
        instagram: item.instagram ?? null,
        tiktok: item.tiktok ?? null,
        marketplace: item.marketplace ?? null,
        isSector: item.isSector ? 1 : 0,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: potensiItems.id })
      .catch((e: Error) => console.warn(`item ${item.id} skipped:`, e.message))

    for (let i = 0; i < item.images.length; i++) {
      await db
        .insert(potensiImages)
        .values({
          potensiId: item.numId,
          imageUrl: item.images[i],
          caption: null,
          sortOrder: i,
        })
        .onConflictDoNothing()
        .catch(() => {})
    }

    if (item.features) {
      for (let i = 0; i < item.features.length; i++) {
        await db
          .insert(potensiFeatures)
          .values({
            potensiId: item.numId,
            feature: item.features[i],
            sortOrder: i,
          })
          .onConflictDoNothing()
          .catch(() => {})
      }
    }

    if (item.sectorData) {
      await db
        .insert(potensiSectorData)
        .values({
          potensiId: item.numId,
          komoditas: JSON.stringify(item.sectorData.komoditas),
          musimTanam: JSON.stringify(item.sectorData.musimTanam),
          kelompokTani: JSON.stringify(item.sectorData.kelompokTani),
          pemasaran: item.sectorData.pemasaran,
          modernisasi: item.sectorData.modernisasi,
        })
        .onConflictDoNothing()
        .catch((e: Error) => console.warn(`sector data for ${item.id} skipped:`, e.message))
    }
  }

  const final = await countRows('potensi_items')
  console.log(`Seed completed: ${final} potensi items`)
}

seedPotensi().catch((err: unknown) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
