import { useParams, Link } from 'react-router-dom'
import { Store, Wheat, TreePine, Sprout, Fish, Hammer, Camera, Music, ArrowLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { categories, categoryItems } from '@/data/potensiData'

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

function PotensiCategory() {
  const { slug } = useParams<{ slug: string }>()
  const category = categories.find((c) => c.slug === slug)
  const items = category ? (categoryItems[category.slug] ?? []) : []
  const Icon = category ? (iconMap[category.icon] ?? Store) : null

  if (!category) {
    return (
      <Section className="pt-28">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h2">Kategori Tidak Ditemukan</Typography>
          <Muted className="mt-2">Kategori potensi yang Anda cari tidak tersedia.</Muted>
          <Button variant="outline" className="mt-6" asChild>
            <Link to="/potensi">Kembali ke Potensi</Link>
          </Button>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Link
            to="/potensi"
            className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Potensi
          </Link>
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl ${category.lightColor} flex items-center justify-center`}
            >
              {Icon && <Icon className={`w-7 h-7 ${category.color.replace('bg-', 'text-')}`} />}
            </div>
            <div>
              <Typography variant="h1" className="text-white">
                {category.title}
              </Typography>
              <span className="badge mt-2">{items.length} item</span>
            </div>
          </div>
          <Muted className="text-white/80 text-lg mt-4 max-w-2xl">
            {category.description}
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <Typography variant="h5">{item.name}</Typography>
                <Muted className="mt-2">{item.description}</Muted>
                {item.features && (
                  <ul className="flex flex-wrap gap-2 mt-4">
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <span className="badge">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mt-4"
                  />
                ) : (
                  <div className="w-full h-40 rounded-lg bg-surface border border-dashed border-border flex items-center justify-center mt-4">
                    <Muted>Ilustrasi {item.name}</Muted>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container className="text-center">
          <Button variant="outline" asChild>
            <Link to="/potensi" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Semua Kategori
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}

export default PotensiCategory
