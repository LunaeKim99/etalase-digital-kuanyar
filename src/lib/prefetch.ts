const routePrefetchers: Record<string, () => Promise<unknown>> = {
  '/':            () => import('@/pages/Home'),
  '/profil':      () => import('@/pages/Profil'),
  '/berita-galeri': () => import('@/pages/BeritaGaleri'),
  '/umkm':        () => import('@/pages/Umkm'),
  '/kontak':      () => import('@/pages/Kontak'),
}

const cache = new Map<string, Promise<unknown>>()

export function prefetchRoute(path: string): void {
  const factory = routePrefetchers[path]
  if (!factory) return
  if (cache.has(path)) return
  cache.set(path, factory())
}
