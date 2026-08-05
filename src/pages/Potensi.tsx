import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import PotensiCard from '@/components/cards/PotensiCard'
import { categories, categoryItems } from '@/data/potensiData'

function Potensi() {
  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h1" className="text-white">
            Potensi Desa Kuanyar
          </Typography>
          <Muted className="text-white/80 text-lg mt-4">
            Kekayaan alam, kerajinan, wisata, dan budaya yang menjadi kebanggaan Desa Kuanyar.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="mb-10">
            Kategori Potensi
          </Typography>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <PotensiCard
                key={c.slug}
                slug={c.slug}
                title={c.title}
                description={c.description}
                iconName={c.icon}
                color={c.color}
                lightColor={c.lightColor}
                count={(categoryItems[c.slug] ?? []).length}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h3">Butuh Informasi Potensi?</Typography>
          <Muted className="mt-2">
            Tim kami siap membantu Anda mendapatkan informasi lebih lanjut tentang potensi desa.
          </Muted>
          <Button variant="ghost" asChild className="mt-6">
            <Link to="/kontak">Hubungi Kami</Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}

export default Potensi
