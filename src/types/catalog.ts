export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'umkm_owner'
}

export interface Umkm {
  id: number
  ownerId: number
  name: string
  description: string
  address: string
  whatsapp: string
  logo: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Product {
  id: number
  umkmId: number
  name: string
  description: string
  price: number
  image: string
  stock: number
  status: 'active' | 'draft' | 'inactive'
}

export interface Post {
  id: number
  title: string
  slug: string
  content: string
  category: string
  publishedAt?: string
  authorId: number
  coverImage?: string
}

export interface ListResponse<T> {
  data: T[]
}

export interface ItemResponse<T> {
  data: T
}

export interface VillageProfile {
  id: number
  name: string
  overview: string
  history: string
  vision: string
  mission: string
  demographics: string
  facilities: string
  adminInfo: string
  contactInfo: string
  lat: number | null
  lng: number | null
}

export interface PostImage {
  id: number
  postId: number
  imageUrl: string
  caption: string | null
  sortOrder: number
}

export interface PostWithImages extends Post {
  images: PostImage[]
  authorName: string
}

export interface UmkmWithProducts extends Umkm {
  products: Product[]
  ownerName: string
}
