import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/router'
import { AuthProvider } from '@/contexts/AuthContext'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
