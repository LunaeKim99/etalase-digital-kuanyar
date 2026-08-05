import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const Home = lazy(() => import('@/pages/Home'))
const Profil = lazy(() => import('@/pages/Profil'))
const BeritaGaleri = lazy(() => import('@/pages/BeritaGaleri'))
const BeritaGaleriDetail = lazy(() => import('@/pages/BeritaGaleriDetail'))
const Umkm = lazy(() => import('@/pages/Umkm'))
const UmkmDetail = lazy(() => import('@/pages/UmkmDetail'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Kontak = lazy(() => import('@/pages/Kontak'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminUmkm = lazy(() => import('@/pages/admin/AdminUmkm'))
const AdminProduk = lazy(() => import('@/pages/admin/AdminProduk'))
const AdminBeritaGaleri = lazy(() => import('@/pages/admin/AdminBeritaGaleri'))
const AdminProfil = lazy(() => import('@/pages/admin/AdminProfil'))

function LazyWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSkeleton variant="card" count={1} />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LazyWrapper><Home /></LazyWrapper> },
      { path: 'profil', element: <LazyWrapper><Profil /></LazyWrapper> },
      { path: 'berita-galeri', element: <LazyWrapper><BeritaGaleri /></LazyWrapper> },
      { path: 'berita-galeri/:slug', element: <LazyWrapper><BeritaGaleriDetail /></LazyWrapper> },
      { path: 'umkm', element: <LazyWrapper><Umkm /></LazyWrapper> },
      { path: 'umkm/:id', element: <LazyWrapper><UmkmDetail /></LazyWrapper> },
      { path: 'produk/:id', element: <LazyWrapper><ProductDetail /></LazyWrapper> },
      { path: 'kontak', element: <LazyWrapper><Kontak /></LazyWrapper> },
      { path: '*', element: <LazyWrapper><NotFound /></LazyWrapper> },
    ],
  },
  {
    path: '/admin/login',
    element: <LazyWrapper><AdminLogin /></LazyWrapper>,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <LazyWrapper><AdminDashboard /></LazyWrapper> },
      { path: 'umkm', element: <LazyWrapper><AdminUmkm /></LazyWrapper> },
      { path: 'produk', element: <LazyWrapper><AdminProduk /></LazyWrapper> },
      { path: 'berita-galeri', element: <LazyWrapper><AdminBeritaGaleri /></LazyWrapper> },
      { path: 'profil', element: <LazyWrapper><AdminProfil /></LazyWrapper> },
    ],
  },
])