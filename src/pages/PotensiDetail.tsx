import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Check,
  MessageSquare,
  ExternalLink,
  Music,
  User,
  MapPin,
  Calendar,
  Package,
  Wheat,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { usePotensiItem, usePotensiCategories } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import LazyImage from '@/components/ui/LazyImage'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function PotensiDetail() {
  const { id } = useParams<{ id: string }>()
  const itemId = id ? parseInt(id, 10) : NaN

  const { data: item, isLoading, error } = usePotensiItem(itemId)
  const { data: categories } = usePotensiCategories()

  const [activeImg, setActiveImg] = useState(0)

  const categoryMeta = useMemo(() => {
    if (!item || !categories) return null
    return categories.find((c) => c.slug === item.category) ?? null
  }, [item, categories])

  if (isLoading) {
    return (
      <Section className="pt-24 pb-16">
        <Container>
          <LoadingSkeleton count={1} variant="card" />
        </Container>
      </Section>
    )
  }

  if (error || !item) {
    return (
      <Section className="pt-24 pb-16">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <Card variant="filled" className="p-8 text-center">
              <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <Typography variant="h3" className="mb-2">Potensi Tidak Ditemukan</Typography>
              <Muted className="mb-6">
                Item potensi yang Anda cari tidak tersedia.
              </Muted>
              <Button variant="outline" asChild>
                <Link to="/potensi">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Potensi Desa
                </Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>
    )
  }

  const images = item.images ?? []
  const hasMultiple = images.length > 1
  const prev = () => setActiveImg((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveImg((i) => (i + 1) % images.length)
  const isSector = item.isSector === true

  const metaColor = categoryMeta?.color ?? ''
  const metaLightColor = categoryMeta?.lightColor ?? ''
  const metaTitle = categoryMeta?.title ?? ''

  return (
    <Section className="pt-24 pb-16">
      <Container>
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/potensi">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Potensi Desa
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          {isSector ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${metaLightColor} flex items-center justify-center`}>
                  <Wheat className={`w-6 h-6 ${metaColor.replace('bg-', 'text-')}`} />
                </div>
                <span className={`badge ${metaLightColor} ${metaColor.replace('bg-', 'text-')}`}>
                  {metaTitle}
                </span>
              </div>

              <Typography variant="h1">{item.name}</Typography>
              <Muted className="leading-relaxed">{item.description}</Muted>

              {images.length > 0 && (
                <section>
                  <Typography variant="h4" className="mb-3">Galeri</Typography>
                  <div className="relative aspect-[16/9] bg-surface-container-low overflow-hidden rounded-lg">
                    <LazyImage
                      src={images[activeImg]}
                      alt={`${item.name} — foto ${activeImg + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-full object-contain"
                    />
                    {hasMultiple && (
                      <>
                        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-scrim/40 text-white hover:bg-scrim/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Foto sebelumnya">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-scrim/40 text-white hover:bg-scrim/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Foto berikutnya">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {hasMultiple && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {images.map((src, i) => (
                        <button key={src} onClick={() => setActiveImg(i)} className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`} aria-label={`Lihat foto ${i + 1}`}>
                          <img src={src} alt="" className="w-full h-full object-contain" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {item.sectorData && (
                <>
                  {item.sectorData.komoditas.length > 0 && (
                    <section>
                      <Typography variant="h4" className="mb-3">Komoditas Unggulan</Typography>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {item.sectorData.komoditas.map((k) => (
                          <div key={k.nama} className="bg-surface-container-low p-4 rounded-lg">
                            <Typography variant="h5" className="mb-1">{k.nama}</Typography>
                            <Muted className="text-sm">{k.deskripsi}</Muted>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {item.sectorData.musimTanam.length > 0 && (
                    <section>
                      <Typography variant="h4" className="mb-3">Musim Tanam</Typography>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-outline-variant rounded-lg overflow-hidden">
                          <thead className="bg-surface-container-highest">
                            <tr className="text-left text-on-surface-variant">
                              <th className="px-4 py-2 font-medium">Musim</th>
                              <th className="px-4 py-2 font-medium">Lahan Aktif</th>
                              <th className="px-4 py-2 font-medium">Lahan Kosong</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.sectorData.musimTanam.map((m) => (
                              <tr key={m.musim} className="border-t border-outline-variant">
                                <td className="px-4 py-2 font-medium">{m.musim}</td>
                                <td className="px-4 py-2">{m.lahanAktif}</td>
                                <td className="px-4 py-2">{m.lahanKosong}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}

                  {item.sectorData.kelompokTani.length > 0 && (
                    <section>
                      <Typography variant="h4" className="mb-3">Kelompok Tani</Typography>
                      <div className="flex flex-wrap gap-2">
                        {item.sectorData.kelompokTani.map((k) => (
                          <span key={k} className="badge">{k}</span>
                        ))}
                      </div>
                    </section>
                  )}

                  {item.sectorData.modernisasi && (
                    <section className="bg-primary-container/40 p-4 rounded-lg">
                      <Typography variant="h5" className="mb-2">Modernisasi</Typography>
                      <Muted className="text-sm leading-relaxed">{item.sectorData.modernisasi}</Muted>
                    </section>
                  )}

                  {item.sectorData.pemasaran && (
                    <section className="bg-primary-container/40 p-4 rounded-lg">
                      <Typography variant="h5" className="mb-2">Pemasaran</Typography>
                      <Muted className="text-sm leading-relaxed">{item.sectorData.pemasaran}</Muted>
                    </section>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {images.length > 0 ? (
                <div>
                  <div className="relative aspect-[16/9] bg-surface-container-low overflow-hidden rounded-lg">
                    <LazyImage
                      src={images[activeImg]}
                      alt={`${item.name} — foto ${activeImg + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-full object-contain"
                    />
                    {hasMultiple && (
                      <>
                        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-scrim/40 text-white hover:bg-scrim/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Foto sebelumnya">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-scrim/40 text-white hover:bg-scrim/60 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2" aria-label="Foto berikutnya">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full transition-colors ${i === activeImg ? 'bg-white' : 'bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {hasMultiple && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {images.map((src, i) => (
                        <button key={src} onClick={() => setActiveImg(i)} className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`} aria-label={`Lihat foto ${i + 1}`}>
                          <img src={src} alt="" className="w-full h-full object-contain" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/9] bg-surface-container-low rounded-lg flex items-center justify-center">
                  <Muted>Gambar tidak tersedia</Muted>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`badge ${metaLightColor} ${metaColor.replace('bg-', 'text-')}`}>
                  {metaTitle}
                </span>
                {item.yearFounded && (
                  <span className="text-sm text-on-surface-variant flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Berdiri {item.yearFounded}
                  </span>
                )}
                {item.capacity && (
                  <span className="text-sm text-on-surface-variant flex items-center gap-1">
                    <Package className="w-4 h-4" /> {item.capacity}
                  </span>
                )}
              </div>

              <Typography variant="h1">{item.name}</Typography>
              <Muted className="leading-relaxed">{item.description}</Muted>

              <div className="grid sm:grid-cols-2 gap-4 py-2">
                {item.owner && (
                  <div className="flex items-start gap-2">
                    <User className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <Typography variant="h6" className="mb-0.5">Pemilik</Typography>
                      <Muted className="text-sm">{item.owner}</Muted>
                    </div>
                  </div>
                )}
                {(item.rtRw || item.dusun) && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <Typography variant="h6" className="mb-0.5">Lokasi</Typography>
                      <Muted className="text-sm">{[item.rtRw, item.dusun].filter(Boolean).join(', ')}</Muted>
                    </div>
                  </div>
                )}
              </div>

              {item.features && item.features.length > 0 && (
                <section>
                  <Typography variant="h4" className="mb-3">Fitur & Keunggulan</Typography>
                  <ul className="space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <Muted className="text-sm">{f}</Muted>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {item.contact && (
                <section className="pt-4 border-t border-outline-variant">
                  <Typography variant="h4" className="mb-3">Kontak</Typography>
                  <div className="flex flex-wrap gap-2">
                    {item.contact.whatsapp && (
                      <Button asChild>
                        <a
                          href={`https://wa.me/${item.contact.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    )}
                    {item.contact.instagram && (
                      <Button asChild variant="outline">
                        <a
                          href={`https://instagram.com/${item.contact.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Instagram
                        </a>
                      </Button>
                    )}
                    {item.contact.tiktok && (
                      <Button asChild variant="outline">
                        <a
                          href={`https://tiktok.com/@${item.contact.tiktok}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Music className="w-4 h-4 mr-2" />
                          TikTok
                        </a>
                      </Button>
                    )}
                    {item.contact.marketplace && (
                      <span className="badge">{item.contact.marketplace}</span>
                    )}
                    {!item.contact.whatsapp && !item.contact.instagram && !item.contact.tiktok && !item.contact.marketplace && (
                      <span className="badge bg-surface-container-low text-on-surface-variant">Kontak via media sosial</span>
                    )}
                  </div>
                </section>
              )}
            </div>
          )}
        </article>
      </Container>
    </Section>
  )
}
