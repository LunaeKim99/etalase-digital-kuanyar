import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGallery } from '@/services/api'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import QRCode from '@/components/ui/QRCode'
import { formatDate } from '@/lib/utils'

function GaleriDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: item, isLoading, isError } = useGallery(parseInt(id ?? '0'))

  if (isLoading) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container>
          <Card className="overflow-hidden animate-pulse">
            <div className="h-40 bg-surface-hover" />
            <CardContent className="p-4 space-y-2">
              <div className="h-4 bg-surface-hover rounded w-3/4" />
              <div className="h-3 bg-surface-hover rounded w-1/2" />
            </CardContent>
          </Card>
        </Container>
      </Section>
    )
  }

  if (isError || !item) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h2" className="mb-4">
            Item Tidak Ditemukan
          </Typography>
          <Button variant="outline" asChild>
            <Link to="/galeri">Kembali ke Galeri</Link>
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
            to="/galeri"
            className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-6 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Galeri
          </Link>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {item.type === 'foto' ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="relative aspect-square bg-surface rounded-xl flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="badge bg-white/20 text-white">{item.type === 'foto' ? 'Foto' : 'Video'}</span>
              <Typography variant="h1" className="text-white mt-2">
                {item.title}
              </Typography>
              <Typography variant="h3" className="text-white/80 mt-2">
                {item.category}
              </Typography>
              <Muted className="text-white/80 flex items-center gap-2 mt-4">
                <Clock className="w-4 h-4" />
                {formatDate(item.createdAt)}
              </Muted>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <Card className="p-6 text-center">
            <WhatsAppButton
              phone="6281234567890"
              message={`Lihat galeri ${item.title} di Etalase Digital Desa Kuanyar.`}
            />
            <QRCode
              value={`https://etalase-kuanyar.vercel.app/galeri/${item.id}`}
              size={120}
              label="Scan untuk share"
            />
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default GaleriDetail