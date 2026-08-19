import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  count?: number
  variant?: 'card' | 'list' | 'text' | 'image'
}

export function LoadingSkeleton({ className, count = 1, variant = 'card' }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            variant === 'card' && 'card overflow-hidden animate-pulse',
            variant === 'list' && 'flex gap-4 animate-pulse',
            variant === 'text' && 'space-y-3 animate-pulse',
            variant === 'image' && 'aspect-video animate-pulse',
            className
          )}
        >
          {variant === 'card' && (
            <>
              <div className="h-48 bg-surface-container-highest" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-surface-container-highest rounded w-3/4" />
                <div className="h-4 bg-surface-container-highest rounded w-1/2" />
                <div className="h-3 bg-surface-container-highest rounded w-full" />
              </div>
            </>
          )}
          {variant === 'list' && (
            <>
              <div className="w-16 h-16 bg-surface-container-highest rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-container-highest rounded w-3/4" />
                <div className="h-3 bg-surface-container-highest rounded w-1/2" />
              </div>
            </>
          )}
          {variant === 'text' && (
            <>
              <div className="h-4 bg-surface-container-highest rounded w-full" />
              <div className="h-4 bg-surface-container-highest rounded w-5/6" />
              <div className="h-4 bg-surface-container-highest rounded w-4/6" />
            </>
          )}
          {variant === 'image' && <div className="w-full h-full bg-surface-container-highest" />}
        </div>
      ))}
    </>
  )
}
