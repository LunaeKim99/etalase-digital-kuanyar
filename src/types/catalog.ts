export interface Umkm {
  id: number
  slug: string
  name: string
  owner: string
  category: string
  phone: string
  description: string
  address: string
  image?: string
}

export interface Product {
  id: number
  slug: string
  name: string
  umkmId: number
  umkmName: string
  umkmSlug: string
  category: string
  price: number
  unit: string
  stock: number
  description: string
  image?: string
}

export interface ListResponse<T> {
  data: T[]
}

export interface ItemResponse<T> {
  data: T
}

export interface Tourism {
  id: number
  slug: string
  name: string
  category: string
  location: string
  lat: number
  lng: number
  description: string
  address: string
  phone?: string
  image?: string
  gallery?: string[]
  facilities?: string[]
}

export interface Culture {
  id: number
  slug: string
  name: string
  category: string
  description: string
  image?: string
  schedule?: string
  location?: string
}

export interface Event {
  id: number
  slug: string
  name: string
  date: string
  endDate?: string
  location: string
  description: string
  image?: string
}

export interface GalleryItem {
  id: number
  type: 'foto' | 'video'
  title: string
  category: string
  image: string
  videoUrl?: string
  createdAt: string
}

export interface GalleryCategory {
  id: string
  label: string
}

export interface Article {
  id: number
  slug: string
  title: string
  category: string
  author: string
  date: string
  cover: string
  excerpt: string
  content: string
  createdAt: string
}

export interface ArticleCategory {
  id: string
  label: string
}
