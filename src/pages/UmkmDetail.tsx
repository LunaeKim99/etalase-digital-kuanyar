import { Link, useParams } from 'react-router-dom'
import { useUmkm, useUmkmProducts } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { ArrowLeft, MapPin, Store, Package } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

export default function UmkmDetail() {
  const { id } = useParams<{ id: string }>()
  const umkmId = parseInt(id || '0')
  const { data: umkm, isLoading } = useUmkm(umkmId)
  const { data: products, isLoading: prodLoading } = useUmkmProducts(umkmId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!umkm) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Typography variant="h3" className="mb-2">UMKM Tidak Ditemukan</Typography>
          <Button asChild variant="outline">
            <Link to="/umkm">Kembali ke UMKM</Link>
          </Button>
        </div>
      </div>
    )
  }

  const whatsappUrl = umkm.whatsapp
    ? `https://wa.me/${umkm.whatsapp}?text=Halo%20${encodeURIComponent(umkm.name)}%2C%20saya%20tertarik%20dengan%20produk%20Anda.`
    : null

  return (
    <>
      <Section className="pt-16 pb-8">
        <Container>
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/umkm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke UMKM
            </Link>
          </Button>

          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                umkm.status === 'approved' ? 'bg-green-100 text-green-700' :
                umkm.status === 'rejected' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              } mb-3`}>
                {umkm.status === 'approved' ? 'Aktif' : umkm.status === 'rejected' ? 'Ditolak' : 'Pending'}
              </span>
              <Typography variant="h1" className="mb-2">
                {umkm.name}
              </Typography>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Store className="w-4 h-4" />
                UMKM #{umkm.id}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Card className="p-6">
                  <Typography variant="h4" className="mb-4">Deskripsi</Typography>
                  <Text className="text-text-muted leading-relaxed">
                    {umkm.description || 'Belum ada deskripsi'}
                  </Text>
                </Card>

                <Card className="p-6">
                  <Typography variant="h4" className="mb-4">Kontak & Lokasi</Typography>
                  <div className="space-y-4">
                    {umkm.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <Typography variant="h6" className="mb-1">Alamat</Typography>
                          <Text className="text-text-muted">{umkm.address}</Text>
                        </div>
                      </div>
                    )}
                    {whatsappUrl && (
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-green-600 hover:bg-green-700">
                          Hubungi via WhatsApp
                        </Button>
                      </a>
                    )}
                  </div>
                </Card>
              </div>
            </header>

            <Section className="py-8">
              <div className="flex items-center justify-between mb-6">
                <Typography variant="h3">Produk UMKM</Typography>
                <Typography variant="h5" className="text-primary">
                  {products?.length ?? 0} produk
                </Typography>
              </div>

              {prodLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden animate-pulse">
                      <div className="h-40 bg-surface" />
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-surface rounded w-1/3" />
                        <div className="h-6 bg-surface rounded w-3/4" />
                        <div className="h-4 bg-surface rounded w-full" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} to={`/produk/${product.id}`}>
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="relative h-40 overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-surface flex items-center justify-center">
                              <Package className="w-12 h-12 text-text-muted" />
                            </div>
                          )}
                          <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded ${
                            product.status === 'active' ? 'bg-green-100 text-green-700' :
                            product.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                        <div className="p-4">
                          <Typography variant="h6" className="mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </Typography>
                          <Text className="text-sm text-text-muted line-clamp-1 mb-2">
                            {product.description}
                          </Text>
                          <div className="flex items-center justify-between">
                            <Typography variant="h6" className="text-primary font-bold">
                              {formatRupiah(product.price)}
                            </Typography>
                            <span className="text-xs text-text-muted">Stok: {product.stock}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <Typography variant="h5" className="mb-1">Belum Ada Produk</Typography>
                  <Muted>UMKM ini belum memiliki produk yang ditampilkan</Muted>
                </div>
              )}
            </Section>
          </div>
        </Container>
      </Section>
    </>
  )
}