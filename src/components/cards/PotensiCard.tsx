import { Link } from 'react-router-dom'
import { Store, Wheat, TreePine, Sprout, Fish, Hammer, Camera, Music, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'

interface PotensiCardProps {
  slug: string
  title: string
  description: string
  iconName: string
  color: string
  lightColor: string
  count: number
}

const iconMap: Record<string, LucideIcon> = {
  Store,
  Wheat,
  TreePine,
  Sprout,
  Fish,
  Hammer,
  Camera,
  Music,
}

export default function PotensiCard({
  slug,
  title,
  description,
  iconName,
  color,
  lightColor,
  count,
}: PotensiCardProps) {
  const Icon = iconMap[iconName] ?? Store

  return (
    <Link to={`/potensi/${slug}`} className="block group">
      <Card className="p-6 flex-col h-full group-hover:border-primary group-hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${lightColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <span className="badge">{count} item</span>
        </div>
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Muted className="mb-4 flex-1">{description}</Muted>
        <div className="flex items-center gap-1 text-text-light group-hover:text-primary transition-colors">
          <span className="text-sm font-medium">Lihat Potensi</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </Card>
    </Link>
  )
}