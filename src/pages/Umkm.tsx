import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUmkms } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Search, Store, MapPin, Phone } from 'lucide-react'

export default function Umkm() {
  const [search, setSearch] = useState('')
  const { data: umkms, isLoading } = useUmkms(search || undefined)

  return (
    <>
      <Section className="pt-16 pb-12 bg-gradient-to-br from-primary-light via-white to-surface">
        <Container>
          <div className="max-w-3xl">
            <Typography variant="h1" className="mb-4">
              UMKM Desa Kuanyar
            </Typography>
            <Text className="text-lg text-text-muted mb-8">
              Produk dan jasa dari pengrajin serta pelaku usaha di Desa Kuanyar
            </Text>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <Input
                placeholder="Cari UMKM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : umkms && umkms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {umkms.map((umkm) => (
                <Link key={umkm.id} to={`/umkm/${umkm.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-40 overflow-hidden">
                      {umkm.logo ? (
                        <img
                          src={umkm.logo}
                          alt={umkm.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface flex items-center justify-center">
                          <Store className="w-12 h-12 text-text-muted" />
                        </div>
                      )}
                      <span className={`absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full ${
                        umkm.status === 'approved' ? 'bg-green-100 text-green-700' :
                        umkm.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {umkm.status === 'approved' ? 'Aktif' : umkm.status === 'rejected' ? 'Ditolak' : 'Pending'}
                      </span>
                    </div>
                    <div className="p-6">
                      <Typography variant="h5" className="mb-2 group-hover:text-primary transition-colors">
                        {umkm.name}
                      </Typography>
                      <Text className="text-sm text-text-muted line-clamp-2 mb-3">
                        {umkm.description}
                      </Text>
                      {umkm.address && (
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{umkm.address}</span>
                        </div>
                      )}
                      {umkm.whatsapp && (
                        <div className="flex items-center gap-1 text-sm text-text-muted mt-1">
                          <Phone className="w-4 h-4" />
                          <span>{umkm.whatsapp}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Store className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <Typography variant="h4" className="mb-2">Tidak Ada UMKM</Typography>
              <Muted>Belum ada UMKM yang terdaftar</Muted>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}