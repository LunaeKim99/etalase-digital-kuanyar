import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import StatCard from '@/components/cards/StatCard'
import ProductCard from '@/components/cards/ProductCard'
import TourismCard from '@/components/cards/TourismCard'
import GalleryItem from '@/components/cards/GalleryItem'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Lead } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  hero,
  stats,
  potentials,
  products,
  tourism,
  gallery,
  cta,
} from '@/data/homeData'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; href: string }
}

function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="badge mb-3 inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {eyebrow}
          </span>
        )}
        <Typography variant="h2" className="mb-3">
          {title}
        </Typography>
        {description && <Lead balance>{description}</Lead>}
      </div>
      {action && (
        <Button asChild variant="ghost" size="sm" className="group shrink-0">
          <Link to={action.href}>
            {action.label}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  )
}

function Home() {
  return (
    <>
      <HeroSection {...hero} />

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <SectionHeader
            eyebrow="Potensi Lokal"
            title="Potensi Unggulan"
            description="Sumber daya alam dan keterampilan warga yang menjadi kebanggaan Desa Kuanyar."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {potentials.map((potential, i) => (
              <Card
                key={potential.id}
                className="p-6 animate-fade-in"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <potential.icon className="w-6 h-6 text-primary" />
                </div>
                <Typography variant="h5" className="mb-2">
                  {potential.title}
                </Typography>
                <Muted>{potential.description}</Muted>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <SectionHeader
            eyebrow="Karya Warga"
            title="Produk Unggulan"
            description="Produk andalan UMKM Desa Kuanyar dengan kualitas dan cita rasa khas."
            action={{ label: 'Lihat Semua', href: '/produk' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <ProductCard {...product} slug={product.slug} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <SectionHeader
            eyebrow="Jelajah Alam"
            title="Wisata Unggulan"
            description="Destinasi alam dan budaya Desa Kuanyar yang menanti untuk dijelajahi."
            action={{ label: 'Lihat Semua', href: '/wisata' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourism.map((spot, i) => (
              <div
                key={spot.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <TourismCard {...spot} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <SectionHeader
            eyebrow="Dokumentasi"
            title="Galeri Desa"
            description="Momen, karya, dan keindahan Desa Kuanyar dalam satu bingkai."
            action={{ label: 'Lihat Galeri', href: '/galeri' }}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gallery.map((item, i) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <GalleryItem {...item} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="primary" className="animate-slide-up">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Typography variant="h2" className="text-white mb-4">
              {cta.title}
            </Typography>
            <Muted className="text-white/80 text-lg mb-8">{cta.subtitle}</Muted>
            <Button
              asChild
              variant="outline"
              className="text-white border-white hover:bg-white/10 hover:border-white hover:text-white"
            >
              <Link to={cta.buttonHref}>
                {cta.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Home
