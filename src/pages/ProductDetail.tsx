import { Link, useParams } from 'react-router-dom'
import { useProduct } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography, Text } from '@/components/ui/typography'
import { ArrowLeft, MapPin, Store, MessageCircle, Package, Share2 } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const productId = parseInt(id || '0')
  const { data: product, isLoading } = useProduct(productId)
  const [copied, setCopied] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Typography variant="h3" className="mb-2">Produk Tidak Ditemukan</Typography>
          <Button asChild variant="outline">
            <Link to="/potensi">Kembali ke Potensi Desa</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Note: In a real implementation, we'd fetch the UMKM info from the API
  // For now, we'll use placeholder data
  const umkmName = 'UMKM Terkait'
  const umkmAddress = 'Desa Kuanyar, Kec. Mayong'
  const umkmMessageCircle = '6281234567890'

  const MessageCircleUrl = `https://wa.me/${umkmMessageCircle}?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}%20dengan%20harga%20${formatRupiah(product.price)}.`

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      alert('Salin link gagal')
    }
  }

  return (
    <>
      <Section className="pt-16 pb-8">
        <Container>
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/potensi">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-xl shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-surface-container rounded-xl flex items-center justify-center">
                    <Package className="w-24 h-24 text-on-surface-variant" />
                  </div>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" onClick={handleShare} className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" /> Bagikan
                    {copied && <span className="ml-2 text-primary text-xs">Tersalin!</span>}
                  </Button>
                  <a
                    href={MessageCircleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-primary text-on-primary hover:bg-primary/90">
                      <MessageCircle className="w-4 h-4 mr-2" /> Pesan via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <header>
                  <Typography variant="h1" className="mb-2">
                    {product.name}
                  </Typography>
                  <Typography variant="h4" className="text-primary font-medium mb-4">
                    {formatRupiah(product.price)}
                  </Typography>
                  <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.status === 'active' ? 'bg-primary-container text-on-primary-container' :
                      product.status === 'draft' ? 'bg-surface-container-high text-on-surface-variant' :
                      'bg-error-container text-on-error-container'
                    }`}>
                      {product.status}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      Stok: {product.stock}
                    </span>
                  </div>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card variant="filled" className="p-6">
                    <Typography variant="h4" className="mb-4">Deskripsi Produk</Typography>
                    <Text className="text-on-surface-variant leading-relaxed">
                      {product.description || 'Belum ada deskripsi produk'}
                    </Text>
                  </Card>

                  <Card variant="filled" className="p-6">
                    <Typography variant="h4" className="mb-4">Informasi Penjual</Typography>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Store className="w-5 h-5 text-primary" />
                        <div>
                          <Typography variant="h6" className="mb-1">UMKM</Typography>
                          <Text className="text-on-surface-variant">{umkmName}</Text>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <Typography variant="h6" className="mb-1">Alamat</Typography>
                          <Text className="text-on-surface-variant">{umkmAddress}</Text>
                        </div>
                      </div>
                      <a
                        href={MessageCircleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <div>
                          <Typography variant="h6" className="mb-1">WhatsApp</Typography>
                          <Text className="text-on-surface-variant">{umkmMessageCircle}</Text>
                        </div>
                      </a>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
