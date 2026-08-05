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

export function prefetchOnIdle(paths: string[]): void {
  const run = (cb: () => void) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(cb)
    } else {
      setTimeout(cb, 2000)
    }
  }
  run(() => paths.forEach(prefetchRoute))
}
