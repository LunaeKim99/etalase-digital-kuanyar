import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import {
  getAllItems,
  getCategoryMeta,
  type PotensiItem,
  type PotensiCategoryMeta,
  type PotensiCategory,
} from '@/data/potensiData'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import PotensiItemCard from '@/components/cards/PotensiItemCard'
import { PageHero } from '@/components/sections/PageHero'
import PotensiModal from '@/components/ui/PotensiModal'

type FilterValue = PotensiCategory | 'all'

export default function Potensi() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')
  const [selectedItem, setSelectedItem] = useState<PotensiItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<PotensiCategoryMeta | null>(null)
  const [allItems, setAllItems] = useState<PotensiItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getAllItems()
        if (!cancelled) {
          setAllItems(data)
        }
      } catch {
        if (!cancelled) setError('Gagal memuat data potensi')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    return allItems.filter((item) => {
      const matchesFilter = filter === 'all' || item.category === filter
      if (!matchesFilter) return false
      if (!query) return true
      const haystack = [
        item.name,
        item.owner ?? '',
        item.description,
        item.dusun ?? '',
        item.rtRw ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [allItems, search, filter])

  const handleCardClick = (item: PotensiItem) => {
    setSelectedItem(item)
    setSelectedCategory(getCategoryMeta(item.category) ?? null)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setSelectedCategory(null)
  }

  return (
    <>
      <PageHero
        title="Potensi Desa Kuanyar"
        subtitle="Hasil observasi lapangan: konveksi, UMKM makanan, dan pertanian yang menjadi tulang punggung ekonomi Desa Kuanyar."
      >
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none" />
            <Input
              placeholder="Cari potensi desa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 py-3 bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/20"
              aria-label="Cari potensi desa"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterValue)}
            className="w-full sm:max-w-[200px] px-4 h-10 bg-white/15 border border-white/30 rounded-full text-white text-sm focus:border-white focus:outline-none transition-colors appearance-none bg-no-repeat bg-right pr-10"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem",
            }}
            aria-label="Filter kategori potensi"
          >
            <option value="all">Semua Kategori</option>
            <option value="konveksi">Konveksi</option>
            <option value="umkm-makanan">UMKM Makanan</option>
            <option value="pertanian">Pertanian</option>
          </select>
        </div>
      </PageHero>

      <Section className="py-16">
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-surface-container-low rounded-lg" />
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-surface-container-low rounded w-3/4" />
                    <div className="h-3 bg-surface-container-low rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-surface-container-low rounded-2xl">
              <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <Typography variant="h4" className="mb-2">
                Gagal Memuat Data
              </Typography>
              <Muted>{error}</Muted>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const categoryMeta = getCategoryMeta(item.category)
                if (!categoryMeta) return null
                if (item.isSector) {
                  return (
                    <div key={item.id} className="sm:col-span-2 lg:col-span-3">
                      <PotensiItemCard
                        item={item}
                        categoryMeta={categoryMeta}
                        onClick={handleCardClick}
                        variant="sector"
                      />
                    </div>
                  )
                }
                return (
                  <PotensiItemCard
                    key={item.id}
                    item={item}
                    categoryMeta={categoryMeta}
                    onClick={handleCardClick}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container-low rounded-2xl">
              <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <Typography variant="h4" className="mb-2">
                Tidak Ada Potensi
              </Typography>
              <Muted>
                {search || filter !== 'all'
                  ? 'Coba ubah kata kunci pencarian atau pilih kategori lain.'
                  : 'Belum ada data potensi desa yang ditampilkan.'}
              </Muted>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/kontak"
              className="inline-flex items-center gap-2 text-primary hover:text-on-primary-container font-medium transition-colors"
            >
              Ingin potensi Anda tampil di sini? Hubungi kami →
            </Link>
          </div>
        </Container>
      </Section>

      <PotensiModal
        item={selectedItem}
        categoryMeta={selectedCategory}
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
      />
    </>
  )
}