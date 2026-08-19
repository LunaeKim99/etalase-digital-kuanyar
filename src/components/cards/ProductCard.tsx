import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'

interface ProductCardProps {
  image: string
  name: string
  price: string
  unit: string
  slug?: string
}

export default function ProductCard({ image, name, price, unit, slug }: ProductCardProps) {
  return (
    <Card variant="filled" className="overflow-hidden">
      <div className="aspect-video bg-surface-container-low overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4 space-y-2">
        <Typography variant="h5">{name}</Typography>
        <div>
          <span className="text-lg font-medium text-primary">{price}</span>{' '}
          <Muted className="text-xs inline">{unit}</Muted>
        </div>
        {slug ? (
          <Button variant="outlined" className="w-full mt-3" asChild>
            <Link to={`/produk/${slug}`}>Lihat Detail</Link>
          </Button>
        ) : (
          <Button variant="outlined" className="w-full mt-3" disabled>
            Lihat Detail
          </Button>
        )}
      </div>
    </Card>
  )
}
