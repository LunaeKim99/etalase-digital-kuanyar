import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useVillageProfile } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { PageHero } from '@/components/sections/PageHero'
import { ArrowRight, Users, Store, Image, Wheat } from 'lucide-react'
import { getAllItems, getCategoryMeta, type PotensiItem } from '@/data/potensiData'

export default function Home() {
  const { data: profile } = useVillageProfile()
  const [posts, setPosts] = useState<Array<{ slug: string; title: string; coverImage?: string; publishedAt: string }>>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [allPotensi, setAllPotensi] = useState<PotensiItem[]>([])

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      try {
        const [postsRes, potensiRes] = await Promise.all([
          fetch('/api/posts?limit=3'),
          getAllItems(),
        ])
        if (cancelled) return
        const postsData = await postsRes.json()
        setPosts(postsData.data ?? [])
        const nonSector = potensiRes.filter((item) => !item.isSector)
        setAllPotensi(nonSector)
      } catch (e) {
        console.error('Failed to fetch home data:', e)
      } finally {
        if (!cancelled) setPostsLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  const featuredPotensi = allPotensi.slice(0, 3)

  const statCards = [
    { icon: Store, label: 'Potensi Desa', value: allPotensi.length, bg: 'bg-primary-container', text: 'text-on-primary-container' },
    { icon: Wheat, label: 'Sektor Pertanian', value: 1, bg: 'bg-secondary-container', text: 'text-on-secondary-container' },
    { icon: Image, label: 'Berita & Galeri', value: posts.length, bg: 'bg-tertiary-container', text: 'text-on-tertiary-container' },
    { icon: Users, label: 'Pengunjung Bulanan', value: '1.2K+', bg: 'bg-surface-container-high', text: 'text-on-surface' },
  ]

  return (
    <>
      <PageHero
        animated
        title={`Selamat Datang di ${profile?.name || 'Desa Kuanyar'}`}
        subtitle={profile?.overview || 'Etalase digital desa untuk memajukan potensi lokal, UMKM, produk, dan wisata desa ke seluruh Indonesia.'}
      >
        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
          <Link to="/potensi">Lihat Potensi Desa <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm font-semibold"
        >
          <Link to="/profil">Profil Desa <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </PageHero>

      <Section className="py-20 bg-background">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              Statistik Desa
            </Typography>
            <Text className="text-on-surface-variant max-w-2xl mx-auto">
              Data terkini potensi ekonomi dan kreatif Desa Kuanyar
            </Text>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statCards.map((stat, i) => (
              <Card key={i} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`${stat.bg} ${stat.text} w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7" />
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

      <Section className="py-20 bg-surface-container-low">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              Potensi Unggulan
            </Typography>
            <Text className="text-on-surface-variant max-w-2xl mx-auto">
              Hasil observasi lapangan: UMKM dan konveksi yang menjadi penggerak ekonomi Desa Kuanyar
            </Text>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPotensi.map((item) => {
              const meta = getCategoryMeta(item.category)
              return (
                <Link key={item.id} to="/potensi" className="block group">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {meta && (
                        <span className={`absolute top-3 left-3 badge ${meta.lightColor}`}>
                          {meta.title}
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-1">
                      <Typography variant="h5" className="group-hover:text-primary transition-colors">
                        {item.name}
                      </Typography>
                      {item.owner && <Muted className="text-sm">{item.owner}</Muted>}
                      <Text className="text-sm text-on-surface-variant line-clamp-2 mt-1">
                        {item.description}
                      </Text>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/potensi">Lihat Semua Potensi Desa <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-background">
        <Container>
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              Berita & Kegiatan Terbaru
            </Typography>
            <Text className="text-on-surface-variant max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kegiatan dan pembangunan di Desa Kuanyar
            </Text>
          </div>
          {postsLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-40 bg-surface" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-surface rounded w-1/3" />
                    <div className="h-6 bg-surface rounded w-3/4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} to={`/berita-galeri/${post.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    {post.coverImage && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <Typography variant="h5" className="group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </Typography>
                      <Muted className="text-sm mt-2">
                        {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </Muted>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Image className="w-12 h-12 text-on-surface-variant mx-auto mb-3" />
              <Muted>Belum ada berita terbaru.</Muted>
            </div>
          )}
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/berita-galeri">Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="py-20 bg-primary-container text-on-primary-container">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="mb-4">
              Ingin Potensi Anda Terlihat di Sini?
            </Typography>
            <Text className="mb-8 opacity-90">
              Daftarkan potensi Anda ke Etalase Digital Desa Kuanyar dan jangkau pembeli di seluruh Indonesia.
            </Text>
            <Button asChild size="lg" className="bg-primary text-on-primary hover:bg-primary/90">
              <Link to="/kontak">Hubungi Kami <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
