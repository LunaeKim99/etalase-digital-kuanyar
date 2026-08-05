import { useQuery } from '@tanstack/react-query'
import type {
  ListResponse,
  ItemResponse,
  Umkm,
  Product,
  Post,
  PostWithImages,
  VillageProfile,
} from '@/types/catalog'
import { formatRupiah } from '@/lib/utils'

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

export { formatRupiah }

export const api = {
  getVillageProfile: () => getJson<ItemResponse<VillageProfile>>('/api/village-profile'),
  getPosts: (search?: string, category?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    return getJson<ListResponse<Post>>(`/api/posts?${params.toString()}`)
  },
  getPost: (slug: string) => getJson<ItemResponse<PostWithImages>>(`/api/posts/${slug}`),
  getCategories: () => getJson<ListResponse<{ id: number; name: string; slug: string }>>('/api/categories'),
  getUmkms: (search?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    return getJson<ListResponse<Umkm>>(`/api/umkm?${params.toString()}`)
  },
  getUmkm: (id: number) => getJson<ItemResponse<Umkm>>(`/api/umkm/${id}`),
  getUmkmProducts: (id: number) => getJson<ListResponse<Product>>(`/api/umkm/${id}/products`),
  getProducts: (search?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    return getJson<ListResponse<Product>>(`/api/products?${params.toString()}`)
  },
  getProduct: (id: number) => getJson<ItemResponse<Product>>(`/api/products/${id}`),
}

export function useVillageProfile() {
  return useQuery({
    queryKey: ['village-profile'],
    queryFn: api.getVillageProfile,
    select: (r) => r.data,
  })
}

export function usePosts(search?: string, category?: string) {
  return useQuery({
    queryKey: ['posts', search, category],
    queryFn: () => api.getPosts(search, category),
    select: (r) => r.data,
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => api.getPost(slug),
    enabled: !!slug,
    select: (r) => r.data,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
    select: (r) => r.data,
  })
}

export function useUmkms(search?: string) {
  return useQuery({
    queryKey: ['umkms', search],
    queryFn: () => api.getUmkms(search),
    select: (r) => r.data,
  })
}

export function useUmkm(id: number) {
  return useQuery({
    queryKey: ['umkm', id],
    queryFn: () => api.getUmkm(id),
    enabled: !!id,
    select: (r) => r.data,
  })
}

export function useUmkmProducts(id: number) {
  return useQuery({
    queryKey: ['umkm-products', id],
    queryFn: () => api.getUmkmProducts(id),
    enabled: !!id,
    select: (r) => r.data,
  })
}

export function useProducts(search?: string) {
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => api.getProducts(search),
    select: (r) => r.data,
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
    select: (r) => r.data,
  })
}