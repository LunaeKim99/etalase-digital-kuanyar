import { Calendar, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useEvents } from '@/services/api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function isOngoing(e: { date: string; endDate?: string }) {
  const now = new Date()
  const start = new Date(e.date)
  const end = e.endDate ? new Date(e.endDate) : start
  return now >= start && now <= end
}

function Event() {
  const { data: events, isLoading, isError } = useEvents()

  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20 pb-12">
        <Container>
          <Typography variant="h1" className="text-white">
            Event Desa
          </Typography>
          <Muted className="text-white/80">
            Berita dan acara terbaru yang sedang berlangsung di Desa Kuanyar.
          </Muted>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-40 bg-surface-hover rounded-t-xl" />
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
          ) : events && events.length === 0 ? (
            <div className="text-center py-12">
              <Muted>Belum ada event yang ditampilkan.</Muted>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events?.map((e) => (
                <Card key={e.id} className="overflow-hidden">
                  {e.image ? (
                    <img src={e.image} alt={e.name} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-surface flex items-center justify-center">
                      <Muted>Gambar tidak tersedia</Muted>
                    </div>
                  )}
                  <CardContent className="p-4 space-y-3">
                    <span className={isOngoing(e) ? 'badge badge-accent' : 'badge'}>
                      {isOngoing(e) ? 'Berlangsung' : 'Event'}
                    </span>
                    <Typography variant="h5">{e.name}</Typography>
                    <Muted className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(e.date)}
                      {e.endDate && ' - ' + formatDate(e.endDate)}
                    </Muted>
                    <Muted className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {e.location}
                    </Muted>
                    <Text className="text-sm line-clamp-2">{e.description}</Text>
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
            Butuh informasi lebih lanjut? Hubungi kami.
          </Muted>
          <Button variant="ghost" asChild>
            <Link to="/kontak">Hubungi Kami</Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}

export default Event
