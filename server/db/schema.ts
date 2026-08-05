import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const etalase = sqliteTable('etalase', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
})

export const umkms = sqliteTable('umkms', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  owner: text('owner').notNull(),
  category: text('category').notNull(),
  phone: text('phone'),
  description: text('description'),
  address: text('address'),
  image: text('image'),
  createdAt: text('created_at').notNull(),
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  umkmId: integer('umkm_id').notNull(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  unit: text('unit').notNull(),
  stock: integer('stock').notNull().default(0),
  description: text('description'),
  image: text('image'),
  createdAt: text('created_at').notNull(),
})

export const tourism = sqliteTable('tourism', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  location: text('location').notNull(),
  lat: real('lat').notNull(),
  lng: real('lng').notNull(),
  description: text('description'),
  address: text('address'),
  phone: text('phone'),
  image: text('image'),
  gallery: text('gallery'),
  facilities: text('facilities'),
  createdAt: text('created_at').notNull(),
})

export const cultures = sqliteTable('cultures', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  image: text('image'),
  schedule: text('schedule'),
  location: text('location'),
  createdAt: text('created_at').notNull(),
})

export const events = sqliteTable('events', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  date: text('date').notNull(),
  endDate: text('end_date'),
  location: text('location').notNull(),
  description: text('description'),
  image: text('image'),
  createdAt: text('created_at').notNull(),
})

export const gallery = sqliteTable('gallery', {
  id: integer('id').primaryKey(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  videoUrl: text('video_url'),
  createdAt: text('created_at').notNull(),
})

export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  author: text('author').notNull(),
  date: text('date').notNull(),
  cover: text('cover').notNull(),
  excerpt: text('excerpt'),
  content: text('content'),
  createdAt: text('created_at').notNull(),
})

export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey(),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('admin'),
  createdAt: text('created_at').notNull(),
})

export const produk = sqliteTable('produk', {
  id: integer('id').primaryKey(),
  etalaseId: integer('etalase_id')
    .references(() => etalase.id)
    .notNull(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
})
