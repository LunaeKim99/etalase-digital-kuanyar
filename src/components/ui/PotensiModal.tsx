import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  Check,
  MessageSquare,
  ExternalLink,
  Music,
  User,
  MapPin,
  Calendar,
  Package,
  Wheat,
} from 'lucide-react'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import LazyImage from '@/components/ui/LazyImage'
import type { PotensiItem, PotensiCategoryMeta } from '@/data/potensiData'

interface PotensiModalProps {
  item: PotensiItem | null
  categoryMeta: PotensiCategoryMeta | null
  isOpen: boolean
  onClose: () => void
}

export default function PotensiModal({ item, categoryMeta, isOpen, onClose }: PotensiModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousActiveElement.current = document.activeElement as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    setTimeout(() => modalRef.current?.focus(), 0)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousActiveElement.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen || !item || !categoryMeta) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  const isSector = item.isSector === true

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="potensi-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-background rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm">
          <Typography variant="h6" className="text-text-muted">Potensi Desa Kuanyar</Typography>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSector ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${categoryMeta.lightColor} flex items-center justify-center`}>
                <Wheat className={`w-6 h-6 ${categoryMeta.color.replace('bg-', 'text-')}`} />
              </div>
              <span className={`badge ${categoryMeta.lightColor} ${categoryMeta.color.replace('bg-', 'text-')}`}>
                {categoryMeta.title}
              </span>
            </div>

            <Typography id="potensi-modal-title" variant="h2">{item.name}</Typography>
            <Muted className="leading-relaxed">{item.description}</Muted>

            {item.sectorData && (
              <>
                <section>
                  <Typography variant="h4" className="mb-3">Komoditas Unggulan</Typography>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {item.sectorData.komoditas.map((k) => (
                      <div key={k.nama} className="bg-surface p-4 rounded-lg">
                        <Typography variant="h5" className="mb-1">{k.nama}</Typography>
                        <Muted className="text-sm">{k.deskripsi}</Muted>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <Typography variant="h4" className="mb-3">Musim Tanam</Typography>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                      <thead className="bg-surface">
                        <tr className="text-left text-text-muted">
                          <th className="px-4 py-2 font-medium">Musim</th>
                          <th className="px-4 py-2 font-medium">Lahan Aktif</th>
                          <th className="px-4 py-2 font-medium">Lahan Kosong</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.sectorData.musimTanam.map((m) => (
                          <tr key={m.musim} className="border-t border-border">
                            <td className="px-4 py-2 font-medium">{m.musim}</td>
                            <td className="px-4 py-2">{m.lahanAktif}</td>
                            <td className="px-4 py-2">{m.lahanKosong}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <Typography variant="h4" className="mb-3">Kelompok Tani</Typography>
                  <div className="flex flex-wrap gap-2">
                    {item.sectorData.kelompokTani.map((k) => (
                      <span key={k} className="badge">{k}</span>
                    ))}
                  </div>
                </section>

                <section className="bg-primary/5 p-4 rounded-lg">
                  <Typography variant="h5" className="mb-2">Modernisasi</Typography>
                  <Muted className="text-sm leading-relaxed">{item.sectorData.modernisasi}</Muted>
                </section>

                <section className="bg-primary/5 p-4 rounded-lg">
                  <Typography variant="h5" className="mb-2">Pemasaran</Typography>
                  <Muted className="text-sm leading-relaxed">{item.sectorData.pemasaran}</Muted>
                </section>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className="relative aspect-[16/9] bg-surface overflow-hidden">
              <LazyImage
                src={item.image}
                alt={item.name}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`badge ${categoryMeta.lightColor} ${categoryMeta.color.replace('bg-', 'text-')}`}>
                  {categoryMeta.title}
                </span>
                {item.yearFounded && (
                  <span className="text-sm text-text-muted flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Berdiri {item.yearFounded}
                  </span>
                )}
                {item.capacity && (
                  <span className="text-sm text-text-muted flex items-center gap-1">
                    <Package className="w-4 h-4" /> {item.capacity}
                  </span>
                )}
              </div>

              <Typography id="potensi-modal-title" variant="h2">{item.name}</Typography>
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
                <section className="pt-4 border-t border-border">
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
                      <span className="badge bg-surface text-text-muted">Kontak via media sosial</span>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
