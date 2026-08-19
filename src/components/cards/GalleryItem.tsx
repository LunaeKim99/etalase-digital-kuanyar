import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

interface GalleryItemProps {
  image: string
  title?: string
}

export default function GalleryItem({ image, title }: GalleryItemProps) {
  return (
    <Card variant="elevated" className="relative aspect-square overflow-hidden group p-0">
      <img
        src={image}
        alt={title ?? ''}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 group-hover:bg-scrim/40 transition-colors" />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-scrim/60 to-transparent">
          <Typography variant="h6" className="text-white">
            {title}
          </Typography>
        </div>
      )}
    </Card>
  )
}
