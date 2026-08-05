import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function getToken(): string | null {
  try { return localStorage.getItem('admin_token') } catch { return null }
}

function setToken(t: string | null) {
  if (t) {
    localStorage.setItem('admin_token', t)
  } else {
    localStorage.removeItem('admin_token')
  }
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
    mutationFn: async (creds: { username: string; password: string }) => {
      const res = await apiReq<{ token: string; data: { id: number; username: string; name: string; role: string } }>(
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
    list: useAdminList<import('@/types/catalog').Umkm>('admin_umkm', '/api/umkm'),
    create: useAdminCreate<import('@/types/catalog').Umkm>('admin_umkm', '/api/admin/umkm'),
    update: useAdminUpdate<import('@/types/catalog').Umkm>('admin_umkm', '/api/admin/umkm'),
    del: useAdminDelete('admin_umkm', '/api/admin/umkm'),
  }
}

export function useAdminProducts() {
  return {
    list: useAdminList<import('@/types/catalog').Product>('admin_produk', '/api/produk'),
    create: useAdminCreate<import('@/types/catalog').Product>('admin_produk', '/api/admin/produk'),
    update: useAdminUpdate<import('@/types/catalog').Product>('admin_produk', '/api/admin/produk'),
    del: useAdminDelete('admin_produk', '/api/admin/produk'),
  }
}

export function useAdminTourisms() {
  return {
    list: useAdminList<import('@/types/catalog').Tourism>('admin_wisata', '/api/wisata'),
    create: useAdminCreate<import('@/types/catalog').Tourism>('admin_wisata', '/api/admin/wisata'),
    update: useAdminUpdate<import('@/types/catalog').Tourism>('admin_wisata', '/api/admin/wisata'),
    del: useAdminDelete('admin_wisata', '/api/admin/wisata'),
  }
}

export function useAdminCultures() {
  return {
    list: useAdminList<import('@/types/catalog').Culture>('admin_budaya', '/api/budaya'),
    create: useAdminCreate<import('@/types/catalog').Culture>('admin_budaya', '/api/admin/budaya'),
    update: useAdminUpdate<import('@/types/catalog').Culture>('admin_budaya', '/api/admin/budaya'),
    del: useAdminDelete('admin_budaya', '/api/admin/budaya'),
  }
}

export function useAdminEvents() {
  return {
    list: useAdminList<import('@/types/catalog').Event>('admin_event', '/api/event'),
    create: useAdminCreate<import('@/types/catalog').Event>('admin_event', '/api/admin/event'),
    update: useAdminUpdate<import('@/types/catalog').Event>('admin_event', '/api/admin/event'),
    del: useAdminDelete('admin_event', '/api/admin/event'),
  }
}

export function useAdminGallery() {
  return {
    list: useAdminList<import('@/types/catalog').GalleryItem>('admin_galeri', '/api/galeri'),
    create: useAdminCreate<import('@/types/catalog').GalleryItem>('admin_galeri', '/api/admin/galeri'),
    update: useAdminUpdate<import('@/types/catalog').GalleryItem>('admin_galeri', '/api/admin/galeri'),
    del: useAdminDelete('admin_galeri', '/api/admin/galeri'),
  }
}

export function useAdminArticles() {
  return {
    list: useAdminList<import('@/types/catalog').Article>('admin_artikel', '/api/artikel'),
    create: useAdminCreate<import('@/types/catalog').Article>('admin_artikel', '/api/admin/artikel'),
    update: useAdminUpdate<import('@/types/catalog').Article>('admin_artikel', '/api/admin/artikel'),
    del: useAdminDelete('admin_artikel', '/api/admin/artikel'),
  }
}
