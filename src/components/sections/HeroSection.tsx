import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Typography, Text } from '@/components/ui/typography'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-primary-container via-background to-surface-container-low">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Typography variant="h1" className="mb-4">
              {title}
            </Typography>
            <Text className="mb-8">{subtitle}</Text>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to={ctaPrimary.href}>{ctaPrimary.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={ctaSecondary.href}>{ctaSecondary.label}</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full aspect-square lg:aspect-[4/3]">
            <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-20 bg-primary-container top-6 left-6" />
            <div className="absolute w-48 h-48 rounded-full blur-3xl opacity-15 bg-tertiary-container bottom-10 right-8" />
            <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-15 bg-secondary-container top-1/2 left-1/3" />
          </div>
        </div>
      </Container>
    </section>
  )
}
