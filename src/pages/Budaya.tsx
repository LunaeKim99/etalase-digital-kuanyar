import { Calendar } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useCultures } from '@/services/api'

function Budaya() {
  const { data: cultures, isLoading, isError } = useCultures()

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            Budaya & Tradisi
          </Typography>
          <Muted className="text-white/80">
            Warisan budaya dan tradisi yang dijaga Desa Kuanyar.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-44 bg-surface-hover rounded-t-xl" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-surface-hover rounded" />
                    <div className="h-4 bg-surface-hover rounded" />
                    <div className="h-4 bg-surface-hover rounded" />
                  </CardContent>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <Muted>Gagal memuat data.</Muted>
            </div>
          ) : cultures && cultures.length === 0 ? (
            <div className="text-center py-12">
              <Muted>Belum ada budaya yang ditampilkan.</Muted>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cultures?.map((c) => (
                <Card key={c.id} className="overflow-hidden">
                  {c.image ? (
                    <img src={c.image} alt={c.name} className="w-full h-44 object-cover" />
                  ) : (
                    <div className="w-full h-44 bg-surface flex items-center justify-center">
                      <Muted>Gambar tidak tersedia</Muted>
                    </div>
                  )}
                  <CardContent className="p-4 space-y-3">
                    <span className="badge">{c.category}</span>
                    <Typography variant="h5">{c.name}</Typography>
                    <Muted className="text-sm">{c.description}</Muted>
                    {c.schedule && (
                      <Muted className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {c.schedule}
                      </Muted>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section variant="gray" className="text-center">
        <Container>
          <Muted className="mb-4">
            Ingin tahu lebih banyak? Hubungi kami.
          </Muted>
          <Button variant="ghost" asChild>
            <Link to="/kontak">Hubungi Kami</Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}

export default Budaya
