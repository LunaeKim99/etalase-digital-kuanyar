import { useState } from 'react'
import { Search } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import UmkmCard from '@/components/cards/UmkmCard'
import { useUmkms, useKategori } from '@/services/api'
import { cn } from '@/lib/utils'

function Umkm() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const { data, isLoading, isError } = useUmkms(search, category)
  const { data: categories } = useKategori()

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            UMKM Desa Kuanyar
          </Typography>
          <Muted className="text-white/80">
            Jelajahi usaha mikro kecil menengah binaan desa.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-text-light absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="input pl-10"
              placeholder="Cari UMKM atau pemilik..."
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
              <Muted>Tidak ada UMKM ditemukan.</Muted>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {data?.map((umkm) => (
                <UmkmCard key={umkm.id} umkm={umkm} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default Umkm
