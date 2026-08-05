import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const Home = lazy(() => import('@/pages/Home'))
const Profil = lazy(() => import('@/pages/Profil'))
const Potensi = lazy(() => import('@/pages/Potensi'))
const PotensiCategory = lazy(() => import('@/pages/PotensiCategory'))
const Umkm = lazy(() => import('@/pages/Umkm'))
const UmkmDetail = lazy(() => import('@/pages/UmkmDetail'))
const Produk = lazy(() => import('@/pages/Produk'))
const ProdukDetail = lazy(() => import('@/pages/ProdukDetail'))
const Wisata = lazy(() => import('@/pages/Wisata'))
const WisataDetail = lazy(() => import('@/pages/WisataDetail'))
const Budaya = lazy(() => import('@/pages/Budaya'))
const Event = lazy(() => import('@/pages/Event'))
const Galeri = lazy(() => import('@/pages/Galeri'))
const GaleriDetail = lazy(() => import('@/pages/GaleriDetail'))
const Berita = lazy(() => import('@/pages/Berita'))
const BeritaDetail = lazy(() => import('@/pages/BeritaDetail'))
const Kontak = lazy(() => import('@/pages/Kontak'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminUmkm = lazy(() => import('@/pages/admin/AdminUmkm'))
const AdminProduk = lazy(() => import('@/pages/admin/AdminProduk'))
const AdminWisata = lazy(() => import('@/pages/admin/AdminWisata'))
const AdminBudaya = lazy(() => import('@/pages/admin/AdminBudaya'))
const AdminEvent = lazy(() => import('@/pages/admin/AdminEvent'))
const AdminGaleri = lazy(() => import('@/pages/admin/AdminGaleri'))
const AdminArtikel = lazy(() => import('@/pages/admin/AdminArtikel'))

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
      { path: 'potensi', element: <LazyWrapper><Potensi /></LazyWrapper> },
      { path: 'potensi/:slug', element: <LazyWrapper><PotensiCategory /></LazyWrapper> },
      { path: 'umkm', element: <LazyWrapper><Umkm /></LazyWrapper> },
      { path: 'umkm/:slug', element: <LazyWrapper><UmkmDetail /></LazyWrapper> },
      { path: 'produk', element: <LazyWrapper><Produk /></LazyWrapper> },
      { path: 'produk/:slug', element: <LazyWrapper><ProdukDetail /></LazyWrapper> },
      { path: 'wisata', element: <LazyWrapper><Wisata /></LazyWrapper> },
      { path: 'wisata/:slug', element: <LazyWrapper><WisataDetail /></LazyWrapper> },
      { path: 'budaya', element: <LazyWrapper><Budaya /></LazyWrapper> },
      { path: 'event', element: <LazyWrapper><Event /></LazyWrapper> },
      { path: 'galeri', element: <LazyWrapper><Galeri /></LazyWrapper> },
      { path: 'galeri/:id', element: <LazyWrapper><GaleriDetail /></LazyWrapper> },
      { path: 'berita', element: <LazyWrapper><Berita /></LazyWrapper> },
      { path: 'berita/:slug', element: <LazyWrapper><BeritaDetail /></LazyWrapper> },
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
      { path: 'wisata', element: <LazyWrapper><AdminWisata /></LazyWrapper> },
      { path: 'budaya', element: <LazyWrapper><AdminBudaya /></LazyWrapper> },
      { path: 'event', element: <LazyWrapper><AdminEvent /></LazyWrapper> },
      { path: 'galeri', element: <LazyWrapper><AdminGaleri /></LazyWrapper> },
      { path: 'artikel', element: <LazyWrapper><AdminArtikel /></LazyWrapper> },
    ],
  },
])
