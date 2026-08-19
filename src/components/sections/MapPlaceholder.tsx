import { MapPin } from 'lucide-react'
import { Muted, Typography } from '@/components/ui/typography'

interface MapPlaceholderProps {
  title?: string
  description?: string
}

export default function MapPlaceholder({
  title = 'Peta Desa Kuanyar',
  description = 'Peta interaktif (Leaflet) akan ditampilkan di sini.',
}: MapPlaceholderProps) {
  return (
    <div className="aspect-video rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <span className="badge mb-3">Segera Hadir</span>
      <MapPin className="w-12 h-12 text-on-surface-variant mb-3" />
      <Typography variant="h5" className="mb-1">
        {title}
      </Typography>
      <Muted>{description}</Muted>
    </div>
  )
}
