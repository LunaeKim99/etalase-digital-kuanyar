import { useQuery } from '@tanstack/react-query'
import type { ListResponse, ItemResponse, Umkm, Product, Tourism, Culture, Event, GalleryItem, GalleryCategory, Article, ArticleCategory } from '@/types/catalog'
import { formatRupiah } from '@/lib/utils'

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export { formatRupiah }

export const api = {
  getUmkms: (search?: string, category?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    return getJson<ListResponse<Umkm>>(`/api/umkm?${params.toString()}`)
  },
  getUmkm: (slug: string) => getJson<ItemResponse<Umkm>>(`/api/umkm/${slug}`),
  getUmkmProducts: (slug: string) => getJson<ListResponse<Product>>(`/api/umkm/${slug}/produk`),
  getProducts: (search?: string, category?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    return getJson<ListResponse<Product>>(`/api/produk?${params.toString()}`)
  },
  getProduct: (slug: string) => getJson<ItemResponse<Product>>(`/api/produk/${slug}`),
  getKategori: () => getJson<ListResponse<string>>('/api/kategori'),
  getTourisms: (search?: string, category?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    return getJson<ListResponse<Tourism>>(`/api/wisata?${params.toString()}`)
  },
  getTourism: (slug: string) => getJson<ItemResponse<Tourism>>(`/api/wisata/${slug}`),
  getTourismGallery: (slug: string) => getJson<ListResponse<string>>(`/api/wisata/${slug}/galeri`),
  getCultures: () => getJson<ListResponse<Culture>>('/api/budaya'),
  getCulture: (slug: string) => getJson<ItemResponse<Culture>>(`/api/budaya/${slug}`),
  getEvents: () => getJson<ListResponse<Event>>('/api/event'),
  getEvent: (slug: string) => getJson<ItemResponse<Event>>(`/api/event/${slug}`),
  getGaleri: (type?: string, category?: string) => {
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (category) params.set('category', category)
    return getJson<ListResponse<GalleryItem>>(`/api/galeri?${params.toString()}`)
  },
  getGallery: (id: number) => getJson<ItemResponse<GalleryItem>>(`/api/galeri/${id}`),
  getGaleriKategori: () => getJson<ListResponse<GalleryCategory>>('/api/galeri-kategori'),
  getArticles: (search?: string, category?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('kategori', category)
    return getJson<ListResponse<Article>>(`/api/artikel?${params.toString()}`)
  },
  getArticle: (slug: string) => getJson<ItemResponse<Article>>(`/api/artikel/${slug}`),
  getArticleKategori: () => getJson<ListResponse<ArticleCategory>>('/api/artikel-kategori'),
}

export function useUmkms(search?: string, category?: string) {
  return useQuery({
    queryKey: ['umkms', search, category],
    queryFn: () => api.getUmkms(search, category),
    select: (r) => r.data,
  })
}

export function useUmkm(slug: string) {
  return useQuery({
    queryKey: ['umkm', slug],
    queryFn: () => api.getUmkm(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useUmkmProducts(slug: string) {
  return useQuery({
    queryKey: ['umkm-produk', slug],
    queryFn: () => api.getUmkmProducts(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useProducts(search?: string, category?: string) {
  return useQuery({
    queryKey: ['products', search, category],
    queryFn: () => api.getProducts(search, category),
    select: (r) => r.data,
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.getProduct(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useKategori() {
  return useQuery({
    queryKey: ['kategori'],
    queryFn: api.getKategori,
    select: (r) => r.data,
  })
}

export function useTourisms(search?: string, category?: string) {
  return useQuery({
    queryKey: ['tourisms', search, category],
    queryFn: () => api.getTourisms(search, category),
    select: (r) => r.data,
  })
}

export function useTourism(slug: string) {
  return useQuery({
    queryKey: ['tourism', slug],
    queryFn: () => api.getTourism(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useTourismGallery(slug: string) {
  return useQuery({
    queryKey: ['tourism-gallery', slug],
    queryFn: () => api.getTourismGallery(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useCultures() {
  return useQuery({
    queryKey: ['cultures'],
    queryFn: api.getCultures,
    select: (r) => r.data,
  })
}

export function useCulture(slug: string) {
  return useQuery({
    queryKey: ['culture', slug],
    queryFn: () => api.getCulture(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: api.getEvents,
    select: (r) => r.data,
  })
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: () => api.getEvent(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useGaleri(type?: string, category?: string) {
  return useQuery({
    queryKey: ['galeri', type, category],
    queryFn: () => api.getGaleri(type, category),
    select: (r) => r.data,
  })
}

export function useGallery(id: number) {
  return useQuery({
    queryKey: ['gallery', id],
    queryFn: () => api.getGallery(id),
    enabled: !!id,
    select: (r) => r.data,
  })
}

export function useGaleriKategori() {
  return useQuery({
    queryKey: ['galeri-kategori'],
    queryFn: api.getGaleriKategori,
    select: (r) => r.data,
  })
}

export function useArticles(search?: string, category?: string) {
  return useQuery({
    queryKey: ['articles', search, category],
    queryFn: () => api.getArticles(search, category),
    select: (r) => r.data,
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => api.getArticle(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useArticleKategori() {
  return useQuery({
    queryKey: ['artikel-kategori'],
    queryFn: api.getArticleKategori,
    select: (r) => r.data,
  })
}
