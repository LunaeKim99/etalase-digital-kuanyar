import 'leaflet/dist/leaflet.css'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import L from 'leaflet'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useTourism, useTourismGallery } from '@/services/api'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import QRCode from '@/components/ui/QRCode'
import GalleryItem from '@/components/cards/GalleryItem'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const locationIcon = L.divIcon({
  className: 'desa-marker',
  html: '<div style="width:26px;height:26px;background:#ef4444;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [26, 26],
  iconAnchor: [13, 26],
})

function WisataDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: tourism, isLoading, isError } = useTourism(slug ?? '')
  const { data: gallery } = useTourismGallery(slug ?? '')

  if (isLoading) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="animate-pulse">
              <div className="w-full aspect-video bg-surface-hover rounded-xl" />
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-surface-hover rounded w-1/4" />
              <div className="h-8 bg-surface-hover rounded w-1/2" />
              <div className="h-4 bg-surface-hover rounded w-3/4" />
              <div className="h-4 bg-surface-hover rounded w-full" />
              <div className="h-4 bg-surface-hover rounded w-full" />
              <div className="h-4 bg-surface-hover rounded w-2/3" />
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  if (isError || !tourism) {
    return (
      <Section className="pt-28 animate-slide-up">
        <Container size="sm" className="text-center mx-auto">
          <Typography variant="h2" className="mb-4">
            Destinasi Tidak Ditemukan
          </Typography>
          <Button variant="outline" asChild>
            <Link to="/wisata">Kembali ke Wisata</Link>
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
            to="/wisata"
            className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-6 inline-flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Wisata
          </Link>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              {tourism.image ? (
                <img
                  src={tourism.image}
                  alt={tourism.name}
                  className="w-full aspect-video object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-video bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-white/50" />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <span className="badge bg-white/20 text-white">{tourism.category}</span>
              <Typography variant="h1" className="text-white">
                {tourism.name}
              </Typography>
              <Muted className="text-white/80 text-lg">{tourism.location}</Muted>
              <Text className="text-white/90">{tourism.description}</Text>
              {tourism.facilities && tourism.facilities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tourism.facilities.map((f) => (
                    <span key={f} className="badge bg-white/20 text-white">
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="mb-6">
            Peta Lokasi
          </Typography>
          <div className="h-80 w-full rounded-xl overflow-hidden border border-border">
            <MapContainer
              center={[tourism.lat, tourism.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[tourism.lat, tourism.lng]} icon={locationIcon}>
                <Popup>{tourism.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="mb-6">
            Galeri Foto
          </Typography>
          {gallery && gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((url, i) => (
                <GalleryItem key={i} image={url} />
              ))}
            </div>
          ) : (
            <Muted>Belum ada foto galeri.</Muted>
          )}
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="flex flex-wrap items-center gap-6">
            {tourism.phone && (
              <WhatsAppButton
                phone={tourism.phone}
                message={`Halo, saya ingin informasi wisata ${tourism.name} di Desa Kuanyar.`}
              />
            )}
            <QRCode
              value={`https://etalase-kuanyar.vercel.app/wisata/${tourism.slug}`}
              size={120}
              label="Scan untuk share"
            />
          </div>
        </Container>
      </Section>
    </>
  )
}

export default WisataDetail
