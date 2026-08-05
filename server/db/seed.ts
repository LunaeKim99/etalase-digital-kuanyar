import { db } from './client'
import { users, umkm, products, posts, postImages, categories as categoriesTbl, villageProfile } from './schema'
import { hashPassword } from '../middleware/password'
import * as mockData from '../data/mockData'

function kebabCase(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-')
}

async function seed() {
  console.log('Seeding database...')

  await db.delete(postImages)
  await db.delete(posts)
  await db.delete(products)
  await db.delete(umkm)
  await db.delete(categoriesTbl)
  await db.delete(villageProfile)
  await db.delete(users)

  const now = new Date().toISOString()

  await db.insert(users).values({
    name: 'Administrator',
    email: 'admin@kuanyar.desa.id',
    passwordHash: hashPassword('admin123'),
    role: 'admin',
    createdAt: now,
    updatedAt: now,
  })

  const userRows = [
    { id: 2, name: 'Sutrisno', email: 'sutrisno@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 3, name: 'Wijaya', email: 'wijaya@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 4, name: 'Rini', email: 'rini@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 5, name: 'Sari', email: 'sari@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 6, name: 'Budi', email: 'budi@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 7, name: 'Maya', email: 'maya@kuanyar.desa.id', role: 'umkm_owner' as const },
  ]

  for (const u of userRows) {
    await db.insert(users).values({
      id: u.id,
      name: u.name,
      email: u.email,
      passwordHash: hashPassword('owner123'),
      role: u.role,
      createdAt: now,
      updatedAt: now,
    })
  }

  const categoryRows = mockData.categories.map((c) => ({ name: c, slug: kebabCase(c) }))
  await db.insert(categoriesTbl).values(categoryRows)

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
  await db.insert(umkm).values(umkmRows)

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
  await db.insert(products).values(productRows)

  for (const post of mockData.posts) {
    await db.insert(posts).values({
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
    for (const img of post.images) {
      await db.insert(postImages).values({
        postId: post.id,
        imageUrl: img.imageUrl,
        caption: img.caption ?? null,
        sortOrder: img.sortOrder ?? 0,
      })
    }
  }

  await db.insert(villageProfile).values({
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

  console.log('Seed completed:')
  console.log(`  users: ${1 + userRows.length} rows`)
  console.log(`  categories: ${categoryRows.length} rows`)
  console.log(`  umkm: ${umkmRows.length} rows`)
  console.log(`  products: ${productRows.length} rows`)
  console.log(`  posts: ${mockData.posts.length} rows`)
  console.log('  village_profile: 1 row')
}

if (import.meta.main) {
  seed().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}