import 'dotenv/config'
import { db } from './client.js'
import { users, umkm, products, posts, postImages, categories as categoriesTbl, villageProfile } from './schema.js'
import { hashPassword } from '../middleware/password.js'
import * as mockData from '../data/mockData.js'
import { sql } from 'drizzle-orm'

function kebabCase(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-')
}

async function tableExists(tableName: string): Promise<boolean> {
  try {
    const r = await db.run(sql`SELECT name FROM sqlite_master WHERE type='table' AND name=${tableName}`)
    return (r.rows?.length ?? 0) > 0
  } catch {
    return false
  }
}

async function countRows(): Promise<{ users: number; umkm: number; products: number; posts: number; villageProfile: number }> {
  const safe = async (t: string) => {
    try {
      const r = await db.run(sql`SELECT COUNT(*) as c FROM ${sql.identifier(t)}`)
      return Number(r.rows?.[0]?.c ?? 0)
    } catch {
      return 0
    }
  }
  return {
    users: await safe('users'),
    umkm: await safe('umkm'),
    products: await safe('products'),
    posts: await safe('posts'),
    villageProfile: await safe('village_profile'),
  }
}

async function seed() {
  console.log('Seeding database...')

  const hasUsersTbl = await tableExists('users')
  if (!hasUsersTbl) {
    console.error('Tables missing. Run migration first: npm run db:migrate')
    process.exit(1)
  }

  const counts = await countRows()
  const alreadySeeded =
    counts.users > 0 && counts.villageProfile > 0 && counts.umkm > 0 && counts.products > 0 && counts.posts > 0
  if (alreadySeeded) {
    console.log('Database already seeded. Skipping.')
    console.log(`  users: ${counts.users}, umkm: ${counts.umkm}, products: ${counts.products}, posts: ${counts.posts}, village_profile: ${counts.villageProfile}`)
    return
  }

  const now = new Date().toISOString()

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  await db.insert(users)
    .values({
      name: 'Administrator',
      email: 'admin@kuanyar.desa.id',
      passwordHash: hashPassword(adminPassword),
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: users.email })
    .catch((e) => console.warn('admin insert skipped:', e.message))

  const userRows = [
    { id: 2, name: 'H. Miftah', email: 'miftah@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 3, name: 'Nur Aini', email: 'nuraini@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 4, name: 'Hj. Solikin', email: 'solikin@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 5, name: 'Mahmudah', email: 'mahmudah@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 6, name: 'Dwi Ratna Safitri', email: 'dwi.ratna@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 7, name: 'Naning', email: 'naning@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 8, name: 'Iswati', email: 'iswati@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 9, name: 'Pak Anyam', email: 'anyaman@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 10, name: 'Pak Ukir', email: 'ukirjati@kuanyar.desa.id', role: 'umkm_owner' as const },
  ]

  for (const u of userRows) {
    await db.insert(users)
      .values({
        id: u.id,
        name: u.name,
        email: u.email,
        passwordHash: hashPassword('owner123'),
        role: u.role,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: users.email })
      .catch((e) => console.warn(`user ${u.email} insert skipped:`, e.message))
  }

  const categoryRows = mockData.categories.map((c) => ({ name: c, slug: kebabCase(c) }))
  for (const c of categoryRows) {
    await db.insert(categoriesTbl).values(c).onConflictDoNothing({ target: categoriesTbl.slug }).catch((e) => console.warn(`category ${c.slug} skipped:`, e.message))
  }

  const umkmRows = mockData.umkms.map((u) => ({
    id: u.id,
    ownerId: u.ownerId,
    name: u.name,
    description: u.description,
    address: u.address,
    whatsapp: u.whatsapp,
    logo: u.logo,
    status: u.status as 'pending' | 'approved' | 'rejected',
    createdAt: now,
    updatedAt: now,
  }))
  for (const u of umkmRows) {
    await db.insert(umkm).values(u).onConflictDoNothing({ target: umkm.id }).catch((e) => console.warn(`umkm ${u.id} skipped:`, e.message))
  }

  const productRows = mockData.products.map((p) => ({
    id: p.id,
    umkmId: p.umkmId,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    stock: p.stock,
    status: p.status as 'active' | 'draft' | 'inactive',
    createdAt: now,
    updatedAt: now,
  }))
  for (const p of productRows) {
    await db.insert(products).values(p).onConflictDoNothing({ target: products.id }).catch((e) => console.warn(`product ${p.id} skipped:`, e.message))
  }

  for (const post of mockData.posts) {
    await db.insert(posts)
      .values({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        category: post.category,
        publishedAt: post.publishedAt,
        authorId: post.authorId,
        coverImage: post.coverImage,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: posts.slug })
      .catch((e) => console.warn(`post ${post.slug} skipped:`, e.message))

    for (const img of post.images) {
      await db.insert(postImages)
        .values({
          postId: post.id,
          imageUrl: img.imageUrl,
          caption: img.caption ?? null,
          sortOrder: img.sortOrder ?? 0,
        })
        .onConflictDoNothing()
        .catch(() => {})
    }
  }

  await db.insert(villageProfile)
    .values({
      id: mockData.villageProfile.id,
      name: mockData.villageProfile.name,
      overview: mockData.villageProfile.overview,
      history: mockData.villageProfile.history,
      vision: mockData.villageProfile.vision,
      mission: mockData.villageProfile.mission,
      demographics: mockData.villageProfile.demographics,
      facilities: mockData.villageProfile.facilities,
      adminInfo: mockData.villageProfile.adminInfo,
      contactInfo: mockData.villageProfile.contactInfo,
      lat: mockData.villageProfile.lat,
      lng: mockData.villageProfile.lng,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: villageProfile.id })
    .catch((e) => console.warn('village_profile skipped:', e.message))

  const final = await countRows()
  console.log('Seed completed:')
  console.log(`  users: ${final.users}`)
  console.log(`  categories: ${categoryRows.length}`)
  console.log(`  umkm: ${final.umkm}`)
  console.log(`  products: ${final.products}`)
  console.log(`  posts: ${final.posts}`)
  console.log(`  village_profile: ${final.villageProfile}`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})