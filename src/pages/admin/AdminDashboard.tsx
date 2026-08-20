import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  useAdminUmkms,
  useAdminProducts,
  useAdminPosts,
  useAdminCategories,
} from '@/services/admin'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import {
  Store,
  Package,
  FileText,
  Image,
  Plus,
  AlertCircle,
  ExternalLink,
  Calendar,
  Users,
} from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()
  const { list: umkmQuery } = useAdminUmkms()
  const { list: prodQuery } = useAdminProducts()
  const { list: postQuery } = useAdminPosts()
  const { list: catQuery } = useAdminCategories()

  const isLoading = umkmQuery.isLoading || prodQuery.isLoading || postQuery.isLoading || catQuery.isLoading
  const umkms = umkmQuery.data ?? []
  const products = prodQuery.data ?? []
  const posts = postQuery.data ?? []

  const summaryMetrics = useMemo(() => [
    { label: 'Total UMKM', value: umkms.length, icon: Store, href: '/admin/umkm', color: 'primary' },
    { label: 'Total Produk', value: products.length, icon: Package, href: '/admin/produk', color: 'secondary' },
    { label: 'Total Berita', value: posts.length, icon: FileText, href: '/admin/berita-galeri', color: 'tertiary' },
    { label: 'Total Kategori', value: catQuery.data?.length ?? 0, icon: Image, href: '/admin/berita-galeri', color: 'neutral' },
  ], [umkms.length, products.length, posts.length, catQuery.data?.length])

  const alerts = useMemo(() => {
    const umkmIdsWithProducts = new Set(products.map(p => p.umkmId))
    const umkmsWithoutProducts = umkms.filter(u => !umkmIdsWithProducts.has(u.id))
    const draftPosts = posts.filter(p => !p.publishedAt)
    const productsWithoutImages = products.filter(p => !p.image || p.image.trim() === '')

    const items = [] as Array<{
      label: string
      count: number
      variant: 'warning' | 'info' | 'error'
      bgColor: 'warning' | 'secondary' | 'error'
      badgeVariant: 'warning' | 'secondary' | 'error'
      icon: typeof AlertCircle
      href: string
      description: string
    }>

    if (umkmsWithoutProducts.length > 0) {
      items.push({
        label: 'UMKM tanpa produk',
        count: umkmsWithoutProducts.length,
        variant: 'warning',
        bgColor: 'warning',
        badgeVariant: 'warning',
        icon: AlertCircle,
        href: '/admin/umkm',
        description: 'UMKM yang belum memiliki produk',
      })
    }

    if (draftPosts.length > 0) {
      items.push({
        label: 'Berita draft',
        count: draftPosts.length,
        variant: 'info',
        bgColor: 'secondary',
        badgeVariant: 'secondary',
        icon: AlertCircle,
        href: '/admin/berita-galeri',
        description: 'Berita yang belum dipublikasikan',
      })
    }

    if (productsWithoutImages.length > 0) {
      items.push({
        label: 'Produk tanpa gambar',
        count: productsWithoutImages.length,
        variant: 'error',
        bgColor: 'error',
        badgeVariant: 'error',
        icon: AlertCircle,
        href: '/admin/produk',
        description: 'Produk yang belum memiliki gambar',
      })
    }

    return items
  }, [umkms, products, posts])

  const quickActions = [
    { label: 'Tambah UMKM', href: '/admin/umkm', icon: Plus, description: 'Daftarkan UMKM baru' },
    { label: 'Tambah Produk', href: '/admin/produk', icon: Plus, description: 'Tambah produk ke UMKM' },
    { label: 'Tulis Berita', href: '/admin/berita-galeri', icon: FileText, description: 'Buat artikel berita baru' },
    { label: 'Upload Galeri', href: '/admin/berita-galeri', icon: Image, description: 'Kelola galeri foto desa' },
  ]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card variant="filled" className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Typography variant="h4">Selamat datang, {user?.name ?? 'Admin'}</Typography>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-on-surface-variant" />
              <Muted>{formatDate(new Date())}</Muted>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-on-surface-variant" />
            <Muted>{umkms.length} UMKM terdaftar</Muted>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} variant="filled" className="p-6">
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-12 h-12 bg-surface-container-highest rounded-2xl" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-surface-container-highest rounded w-16" />
                    <div className="h-4 bg-surface-container-highest rounded w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Summary Metrics */}
      {!isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, i) => (
          <Card key={i} variant="filled" className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <Link to={metric.href} className="block">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-${metric.color}-container text-on-${metric.color}-container`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <Typography variant="h3" className="text-2xl truncate">{metric.value}</Typography>
                  <Muted className="truncate">{metric.label}</Muted>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Perlu Perhatian Section */}
      {alerts.length > 0 && (
        <Card variant="outlined" className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-warning" />
            <Typography variant="h5">Perlu Perhatian</Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {alerts.map((alert, i) => (
              <Link key={i} to={alert.href} className="block">
                <div className={`p-4 rounded-xl border border-outline-variant hover:bg-surface-container-lowest transition-colors`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl bg-${alert.bgColor}-container text-on-${alert.bgColor}-container flex-shrink-0`}>
                      <alert.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <Typography variant="large" className="truncate">{alert.label}</Typography>
                        <Badge variant={alert.badgeVariant} size="sm">{alert.count}</Badge>
                      </div>
                      <Muted className="mt-1 truncate">{alert.description}</Muted>
                    </div>
                    <ExternalLink className="w-4 h-4 text-on-surface-variant flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions Section */}
      <Card variant="filled" className="p-6">
        <Typography variant="h5" className="mb-4">Aksi Cepat</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.href}>
              <Button
                variant="outlined"
                size="lg"
                className="w-full justify-start gap-3 h-24 p-4 hover:bg-surface-container-lowest transition-colors"
              >
                <div className="p-2 rounded-xl bg-primary-container text-on-primary-container flex-shrink-0">
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="text-left min-w-0">
                  <Typography variant="large" className="truncate">{action.label}</Typography>
                  <Muted className="truncate">{action.description}</Muted>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}