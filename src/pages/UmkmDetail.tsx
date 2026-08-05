import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Store } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUmkm, useUmkmProducts } from '@/services/api'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import QRCode from '@/components/ui/QRCode'
import { formatRupiah } from '@/services/api'

function UmkmDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: umkm, isLoading, isError } = useUmkm(slug ?? '')
  const { data: products } = useUmkmProducts(slug ?? '')

  if (isLoading) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="animate-pulse">
              <div className="w-full aspect-square bg-surface-hover rounded-xl" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-6 bg-surface-hover rounded w-1/4" />
              <div className="h-4 bg-surface-hover rounded w-1/2" />
              <div className="h-4 bg-surface-hover rounded w-3/4" />
              <div className="h-4 bg-surface-hover rounded w-full" />
              <div className="h-4 bg-surface-hover rounded w-full" />
              <div className="h-4 bg-surface-hover rounded w-2/3" />
              <div className="h-10 bg-surface-hover rounded w-1/3 mt-4" />
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  if (isError || !umkm) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h2" className="mb-4">
            UMKM Tidak Ditemukan
          </Typography>
          <Muted className="mb-6">UMKM yang Anda cari tidak tersedia.</Muted>
          <Button variant="outline" asChild>
            <Link to="/umkm">Kembali ke Daftar</Link>
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
            to="/umkm"
            className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-6 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke UMKM
          </Link>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              {umkm.image ? (
                <img
                  src={umkm.image}
                  alt={umkm.name}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-square bg-white/10 rounded-xl flex items-center justify-center">
                  <Store className="w-16 h-16 text-white/50" />
                </div>
              )}
            </div>
            <div className="md:col-span-2 space-y-4">
              <span className="badge bg-white/20 text-white">{umkm.category}</span>
              <Typography variant="h1" className="text-white">
                {umkm.name}
              </Typography>
              <Muted className="text-white/80">Pemilik: {umkm.owner}</Muted>
              <Muted className="text-white/80 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {umkm.address}
              </Muted>
              <Text className="text-white/90">{umkm.description}</Text>
              <div className="flex flex-wrap gap-3 mt-6">
                <WhatsAppButton
                  phone={umkm.phone}
                  message={`Halo, saya tertarik dengan UMKM ${umkm.name} di Desa Kuanyar.`}
                />
                <QRCode value={`https://wa.me/${umkm.phone}`} size={120} label="Scan QR kontak" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="mb-8">
            Produk {umkm.name}
          </Typography>
          {products && products.length === 0 ? (
            <Muted className="text-center py-12">Belum ada produk terdaftar.</Muted>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((p) => (
                <Link key={p.id} to={`/produk/${p.slug}`} className="block group">
                  <Card className="p-4">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-40 w-full object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="h-40 w-full bg-surface rounded-lg mb-3 flex items-center justify-center">
                        <Muted>Gambar tidak tersedia</Muted>
                      </div>
                    )}
                    <Typography variant="h6">{p.name}</Typography>
                    <span className="text-lg font-bold text-primary">{formatRupiah(p.price)}</span>
                    <Muted className="text-sm inline-block mt-1">{p.unit}</Muted>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default UmkmDetail