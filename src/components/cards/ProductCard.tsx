import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
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
    <div className="card overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" loading="lazy" />
      <div className="p-4">
        <Typography variant="h5" className="mb-1">
          {name}
        </Typography>
        <span className="text-xl font-bold text-primary">{price}</span>{' '}
        <Muted className="text-xs inline">{unit}</Muted>
        {slug ? (
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link to={`/produk/${slug}`}>Lihat Detail</Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full mt-4" disabled>
            Lihat Detail
          </Button>
        )}
      </div>
    </div>
  )
}
