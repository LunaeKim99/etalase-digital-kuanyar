import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 bg-hero-gradient text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <h1 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl leading-tight text-white mb-6 text-balance animate-slide-up">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl animate-slide-up">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3 animate-slide-up">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Link to={ctaPrimary.href}>{ctaPrimary.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm font-semibold"
            >
              <Link to={ctaSecondary.href}>{ctaSecondary.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
