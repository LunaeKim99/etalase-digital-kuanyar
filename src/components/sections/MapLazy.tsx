import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const VillageMap = lazy(() => import('@/components/sections/VillageMap'))

interface MapLazyProps {
  villageName?: string
  contactInfo?: string
}

export default function MapLazy({ villageName, contactInfo }: MapLazyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-96 w-full">
      {shouldLoad ? (
        <Suspense fallback={<LoadingSkeleton variant="image" className="h-96 w-full" />}>
          <VillageMap villageName={villageName} contactInfo={contactInfo} />
        </Suspense>
      ) : (
        <LoadingSkeleton variant="image" className="h-96 w-full" />
      )}
    </div>
  )
}
