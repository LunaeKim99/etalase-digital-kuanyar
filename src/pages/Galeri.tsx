import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { useGaleri, useGaleriKategori } from '@/services/api'
import { cn } from '@/lib/utils'

const typeOptions = [
  { label: 'Semua', value: '' },
  { label: 'Foto', value: 'foto' },
  { label: 'Video', value: 'video' },
]

function Galeri() {
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const { data, isLoading, isError } = useGaleri(type || undefined, category || undefined)
  const { data: categories } = useGaleriKategori()

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            Galeri Desa Kuanyar
          </Typography>
          <Muted className="text-white/80">
            Dokumentasi foto dan video kegiatan, potensi, serta momen-momen penting di Desa Kuanyar.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="flex flex-wrap gap-2 mb-4">
            {typeOptions.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                  type === t.value
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-muted hover:bg-surface-hover border border-border'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories?.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id === category ? '' : c.id)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                  category === c.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-muted hover:bg-surface-hover border border-border'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-36 bg-surface-hover" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-surface-hover rounded w-3/4" />
                    <div className="h-3 bg-surface-hover rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <Muted>Gagal memuat galeri.</Muted>
            </div>
          ) : data && data.length === 0 ? (
            <div className="text-center py-12">
              <Muted>Tidak ada item ditemukan.</Muted>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {data?.map((item) => (
                <Link key={item.id} to={`/galeri/${item.id}`} className="block group">
                  <Card className="overflow-hidden">
                    {item.type === 'foto' ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-36 object-cover"
                      />
                    ) : (
                      <div className="relative aspect-video bg-surface rounded-t-lg flex items-center justify-center">
                        <Play className="w-8 h-8 text-text-light" />
                      </div>
                    )}
                    <div className="p-3 space-y-1">
                      <span className="badge">{item.category}</span>
                      <Typography variant="h5">{item.title}</Typography>
                      <Muted className="text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.createdAt}
                      </Muted>
                      {item.type === 'video' && (
                        <Typography variant="small" className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          Video
                        </Typography>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default Galeri