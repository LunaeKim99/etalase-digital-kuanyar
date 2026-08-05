import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Users, Package, MapPin, FileText, ArrowRight } from 'lucide-react'
import { useAdminUmkms, useAdminProducts, useAdminTourisms, useAdminArticles } from '@/services/admin'

function StatCard({ label, count, icon: Icon, href }: { label: string; count: number; icon: typeof Users; href: string }) {
  return (
    <Link to={href} className="block">
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <Muted className="text-sm">{label}</Muted>
            <Typography variant="h2" className="mt-1 font-bold">{count}</Typography>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
          Kelola <ArrowRight className="w-4 h-4" />
        </div>
      </Card>
    </Link>
  )
}

export default function AdminDashboard() {
  const { data: umkms } = useAdminUmkms().list
  const { data: products } = useAdminProducts().list
  const { data: tourisms } = useAdminTourisms().list
  const { data: articles } = useAdminArticles().list

  const stats = [
    { label: 'Total UMKM', count: umkms?.length ?? 0, icon: Users, href: '/admin/umkm' },
    { label: 'Total Produk', count: products?.length ?? 0, icon: Package, href: '/admin/produk' },
    { label: 'Total Wisata', count: tourisms?.length ?? 0, icon: MapPin, href: '/admin/wisata' },
    { label: 'Total Artikel', count: articles?.length ?? 0, icon: FileText, href: '/admin/artikel' },
  ]

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h2">Dashboard</Typography>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-surface">
                <Typography variant="h3" className="text-primary">{umkms?.length ?? 0}</Typography>
                <Muted>UMKM Terdaftar</Muted>
              </div>
              <div className="p-4 rounded-lg bg-surface">
                <Typography variant="h3" className="text-primary">{products?.length ?? 0}</Typography>
                <Muted>Produk Terdaftar</Muted>
              </div>
              <div className="p-4 rounded-lg bg-surface">
                <Typography variant="h3" className="text-primary">{tourisms?.length ?? 0}</Typography>
                <Muted>Destinasi Wisata</Muted>
              </div>
              <div className="p-4 rounded-lg bg-surface">
                <Typography variant="h3" className="text-primary">{articles?.length ?? 0}</Typography>
                <Muted>Artikel Terbit</Muted>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}