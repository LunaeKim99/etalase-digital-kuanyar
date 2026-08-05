import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useArticle } from '@/services/api'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import QRCode from '@/components/ui/QRCode'
import { formatDate } from '@/lib/utils'

function BeritaDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: item, isLoading, isError } = useArticle(slug ?? '')

  if (isLoading) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="animate-pulse">
              <div className="w-full aspect-square bg-surface-hover rounded-xl" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-6 bg-surface-hover rounded w-1/4" />
              <div className="h-4 bg-surface-hover rounded w-1/2" />
              <div className="h-4 bg-surface-hover rounded w-3/4" />
              <div className="h-4 bg-surface-hover rounded w-full" />
              <div className="h-10 bg-surface-hover rounded w-1/3 mt-4" />
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  if (isError || !item) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h2" className="mb-4">
            Artikel Tidak Ditemukan
          </Typography>
          <Button variant="outline" asChild>
            <Link to="/berita">Kembali ke Berita</Link>
          </Button>
        </Container>
      </Section>
    )
  }

  const contentParagraphs = item.content.split('\n\n').filter(Boolean)

  return (
    <>
      <Section className="pt-28">
        <Container>
          <Link
            to="/berita"
            className="text-text-muted hover:text-text text-sm flex items-center gap-1 mb-6 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </Link>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div>
              {item.cover ? (
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-square bg-surface rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="md:col-span-2 space-y-4">
              <span className="badge">{item.category}</span>
              <Typography variant="h1">{item.title}</Typography>
              <Text className="text-text-muted italic mt-2">{item.excerpt}</Text>
              <div className="flex flex-wrap gap-2 mt-4">
                <WhatsAppButton
                  phone="6281234567890"
                  message={`Halo, saya tertarik dengan artikel "${item.title}".`}
                  size="sm"
                />
                <QRCode
                  value={`https://etalase-kuanyar.vercel.app/berita/${item.slug}`}
                  size={112}
                  label="Scan untuk share"
                />
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-text-muted mt-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.date)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {item.author}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container size="lg" className="max-w-3xl mx-auto">
          <Card className="p-6">
            <Typography variant="h2" className="mb-6">
              Isi Artikel
            </Typography>
            {contentParagraphs.map((p, i) => (
              <Text key={i} className="mb-4 text-text-muted">
                {p}
              </Text>
            ))}
          </Card>
          <Card className="p-4 border-t mt-6">
            <Muted className="flex items-center gap-2">
              <span>Ditulis oleh {item.author} &bull; {formatDate(item.date)}</span>
            </Muted>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default BeritaDetail