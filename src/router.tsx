import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { TopProgress } from '@/components/ui/TopProgress'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const Profil = lazy(() => import('@/pages/Profil'))
const BeritaGaleri = lazy(() => import('@/pages/BeritaGaleri'))
const BeritaGaleriDetail = lazy(() => import('@/pages/BeritaGaleriDetail'))
const Potensi = lazy(() => import('@/pages/Potensi'))
const PotensiDetail = lazy(() => import('@/pages/PotensiDetail'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Kontak = lazy(() => import('@/pages/Kontak'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminUnauthorized = lazy(() => import('@/pages/admin/AdminUnauthorized'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminUmkm = lazy(() => import('@/pages/admin/AdminUmkm'))
const AdminUmkmDetail = lazy(() => import('@/pages/admin/AdminUmkmDetail'))
const AdminBeritaGaleri = lazy(() => import('@/pages/admin/AdminBeritaGaleri'))
const AdminProfil = lazy(() => import('@/pages/admin/AdminProfil'))
const AdminTampilan = lazy(() => import('@/pages/admin/AdminTampilan'))
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'))
const AdminPotensi = lazy(() => import('@/pages/admin/AdminPotensi'))
const AdminPertanian = lazy(() => import('@/pages/admin/AdminPertanian'))
const AdminPertanianDetail = lazy(() => import('@/pages/admin/AdminPertanianDetail'))



function LazyWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSkeleton variant="card" count={1} />}>{children}</Suspense>
}

function RootLayout() {
  return (
    <>
      <TopProgress />
      <ScrollToTop />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <LazyWrapper><Home /></LazyWrapper> },
          { path: 'profil', element: <LazyWrapper><Profil /></LazyWrapper> },
          { path: 'berita-galeri', element: <LazyWrapper><BeritaGaleri /></LazyWrapper> },
          { path: 'berita-galeri/:slug', element: <LazyWrapper><BeritaGaleriDetail /></LazyWrapper> },
          { path: 'potensi', element: <LazyWrapper><Potensi /></LazyWrapper> },
          { path: 'potensi/:id', element: <LazyWrapper><PotensiDetail /></LazyWrapper> },
          { path: 'produk/:id', element: <LazyWrapper><ProductDetail /></LazyWrapper> },
          { path: 'kontak', element: <LazyWrapper><Kontak /></LazyWrapper> },
          { path: '*', element: <LazyWrapper><NotFound /></LazyWrapper> },
        ],
      },
      // Admin routes — accessible to admin role only (via AdminGuard)
      {
        path: '/admin/login',
        element: <LazyWrapper><AdminLogin /></LazyWrapper>,
      },
      {
        path: '/admin/unauthorized',
        element: <LazyWrapper><AdminUnauthorized /></LazyWrapper>,
      },
      {
        path: '/admin',
        element: <AdminGuard><AdminLayout /></AdminGuard>,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <LazyWrapper><AdminDashboard /></LazyWrapper> },

          // Potensi Desa — pusat pengelolaan potensi desa
          { path: 'potensi', element: <LazyWrapper><AdminPotensi /></LazyWrapper> },
          { path: 'potensi/umkm', element: <LazyWrapper><AdminUmkm /></LazyWrapper> },
          { path: 'potensi/umkm/:umkmId', element: <LazyWrapper><AdminUmkmDetail /></LazyWrapper> },
          { path: 'potensi/pertanian', element: <LazyWrapper><AdminPertanian /></LazyWrapper> },
          { path: 'potensi/pertanian/:itemId', element: <LazyWrapper><AdminPertanianDetail /></LazyWrapper> },

          // Legacy redirect (route lama Etalase UMKM)
          { path: 'umkm', element: <Navigate to="/admin/potensi/umkm" replace /> },
          { path: 'produk', element: <Navigate to="/admin/potensi/umkm" replace /> },

          { path: 'berita-galeri', element: <LazyWrapper><AdminBeritaGaleri /></LazyWrapper> },
          { path: 'profil', element: <LazyWrapper><AdminProfil /></LazyWrapper> },
          { path: 'tampilan', element: <LazyWrapper><AdminTampilan /></LazyWrapper> },
          { path: 'pengaturan', element: <LazyWrapper><AdminSettings /></LazyWrapper> },
        ],
      },

    ],
  },
])