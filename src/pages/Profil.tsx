import { lazy, Suspense } from 'react'
import { useVillageProfile } from '@/services/api'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Users, Building2, Clock, Mail, Phone, Calendar } from 'lucide-react'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const VillageMap = lazy(() => import('@/components/sections/VillageMap'))

export default function Profil() {
  const { data: profile, isLoading } = useVillageProfile()

  const lat = -6.752317320870769
  const lng = 110.73665112293429

  if (isLoading) {
    return (
      <>
        <Section className="pt-28 md:pt-32 lg:pt-36 pb-12 bg-gradient-to-br from-primary-light via-white to-surface">
          <Container>
            <div className="max-w-3xl space-y-4">
              <div className="h-12 w-3/4 bg-surface rounded animate-pulse" />
              <div className="h-6 w-full bg-surface rounded animate-pulse" />
              <div className="h-6 w-2/3 bg-surface rounded animate-pulse" />
            </div>
          </Container>
        </Section>
        <Section className="py-16">
          <Container>
            <LoadingSkeleton variant="card" count={4} />
          </Container>
        </Section>
      </>
    )
  }

  const infoCards = [
    { icon: Users, label: 'Penduduk', value: '4.500+ jiwa', desc: 'KK: 1.300+' },
    { icon: Building2, label: 'Dusun', value: '5 Dusun', desc: 'Krajan, Kembang, Makam, Pandak, dll' },
    { icon: Calendar, label: 'Jam Kerja', value: 'Senin - Sabtu', desc: '08.00 - 16.00 WIB' },
    { icon: MapPin, label: 'Kecamatan', value: 'Mayong', desc: 'Kab. Jepara, Jawa Tengah' },
  ]

  const villageName = profile?.name || 'Desa Kuanyar'
  const contactInfo = profile?.contactInfo || 'Desa Kuanyar, Kec. Mayong, Kab. Jepara, Jawa Tengah'

  return (
    <>
      <Section className="pt-28 md:pt-32 lg:pt-36 pb-12 bg-gradient-to-br from-primary-light via-white to-surface">
        <Container>
          <div className="max-w-3xl">
            <Typography variant="h1" className="mb-4">
              Profil {villageName}
            </Typography>
            <Text className="text-lg text-text-muted mb-8">
              {profile?.overview || 'Desa Kuanyar merupakan salah satu desa di Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah.'}
            </Text>
            <Button asChild size="lg">
              <Link to="/kontak">Hubungi Kami <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {infoCards.map((card, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-7 h-7" />
                </div>
                <Typography variant="h3" className="mb-1">{card.value}</Typography>
                <Typography variant="h5" className="text-primary mb-1">{card.label}</Typography>
                <Muted className="text-sm">{card.desc}</Muted>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16 bg-surface">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Typography variant="h2" className="mb-6">Lokasi Desa Kuanyar</Typography>
              <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                <Suspense fallback={<div className="h-96 w-full bg-surface animate-pulse" />}>
                  <VillageMap villageName={villageName} contactInfo={contactInfo} />
                </Suspense>
              </div>
              <div className="mt-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Buka di Google Maps
                  </Button>
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Typography variant="h3" className="mb-4">Sejarah</Typography>
                <Text className="text-text-muted leading-relaxed">
                  {profile?.history || 'Desa Kuanyar berdiri sejak zaman kolonial Belanda. Nama Kuanyar berasal dari kata "Kali" dan "Anyar" yang berarti sungai baru, merujuk pada keberadaan sungai yang melintasi desa.'}
                </Text>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Typography variant="h4" className="mb-3">Visi</Typography>
                  <Text className="text-text-muted leading-relaxed">
                    {profile?.vision || 'Terwujudnya Desa Kuanyar yang maju, mandiri, sejahtera, dan berdaya saing berdasarkan nilai-nilai gotong royong dan kearifan lokal.'}
                  </Text>
                </div>
                <div>
                  <Typography variant="h4" className="mb-3">Misi</Typography>
                  <Text className="text-text-muted leading-relaxed">
                    {profile?.mission || 'Meningkatkan kesejahteraan masyarakat melalui pengembangan ekonomi kerakyatan berbasis UMKM dan potensi lokal.'}
                  </Text>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">Demografi</Typography>
                <Text className="text-text-muted leading-relaxed">
                  {profile?.demographics || 'Jumlah penduduk Desa Kuanyar tercatat sekitar 4.500 jiwa dengan 1.300 kepala keluarga. Mayoritas penduduk bekerja di sektor pertanian dan kerajinan.'}
                </Text>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">Fasilitas Umum</Typography>
                <Text className="text-text-muted leading-relaxed">
                  {profile?.facilities || 'Desa Kuanyar memiliki berbagai fasilitas umum antara lain: Balai Desa, Kantor Pemerintah Desa, Puskesmas Pembantu (Pustu), Sekolah Dasar Negeri, Taman Kanak-Kanak, Masjid, Lapangan Olahraga, dan Pasar Desa.'}
                </Text>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">Informasi Administrasi</Typography>
                <Text className="text-text-muted leading-relaxed">
                  {profile?.adminInfo || 'Kantor Kepala Desa Kuanyar berlokasi di Dusun Krajan, Desa Kuanyar, Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah 59465.'}
                </Text>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">Kontak</Typography>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-text-muted">{contactInfo}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-text-muted">+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-text-muted">info@kuanyar.desa.id</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-text-muted">Senin - Sabtu, 08.00 - 16.00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}