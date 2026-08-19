import type { ReactNode } from 'react'
import { Container } from '@/components/ui/container'
import { Typography, Text } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  size?: 'default' | 'compact'
  animated?: boolean
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  size = 'default',
  animated = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-hero-gradient text-white',
        size === 'compact'
          ? 'pt-28 md:pt-36 pb-12 md:pb-16'
          : 'pt-28 md:pt-36 pb-16 md:pb-24',
        className
      )}
    >
      <HeroBlobs />

      <Container className="relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <span
              className={cn(
                'inline-block text-sm font-medium uppercase tracking-wider text-white/80 mb-3',
                animated && 'animate-slide-up'
              )}
            >
              {eyebrow}
            </span>
          )}
          <Typography
            variant="h1"
            className={cn(
              'mb-4 text-white font-heading font-medium',
              animated && 'animate-slide-up'
            )}
          >
            {title}
          </Typography>
          {subtitle && (
            <Text
              className={cn(
                'text-lg md:text-xl text-white/85 mb-8 max-w-2xl',
                animated && 'animate-slide-up'
              )}
            >
              {subtitle}
            </Text>
          )}
          {children && (
            <div
              className={cn(
                'flex flex-wrap gap-4',
                animated && 'animate-slide-up'
              )}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export function HeroBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
    </div>
  )
}
