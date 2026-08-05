import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

export default function LazyImage({ src, alt, className, width, height, loading = 'lazy' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn('bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted', className)}
        style={width && height ? { aspectRatio: width / height } : undefined}
      >
        Gambar tidak tersedia
      </div>
    )
  }

  return (
    <>
      {!loaded && (
        <div
          className={cn('bg-surface animate-pulse rounded-lg', className)}
        style={width && height ? { aspectRatio: width / height } : undefined}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn('transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0', className)}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading={loading}
        width={width}
        height={height}
      />
    </>
  )
}
