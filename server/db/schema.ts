import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('umkm_owner'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const umkm = sqliteTable('umkm', {
  id: integer('id').primaryKey(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  address: text('address'),
  whatsapp: text('whatsapp'),
  logo: text('logo'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  umkmId: integer('umkm_id').references(() => umkm.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  image: text('image'),
  stock: integer('stock').notNull().default(0),
  status: text('status').notNull().default('active'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  publishedAt: text('published_at'),
  authorId: integer('author_id').references(() => users.id).notNull(),
  coverImage: text('cover_image'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const postImages = sqliteTable('post_images', {
  id: integer('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id).notNull(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
})

export const villageProfile = sqliteTable('village_profile', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().default('Desa Kuanyar'),
  overview: text('overview'),
  history: text('history'),
  vision: text('vision'),
  mission: text('mission'),
  demographics: text('demographics'),
  facilities: text('facilities'),
  adminInfo: text('admin_info'),
  contactInfo: text('contact_info'),
  lat: real('lat'),
  lng: real('lng'),
  updatedAt: text('updated_at').notNull(),
})

export const potensiCategories = sqliteTable('potensi_categories', {
  id: integer('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  lightColor: text('light_color').notNull(),
})

export const potensiItems = sqliteTable('potensi_items', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  owner: text('owner'),
  rtRw: text('rt_rw'),
  dusun: text('dusun'),
  yearFounded: integer('year_founded'),
  capacity: text('capacity'),
  whatsapp: text('whatsapp'),
  instagram: text('instagram'),
  tiktok: text('tiktok'),
  marketplace: text('marketplace'),
  isSector: integer('is_sector').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const potensiImages = sqliteTable('potensi_images', {
  id: integer('id').primaryKey(),
  potensiId: integer('potensi_id').references(() => potensiItems.id).notNull(),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const potensiFeatures = sqliteTable('potensi_features', {
  id: integer('id').primaryKey(),
  potensiId: integer('potensi_id').references(() => potensiItems.id).notNull(),
  feature: text('feature').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const potensiSectorData = sqliteTable('potensi_sector_data', {
  id: integer('id').primaryKey(),
  potensiId: integer('potensi_id').references(() => potensiItems.id).notNull(),
  komoditas: text('komoditas').notNull(),
  musimTanam: text('musim_tanam').notNull(),
  kelompokTani: text('kelompok_tani').notNull(),
  pemasaran: text('pemasaran').notNull(),
  modernisasi: text('modernisasi').notNull(),
})