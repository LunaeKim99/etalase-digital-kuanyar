import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi').max(200),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi').max(120),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter').max(200),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi'),
  slug: z.string().min(1, 'Slug kategori wajib diisi'),
})

export const postSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi').max(300),
  slug: z.string().min(1, 'Slug wajib diisi').max(300).regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  content: z.string().min(1, 'Konten wajib diisi'),
  category: z.string().min(1, 'Kategori wajib diisi').max(100),
  coverImage: z.string().url('URL sampul tidak valid').max(500).optional().or(z.literal('')),
  publishedAt: z.string().datetime().optional().or(z.literal('')),
})

export const postImageSchema = z.object({
  postId: z.number().int().positive('Post ID harus angka positif'),
  imageUrl: z.string().url('URL gambar tidak valid').max(500),
  caption: z.string().max(500).optional(),
  sortOrder: z.number().int().min(0).optional(),
})

export const villageProfileSchema = z.object({
  name: z.string().min(1, 'Nama desa wajib diisi').max(200),
  overview: z.string().max(2000).optional(),
  history: z.string().max(5000).optional(),
  vision: z.string().max(2000).optional(),
  mission: z.string().max(2000).optional(),
  demographics: z.string().max(5000).optional(),
  facilities: z.string().max(2000).optional(),
  adminInfo: z.string().max(2000).optional(),
  contactInfo: z.string().max(2000).optional(),
  lat: z.number().min(-90).max(90).optional().nullable(),
  lng: z.number().min(-180).max(180).optional().nullable(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type PostInput = z.infer<typeof postSchema>
export type PostImageInput = z.infer<typeof postImageSchema>
export type VillageProfileInput = z.infer<typeof villageProfileSchema>