import { useQuery } from '@tanstack/react-query'
import type {
  ListResponse,
  ItemResponse,
  Post,
  PostWithImages,
  VillageProfile,
  PotensiCategory,
} from '@/types/catalog'
import { normalizePotensiItem, normalizePotensiItems } from '@/lib/potensi-normalize'

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

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
  getPotensiCategories: () => getJson<ListResponse<PotensiCategory>>('/api/potensi/categories'),
  getPotensiItems: (search?: string, category?: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)
    return getJson<unknown>(`/api/potensi/items?${params.toString()}`)
  },
  getPotensiItem: (id: number) => getJson<unknown>(`/api/potensi/items/${id}`),
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

export function usePotensiCategories() {
  return useQuery({
    queryKey: ['potensi_categories'],
    queryFn: api.getPotensiCategories,
    select: (r) => r.data ?? [],
  })
}

export function usePotensiItems(search?: string, category?: string) {
  return useQuery({
    queryKey: ['potensi_items', search, category],
    queryFn: () => api.getPotensiItems(search, category),
    select: (r) => normalizePotensiItems((r as { data?: unknown })?.data),
  })
}

export function usePotensiItem(id: number) {
  return useQuery({
    queryKey: ['potensi_item', id],
    queryFn: () => api.getPotensiItem(id),
    enabled: !!id && !Number.isNaN(id),
    select: (r) => normalizePotensiItem((r as { data?: unknown })?.data),
  })
}