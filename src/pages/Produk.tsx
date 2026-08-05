import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { useProducts, useKategori, formatRupiah } from '@/services/api'
import { cn } from '@/lib/utils'

function Produk() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const { data, isLoading, isError } = useProducts(search, category)
  const { data: categories } = useKategori()

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            Produk Unggulan
          </Typography>
          <Muted className="text-white/80">
            Produk-produk unggulan karya warga Desa Kuanyar yang siap dipasarkan secara lokal maupun digital.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-text-light absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="input pl-10"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {['', ...(categories ?? [])].map((c) => (
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
                  <div className="h-44 bg-surface-hover" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-surface-hover rounded" />
                    <div className="h-4 bg-surface-hover rounded" />
                    <div className="h-4 bg-surface-hover rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <Muted>Gagal memuat data. Coba lagi.</Muted>
            </div>
          ) : data && data.length === 0 ? (
            <div className="text-center py-12">
              <Muted>Tidak ada produk ditemukan.</Muted>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {data?.map((p) => (
                <Link key={p.id} to={`/produk/${p.slug}`} className="block group">
                  <Card className="p-4">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-44 w-full object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="h-44 w-full bg-surface rounded-lg mb-4 flex items-center justify-center">
                        <Muted>Gambar tidak tersedia</Muted>
                      </div>
                    )}
                    <Typography variant="h5">{p.name}</Typography>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">{formatRupiah(p.price)}</span>
                      <Muted>{p.unit}</Muted>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="badge">{p.category}</span>
                      <Muted className="text-xs">Stok {p.stock}</Muted>
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

export default Produk
