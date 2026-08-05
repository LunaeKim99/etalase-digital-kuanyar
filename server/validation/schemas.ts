import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi'),
  slug: z.string().min(1, 'Slug kategori wajib diisi'),
})

export const umkmSchema = z.object({
  slug: z.string().min(1, 'Slug wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  owner: z.string().min(1, 'Nama pemilik wajib diisi'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  phone: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  image: z.string().optional(),
})

export const productSchema = z.object({
  slug: z.string().min(1, 'Slug wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  umkmId: z.number().min(1, 'UMKM ID wajib dipilih'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
  unit: z.string().min(1, 'Satuan wajib diisi'),
  stock: z.number().int().min(0, 'Stok tidak boleh negatif').default(0),
  description: z.string().optional(),
  image: z.string().optional(),
})

export const tourismSchema = z.object({
  slug: z.string().min(1, 'Slug wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  location: z.string().min(1, 'Lokasi wajib diisi'),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
})

export const cultureSchema = z.object({
  slug: z.string().min(1, 'Slug wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  description: z.string().optional(),
  image: z.string().optional(),
  schedule: z.string().optional(),
  location: z.string().optional(),
})

export const eventSchema = z.object({
  slug: z.string().min(1, 'Slug wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  endDate: z.string().optional(),
  location: z.string().min(1, 'Lokasi wajib diisi'),
  description: z.string().optional(),
  image: z.string().optional(),
})

export const gallerySchema = z.object({
  type: z.enum(['foto', 'video'], { message: 'Tipe harus foto atau video' }),
  title: z.string().min(1, 'Judul wajib diisi'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  image: z.string().min(1, 'URL gambar wajib diisi'),
  videoUrl: z.string().optional(),
})

export const articleSchema = z.object({
  slug: z.string().min(1, 'Slug wajib diisi'),
  title: z.string().min(1, 'Judul wajib diisi'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  author: z.string().min(1, 'Penulis wajib diisi'),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  cover: z.string().min(1, 'URL sampul wajib diisi'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type UmkmInput = z.infer<typeof umkmSchema>
export type ProductInput = z.infer<typeof productSchema>
export type TourismInput = z.infer<typeof tourismSchema>
export type CultureInput = z.infer<typeof cultureSchema>
export type EventInput = z.infer<typeof eventSchema>
export type GalleryInput = z.infer<typeof gallerySchema>
export type ArticleInput = z.infer<typeof articleSchema>
