import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import TourismCard from '@/components/cards/TourismCard'
import { useTourisms } from '@/services/api'
import { cn } from '@/lib/utils'

const tourismCategories = ['Alam', 'Budaya', 'Pantai', 'Agrowisata', 'Religi']

function Wisata() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const { data, isLoading, isError } = useTourisms(search, category)

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            Wisata Desa Kuanyar
          </Typography>
          <Muted className="text-white/80">
            Jelajahi keindahan alam dan destinasi wisata Desa Kuanyar.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-text-light absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="input pl-10"
              placeholder="Cari destinasi wisata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {['', ...tourismCategories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                  category === c
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-muted hover:bg-surface-hover border border-border'
                )}
              >
                {c === '' ? 'Semua' : c}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-surface-hover" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-surface-hover rounded" />
                    <div className="h-4 bg-surface-hover rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <Muted>Gagal memuat data.</Muted>
            </div>
          ) : data && data.length === 0 ? (
            <div className="text-center py-12">
              <Muted>Tidak ada destinasi ditemukan.</Muted>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {data?.map((t) => (
                <Link key={t.id} to={`/wisata/${t.slug}`} className="block group">
                  <Card className="overflow-hidden">
                    <TourismCard image={t.image ?? ''} name={t.name} location={t.location} />
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section variant="gray" className="text-center">
        <Container>
          <Button variant="ghost" asChild>
            <Link to="/kontak">Butuh Bantuan Perencanaan Wisata?</Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}

export default Wisata
