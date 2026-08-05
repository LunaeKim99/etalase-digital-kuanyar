import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Umkm, Product, Post, PostImage, VillageProfile } from '@/types/catalog'

function getToken(): string | null {
  try { return localStorage.getItem('auth_token') } catch { return null }
}

function setToken(t: string | null) {
  if (t) localStorage.setItem('auth_token', t)
  else localStorage.removeItem('auth_token')
}

async function apiReq<T>(url: string, method: string, body?: unknown): Promise<T> {
  const token = getToken()
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export function useLogin() {
  return useMutation({
    mutationFn: async (creds: { email: string; password: string }) => {
      const res = await apiReq<{ token: string; user: { id: number; name: string; email: string; role: string } }>(
        '/api/auth/login', 'POST', creds
      )
      setToken(res.token)
      return res
    },
  })
}

export function logout() {
  setToken(null)
}

export function useIsLoggedIn() {
  return !!getToken()
}

// Generic CRUD hooks
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