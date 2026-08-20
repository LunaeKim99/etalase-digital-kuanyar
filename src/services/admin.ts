import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Umkm, Product, Post, PostImage, VillageProfile, PotensiCategory, PotensiItem } from '@/types/catalog'

const TOKEN_KEY = 'auth_token'

export function getToken(): string | null {
  try {
    const t = localStorage.getItem(TOKEN_KEY)
    return t && t.length > 0 ? t : null
  } catch {
    return null
  }
}

function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY) } catch {}
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

let onUnauthorized: (() => void) | null = null

export function setOnUnauthorized(handler: (() => void) | null) {
  onUnauthorized = handler
}

export async function apiReq<T>(url: string, method: string, body?: unknown): Promise<T> {
  const token = getToken()
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401) {
    clearToken()
    if (onUnauthorized) onUnauthorized()
    let msg = 'Sesi telah berakhir, silakan login ulang'
    try {
      const j = await res.json()
      if (j?.error) msg = j.error
    } catch {}
    throw new ApiError(msg, 401)
  }
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try {
      const j = await res.json()
      if (j?.error) msg = j.error
    } catch {}
    throw new ApiError(msg, res.status)
  }
  return res.json()
}

export function useLogin() {
  return useMutation({
    mutationFn: async (creds: { email: string; password: string }) => {
      const res = await apiReq<{ success: boolean; token: string; user: { id: number; name: string; email: string; role: string } }>(
        '/api/auth/login', 'POST', creds,
      )
      return res
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const res = await apiReq<{ success: boolean; token: string; user: { id: number; name: string; email: string; role: string } }>(
        '/api/auth/register', 'POST', data,
      )
      return res
    },
  })
}

function useAdminList<T>(key: string, endpoint: string) {
  return useQuery({
    queryKey: [key],
    queryFn: () => apiReq<{ data: T[] }>(endpoint, 'GET'),
    select: (r) => r.data,
  })
}

function useAdminDelete(key: string, endpoint: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiReq<{ data: unknown }>(`${endpoint}/${id}`, 'DELETE'),
    onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
  })
}

function useAdminCreate<T>(key: string, endpoint: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<T>) => apiReq<{ data: T }>(endpoint, 'POST', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
  })
}

function useAdminUpdate<T>(key: string, endpoint: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<T> }) =>
      apiReq<{ data: T }>(`${endpoint}/${id}`, 'PUT', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
  })
}

export function useAdminUmkms() {
  return {
    list: useAdminList<Umkm>('admin_umkm', '/api/admin/umkm'),
    create: useAdminCreate<Umkm>('admin_umkm', '/api/admin/umkm'),
    update: useAdminUpdate<Umkm>('admin_umkm', '/api/admin/umkm'),
    del: useAdminDelete('admin_umkm', '/api/admin/umkm'),
  }
}

export function useAdminProducts() {
  return {
    list: useAdminList<Product>('admin_produk', '/api/admin/products'),
    create: useAdminCreate<Product>('admin_produk', '/api/admin/products'),
    update: useAdminUpdate<Product>('admin_produk', '/api/admin/products'),
    del: useAdminDelete('admin_produk', '/api/admin/products'),
  }
}

export function useAdminPosts() {
  return {
    list: useAdminList<Post>('admin_posts', '/api/admin/posts'),
    create: useAdminCreate<Post>('admin_posts', '/api/admin/posts'),
    update: useAdminUpdate<Post>('admin_posts', '/api/admin/posts'),
    del: useAdminDelete('admin_posts', '/api/admin/posts'),
  }
}

export function useAdminPostImages() {
  const qc = useQueryClient()
  return {
    add: useMutation({
      mutationFn: (data: { postId: number; imageUrl: string; caption?: string; sortOrder?: number }) =>
        apiReq<{ data: PostImage }>(`/api/admin/posts/${data.postId}/images`, 'POST', data),
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin_posts'] }),
    }),
    del: useMutation({
      mutationFn: (id: number) => apiReq<{ data: unknown }>(`/api/admin/images/${id}`, 'DELETE'),
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin_posts'] }),
    }),
  }
}

export function useAdminCategories() {
  return {
    list: useAdminList<{ id: number; name: string; slug: string }>('admin_categories', '/api/admin/categories'),
    create: useAdminCreate<{ name: string; slug: string }>('admin_categories', '/api/admin/categories'),
    del: useAdminDelete('admin_categories', '/api/admin/categories'),
  }
}

export function useAdminVillageProfile() {
  const qc = useQueryClient()
  return {
    get: useQuery({
      queryKey: ['admin_village_profile'],
      queryFn: () => apiReq<{ data: VillageProfile }>('/api/admin/village-profile', 'GET'),
      select: (r) => r.data,
    }),
    update: useMutation({
      mutationFn: (data: Partial<VillageProfile>) =>
        apiReq<{ data: VillageProfile }>('/api/admin/village-profile', 'PUT', data),
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin_village_profile'] }),
    }),
  }
}

function invalidatePotensiQueries(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ['potensi_categories'] })
  qc.invalidateQueries({ queryKey: ['potensi_items'] })
}

export function useAdminPotensiCategories() {
  const qc = useQueryClient()
  return {
    list: useAdminList<PotensiCategory>('admin_potensi_categories', '/api/admin/potensi/categories'),
    create: useMutation({
      mutationFn: (data: Partial<PotensiCategory>) => apiReq<{ data: PotensiCategory }>('/api/admin/potensi/categories', 'POST', data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['admin_potensi_categories'] })
        invalidatePotensiQueries(qc)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, data }: { id: number; data: Partial<PotensiCategory> }) =>
        apiReq<{ data: PotensiCategory }>(`/api/admin/potensi/categories/${id}`, 'PUT', data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['admin_potensi_categories'] })
        invalidatePotensiQueries(qc)
      },
    }),
    del: useMutation({
      mutationFn: (id: number) => apiReq<{ data: unknown }>(`/api/admin/potensi/categories/${id}`, 'DELETE'),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['admin_potensi_categories'] })
        invalidatePotensiQueries(qc)
      },
    }),
  }
}

export function useAdminPotensiItems() {
  const qc = useQueryClient()
  return {
    list: useAdminList<PotensiItem>('admin_potensi_items', '/api/admin/potensi/items'),
    create: useMutation({
      mutationFn: (data: Partial<PotensiItem>) => apiReq<{ data: PotensiItem }>('/api/admin/potensi/items', 'POST', data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['admin_potensi_items'] })
        invalidatePotensiQueries(qc)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, data }: { id: number; data: Partial<PotensiItem> }) =>
        apiReq<{ data: PotensiItem }>(`/api/admin/potensi/items/${id}`, 'PUT', data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['admin_potensi_items'] })
        invalidatePotensiQueries(qc)
      },
    }),
    del: useMutation({
      mutationFn: (id: number) => apiReq<{ data: unknown }>(`/api/admin/potensi/items/${id}`, 'DELETE'),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['admin_potensi_items'] })
        invalidatePotensiQueries(qc)
      },
    }),
  }
}

export function useAdminPotensiImages() {
  const qc = useQueryClient()
  return {
    add: useMutation({
      mutationFn: (data: { itemId: number; imageUrl: string; sortOrder?: number }) =>
        apiReq<{ data: unknown }>(`/api/admin/potensi/items/${data.itemId}/images`, 'POST', data),
      onSuccess: () => invalidatePotensiQueries(qc),
    }),
    del: useMutation({
      mutationFn: (id: number) => apiReq<{ data: unknown }>(`/api/admin/potensi/images/${id}`, 'DELETE'),
      onSuccess: () => invalidatePotensiQueries(qc),
    }),
  }
}

export function useAdminPotensiFeatures() {
  const qc = useQueryClient()
  return {
    add: useMutation({
      mutationFn: (data: { itemId: number; feature: string; sortOrder?: number }) =>
        apiReq<{ data: unknown }>(`/api/admin/potensi/items/${data.itemId}/features`, 'POST', data),
      onSuccess: () => invalidatePotensiQueries(qc),
    }),
    del: useMutation({
      mutationFn: (id: number) => apiReq<{ data: unknown }>(`/api/admin/potensi/features/${id}`, 'DELETE'),
      onSuccess: () => invalidatePotensiQueries(qc),
    }),
  }
}