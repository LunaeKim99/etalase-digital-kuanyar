import { db } from './client'
import {
  categories,
  umkms,
  products,
  tourism,
  cultures,
  events,
  gallery,
  articles,
  admins,
} from './schema'
import * as mockData from '../data/mockData'
import { hashPassword } from '../middleware/password'

function kebabCase(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-')
}

async function seed() {
  console.log('Seeding database...')

  // Truncate all tables (reverse FK order)
  await db.delete(products)
  await db.delete(umkms)
  await db.delete(tourism)
  await db.delete(cultures)
  await db.delete(events)
  await db.delete(gallery)
  await db.delete(articles)
  await db.delete(categories)
  await db.delete(admins)

  const now = new Date().toISOString()

  // Collect unique categories from all data sources (dedup by slug)
  const seenSlugs = new Map<string, string>()
  function addCategory(name: string) {
    const slug = kebabCase(name)
    if (!seenSlugs.has(slug)) seenSlugs.set(slug, name)
  }
  mockData.categories.forEach((c) => addCategory(c))
  mockData.tourism.forEach((t) => addCategory(t.category))
  mockData.cultures.forEach((c) => addCategory(c.category))
  mockData.galleryItems.forEach((g) => addCategory(g.category))
  mockData.articles.forEach((a) => addCategory(a.category))

  const categoryRows = Array.from(seenSlugs.entries()).map(([slug, name]) => ({
    name,
    slug,
  }))
  await db.insert(categories).values(categoryRows)

  const umkmRows = mockData.umkms.map((u) => ({
    id: u.id,
    slug: u.slug,
    name: u.name,
    owner: u.owner,
    category: u.category,
    phone: u.phone ?? null,
    description: u.description ?? null,
    address: u.address ?? null,
    image: u.image ?? null,
    createdAt: now,
  }))
  await db.insert(umkms).values(umkmRows)

  const productRows = mockData.products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    umkmId: p.umkmId,
    category: p.category,
    price: p.price,
    unit: p.unit,
    stock: p.stock,
    description: p.description ?? null,
    image: p.image ?? null,
    createdAt: now,
  }))
  await db.insert(products).values(productRows)

  const tourismRows = mockData.tourism.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    category: t.category,
    location: t.location,
    lat: t.lat,
    lng: t.lng,
    description: t.description ?? null,
    address: t.address ?? null,
    phone: t.phone ?? null,
    image: t.image ?? null,
    gallery: JSON.stringify(t.gallery ?? []),
    facilities: JSON.stringify(t.facilities ?? []),
    createdAt: now,
  }))
  await db.insert(tourism).values(tourismRows)

  const cultureRows = mockData.cultures.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description ?? null,
    image: c.image ?? null,
    schedule: c.schedule ?? null,
    location: c.location ?? null,
    createdAt: now,
  }))
  await db.insert(cultures).values(cultureRows)

  const eventRows = mockData.events.map((e) => ({
    id: e.id,
    slug: e.slug,
    name: e.name,
    date: e.date,
    endDate: e.endDate ?? null,
    location: e.location,
    description: e.description ?? null,
    image: e.image ?? null,
    createdAt: now,
  }))
  await db.insert(events).values(eventRows)

  const galleryRows = mockData.galleryItems.map((g) => ({
    id: g.id,
    type: g.type,
    title: g.title,
    category: g.category,
    image: g.image,
    videoUrl: g.videoUrl ?? null,
    createdAt: g.createdAt,
  }))
  await db.insert(gallery).values(galleryRows)

  const articleRows = mockData.articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category,
    author: a.author,
    date: a.date,
    cover: a.cover,
    excerpt: a.excerpt ?? null,
    content: a.content ?? null,
    createdAt: a.createdAt,
  }))
  await db.insert(articles).values(articleRows)

  await db.insert(admins).values({
    id: 1,
    username: 'admin',
    passwordHash: hashPassword('admin123'),
    name: 'Administrator',
    role: 'admin',
    createdAt: now,
  })

  console.log('Seed completed:')
  console.log(`  categories: ${categoryRows.length} rows`)
  console.log(`  umkms: ${umkmRows.length} rows`)
  console.log(`  products: ${productRows.length} rows`)
  console.log(`  tourism: ${tourismRows.length} rows`)
  console.log(`  cultures: ${cultureRows.length} rows`)
  console.log(`  events: ${eventRows.length} rows`)
  console.log(`  gallery: ${galleryRows.length} rows`)
  console.log(`  articles: ${articleRows.length} rows`)
  console.log('  admins: 1 row')
}

if (import.meta.main) {
  seed().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}
