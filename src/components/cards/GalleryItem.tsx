import { Typography } from '@/components/ui/typography'

interface GalleryItemProps {
  image: string
  title?: string
}

export default function GalleryItem({ image, title }: GalleryItemProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg group">
      <img
        src={image}
        alt={title ?? ''}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <Typography variant="h6" className="text-white">
            {title}
          </Typography>
        </div>
      )}
    </div>
  )
}
