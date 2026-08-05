import { useState, useEffect } from 'react'
import { useVillageProfile } from '@/services/api'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { ArrowRight, Users, Store, Image, Package } from 'lucide-react'

export default function Home() {
  const { data: profile } = useVillageProfile()
  const [stats, setStats] = useState({ umkm: 0, products: 0, posts: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [umkmRes, prodRes, postsRes] = await Promise.all([
          fetch('/api/umkm'),
          fetch('/api/products'),
          fetch('/api/posts'),
        ])
        const [umkmData, prodData, postsData] = await Promise.all([
          umkmRes.json(),
          prodRes.json(),
          postsRes.json(),
        ])
        setStats({
          umkm: umkmData.data?.length || 0,
          products: prodData.data?.length || 0,
          posts: postsData.data?.length || 0,
        })
      } catch (e) {
        console.error('Failed to fetch stats:', e)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { icon: Store, label: 'UMKM Terdaftar', value: stats.umkm, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Package, label: 'Produk Tersedia', value: stats.products, color: 'text-green-600', bg: 'bg-green-100' },
    { icon: Image, label: 'Berita & Galeri', value: stats.posts, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Users, label: 'Pengunjung Bulanan', value: '1.2K+', color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  return (
    <>
      <Section className="pt-28 md:pt-32 lg:pt-36 pb-20 bg-gradient-to-br from-primary-light via-white to-surface">
        <Container>
          <div className="max-w-3xl">
            <Typography variant="h1" className="mb-4">
              Selamat Datang di {profile?.name || 'Desa Kuanyar'}
            </Typography>
            <Text className="text-lg text-text-muted mb-8">
              {profile?.overview || 'Etalase digital desa untuk memajukan potensi lokal, UMKM, produk, dan wisata desa ke seluruh Indonesia.'}
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/umkm">Lihat UMKM <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/profil">Profil Desa <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              Statistik Desa
            </Typography>
            <Text className="text-text-muted max-w-2xl mx-auto">
              Data terkini potensi ekonomi dan kreatif Desa Kuanyar
            </Text>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statCards.map((stat, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <Typography variant="h3" className="mb-1">
                  {stat.value}
                </Typography>
                <Muted className="text-sm">{stat.label}</Muted>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-surface">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              UMKM Unggulan
            </Typography>
            <Text className="text-text-muted max-w-2xl mx-auto">
              Produk-produk unggulan dari pengrajin dan petani Desa Kuanyar
            </Text>
          </div>
          <div className="grid md:grid-cols-3 gap-6" id="featured-umkm">
            <div className="col-span-3 text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-text-muted mt-2">Memuat UMKM...</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/umkm">Lihat Semua UMKM <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              Berita & Kegiatan Terbaru
            </Typography>
            <Text className="text-text-muted max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kegiatan dan pembangunan di Desa Kuanyar
            </Text>
          </div>
          <div className="grid md:grid-cols-3 gap-6" id="latest-posts">
            <div className="col-span-3 text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-text-muted mt-2">Memuat berita...</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/berita-galeri">Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="mb-4">
              Ingin Produk Anda Terlihat di Sini?
            </Typography>
            <Text className="mb-8 opacity-90">
              Daftarkan UMKM Anda ke Etalase Digital Desa Kuanyar dan jangkau pembeli di seluruh Indonesia.
            </Text>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/kontak">Hubungi Kami <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}