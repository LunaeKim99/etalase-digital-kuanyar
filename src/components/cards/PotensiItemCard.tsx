import { Wheat, ArrowRight, ShoppingBag, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Text, Typography, Muted } from '@/components/ui/typography'
import LazyImage from '@/components/ui/LazyImage'
import type { PotensiItem, PotensiCategoryMeta } from '@/data/potensiData'
import { cn } from '@/lib/utils'

interface PotensiItemCardProps {
  item: PotensiItem
  categoryMeta: PotensiCategoryMeta
  onClick: (item: PotensiItem) => void
  variant?: 'default' | 'sector'
}

const iconMap: Record<string, LucideIcon> = {
  Shirt: ShoppingBag,
  UtensilsCrossed: Utensils,
  Wheat,
}

export default function PotensiItemCard({
  item,
  categoryMeta,
  onClick,
  variant = 'default',
}: PotensiItemCardProps) {
  const Icon = iconMap[categoryMeta.icon] ?? Wheat

  const handleClick = () => onClick(item)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick(item)
    }
  }

  if (variant === 'sector' || item.isSector) {
    return (
      <Card
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="cursor-pointer group p-6 hover:shadow-lg transition-all"
        aria-label={`Lihat detail ${item.name}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center shrink-0', categoryMeta.color)}>
            <Icon className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <span className={cn('badge mb-2', categoryMeta.color)}>
              {categoryMeta.title}
            </span>
            <Typography variant="h3" className="mb-1 group-hover:text-primary transition-colors">
              {item.name}
            </Typography>
          </div>
        </div>

        <Muted className="mb-4 leading-relaxed">{item.description}</Muted>

        {item.images.length > 0 && (
          <div className="flex gap-3 mb-4 overflow-x-auto">
            {item.images.map((src) => (
              <div key={src} className="shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-surface border border-border">
                <img src={src} alt={item.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {item.sectorData && (
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-surface-container p-3 rounded-lg">
              <Typography variant="h6" className="mb-1">Komoditas</Typography>
              <Muted className="text-sm">
                {item.sectorData.komoditas.map((k) => k.nama).join(', ')}
              </Muted>
            </div>
            <div className="bg-surface-container p-3 rounded-lg">
              <Typography variant="h6" className="mb-1">Musim Tanam</Typography>
              <Muted className="text-sm">
                {item.sectorData.musimTanam.map((m) => `${m.musim}: ${m.lahanAktif}`).join(' · ')}
              </Muted>
            </div>
            <div className="bg-surface-container p-3 rounded-lg">
              <Typography variant="h6" className="mb-1">Kelompok Tani</Typography>
              <Muted className="text-sm">{item.sectorData.kelompokTani.length} kelompok</Muted>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 text-primary font-medium text-sm">
          Lihat Detail <ArrowRight className="w-4 h-4" />
        </div>
      </Card>
    )
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer group h-full overflow-hidden hover:shadow-lg hover:border-primary transition-all"
      aria-label={`Lihat detail ${item.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <LazyImage
          src={item.images[0]}
          alt={item.name}
          width={600}
          height={400}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <span className={cn('absolute top-3 left-3 badge', categoryMeta.color)}>
          {categoryMeta.title}
        </span>
      </div>

      <div className="p-5 space-y-2">
        <Typography variant="h5" className="group-hover:text-primary transition-colors line-clamp-1">
          {item.name}
        </Typography>
        {item.owner && <Muted className="text-sm">{item.owner}</Muted>}
        {(item.rtRw || item.dusun) && (
          <Muted className="text-xs">{[item.rtRw, item.dusun].filter(Boolean).join(' · ')}</Muted>
        )}
        <Text className="text-sm text-text-muted line-clamp-2 mt-2">{item.description}</Text>

        {item.features && item.features.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {item.features.slice(0, 3).map((f) => (
              <span key={f} className="badge text-xs">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
