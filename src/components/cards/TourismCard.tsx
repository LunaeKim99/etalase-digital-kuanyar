import { MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'

interface TourismCardProps {
  image: string
  name: string
  location: string
}

export default function TourismCard({ image, name, location }: TourismCardProps) {
  return (
    <Card variant="elevated" className="overflow-hidden relative p-0">
      <img src={image} alt={name} className="w-full h-48 object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-scrim/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Typography variant="h5" className="text-white mb-1">
          {name}
        </Typography>
        <Muted className="text-white/80 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {location}
        </Muted>
      </div>
    </Card>
  )
}
