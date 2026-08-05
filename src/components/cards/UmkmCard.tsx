import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, Store } from 'lucide-react'
import { Typography, Muted } from '@/components/ui/typography'
import type { Umkm } from '@/types/catalog'

interface UmkmCardProps {
  umkm: Umkm
}

export default function UmkmCard({ umkm }: UmkmCardProps) {
  return (
    <Link
      to={`/umkm/${umkm.slug}`}
      className="card overflow-hidden group h-full flex flex-col"
    >
      {umkm.image ? (
        <img src={umkm.image} alt={umkm.name} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-surface flex items-center justify-center">
          <Store className="w-10 h-10 text-text-light" />
        </div>
      )}
      <div className="p-4 flex-1">
        <span className="badge mb-2">{umkm.category}</span>
        <Typography variant="h5" className="mb-1">
          {umkm.name}
        </Typography>
        <Muted className="mb-2">{umkm.owner}</Muted>
        <Muted className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{umkm.address}</span>
        </Muted>
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <span className="text-sm text-text-muted">Lihat Detail</span>
        <ChevronRight className="w-4 h-4 text-text-muted transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
