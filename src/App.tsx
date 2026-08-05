import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/router'
import { AuthProvider } from '@/contexts/AuthContext'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { TopProgress } from '@/components/ui/TopProgress'
import { prefetchOnIdle } from '@/lib/prefetch'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function App() {
  useEffect(() => {
    prefetchOnIdle(['/', '/profil', '/berita-galeri', '/umkm', '/kontak'])
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TopProgress />
      <AuthProvider>
        <HelmetProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
