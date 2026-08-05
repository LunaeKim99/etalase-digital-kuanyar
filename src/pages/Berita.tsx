import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, User, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Text } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'
import { useArticles, useArticleKategori } from '@/services/api'
import { formatDate } from '@/lib/utils'

const categoryOptions = [
  'semua',
  'berita',
  'ekonomi',
  'budaya',
  'wisata',
  'pembangunan',
]

function Berita() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('semua')
  const { data, isLoading, isError } = useArticles(search || undefined, category === 'semua' ? undefined : category)
  useArticleKategori()

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            Berita & Artikel
          </Typography>
          <Muted className="text-white/80">
            Kabar terbaru, pengumuman, dan artikel seputar kegiatan serta perkembangan Desa Kuanyar.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-muted hover:bg-surface-hover border border-border'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-40 bg-surface-hover" />
                  <CardContent className="p-4 space-y-2">
                    <div className="h-4 bg-surface-hover rounded w-3/4" />
                    <div className="h-4 bg-surface-hover rounded w-1/2" />
                    <div className="h-3 bg-surface-hover rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <Muted>Gagal memuat berita.</Muted>
            </div>
          ) : data && data.length === 0 ? (
            <div className="text-center py-12">
              <Muted>Tidak ada berita ditemukan.</Muted>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {data?.map((item) => (
                <Link key={item.id} to={`/berita/${item.slug}`} className="block group">
                  <Card className="overflow-hidden">
                    {item.cover ? (
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="aspect-video bg-surface flex items-center justify-center">
                        <svg className="w-8 h-8 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <CardContent className="p-4 space-y-2">
                      <span className="badge">{item.category}</span>
                      <Typography variant="h5">{item.title}</Typography>
                      <Muted className="flex items-center gap-2 text-xs">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.date)}
                        <span>&middot;</span>
                        <User className="w-3 h-3" />
                        {item.author}
                      </Muted>
                      <Text className="text-sm text-text-muted line-clamp-2">{item.excerpt}</Text>
                      <div className="pt-2 border-t border-border text-xs text-text-muted flex items-center gap-1">
                        <span>{formatDate(item.date)} &bull; {item.author}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </CardContent>
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

export default Berita