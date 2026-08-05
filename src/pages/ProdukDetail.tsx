import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Store } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useProduct } from '@/services/api'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import QRCode from '@/components/ui/QRCode'
import { formatRupiah } from '@/services/api'

const WA_TEMP = '6281234567890'

function ProdukDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, isError } = useProduct(slug ?? '')

  if (isLoading) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="animate-pulse">
              <div className="w-full aspect-square bg-surface-hover rounded-xl" />
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-surface-hover rounded w-1/4" />
              <div className="h-4 bg-surface-hover rounded w-1/2" />
              <div className="h-4 bg-surface-hover rounded w-3/4" />
              <div className="h-4 bg-surface-hover rounded w-full" />
              <div className="h-4 bg-surface-hover rounded w-2/3" />
              <div className="h-6 bg-surface-hover rounded w-1/3 mt-4" />
              <div className="h-10 bg-surface-hover rounded w-1/4 mt-6" />
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  if (isError || !product) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h2" className="mb-4">
            Produk Tidak Ditemukan
          </Typography>
          <Muted className="mb-6">Produk yang Anda cari tidak tersedia.</Muted>
          <Button variant="outline" asChild>
            <Link to="/produk">Kembali ke Produk</Link>
          </Button>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Section className="pt-28 animate-slide-up">
        <Container>
          <Link to="/produk" className="text-text-muted hover:text-text text-sm flex items-center gap-1 mb-6 inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Produk
          </Link>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-square bg-surface rounded-xl flex items-center justify-center">
                  <Store className="w-16 h-16 text-text-light" />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <span className="badge">{product.category}</span>
              <Typography variant="h1">{product.name}</Typography>
              <Text>{product.description}</Text>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl font-bold text-primary">{formatRupiah(product.price)}</span>
                <Muted className="text-lg">{product.unit}</Muted>
              </div>
              <div className="mt-2">
                <span className={product.stock > 0 ? 'badge-success' : 'badge-error'}>
                  Stok {product.stock > 0 ? product.stock : 'Habis'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <WhatsAppButton
                  phone={WA_TEMP}
                  message={`Halo, saya tertarik dengan produk ${product.name} (${formatRupiah(product.price)}) di Etalase Digital Desa Kuanyar.`}
                />
                <QRCode
                  value={`Produk: ${product.name} - ${product.umkmName}`}
                  size={120}
                  label="Scan detail produk"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <Card className="p-6 text-text-muted flex flex-wrap justify-between items-center gap-4">
            <span>Dikelola oleh {product.umkmName}</span>
            <Link
              to={`/umkm/${product.umkmSlug}`}
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              Lihat UMKM
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default ProdukDetail
