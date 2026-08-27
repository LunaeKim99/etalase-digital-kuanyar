import { useVillageProfile } from '@/services/api'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
  MapPin, ArrowRight, Users, Building2, Calendar, Mail, Phone, Clock,
  ShoppingBasket, Landmark, Wheat, Shirt, UtensilsCrossed,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import MapLazy from '@/components/sections/MapLazy'
import OrganizationChart from '@/components/sections/OrganizationChart'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { PageHero } from '@/components/sections/PageHero'
import {
  profilHero,
  geography,
  organization,
  batasWilayah,
  penggunaanLahan,
   demografiPenduduk,
   demographyStats,
   visionMission,
   mataPencaharian,
   potensiDesa,
   sejarahNaratif,
   tokohPenerus,
   periodePemerintahan,
} from '@/data/profilData'

const iconMap: Record<string, LucideIcon> = {
  ShoppingBasket,
  Landmark,
  Wheat,
  Shirt,
  UtensilsCrossed,
}

export default function Profil() {
  const { data: profile, isLoading } = useVillageProfile()

  const lat = profile?.lat ?? -6.752317320870769
  const lng = profile?.lng ?? 110.73665112293429

  const villageName = profile?.name || profilHero.title
  const contactInfo =
    profile?.contactInfo || 'Desa Kuanyar, Kec. Mayong, Kab. Jepara, Jawa Tengah'

  if (isLoading) {
    return (
      <>
        <PageHero title={`Profil ${villageName}`} subtitle="Memuat...">
          <div className="h-10 w-40 bg-white/20 rounded-full animate-pulse" />
        </PageHero>
        <Section className="py-16">
          <Container>
            <LoadingSkeleton variant="card" count={4} />
          </Container>
        </Section>
      </>
    )
  }

  const mcRows = mataPencaharian.map((m) => ({ id: m.no, ...m }))
  const mcColumns: Column<(typeof mcRows)[number]>[] = [
    { key: 'no', header: 'No' },
    { key: 'pekerjaan', header: 'Jenis Pekerjaan' },
    { key: 'jumlah', header: 'Jumlah (Orang)' },
    { key: 'persen', header: 'Persentase' },
  ]

  const infoCards = [
    { icon: Users, label: 'Penduduk', value: `${demografiPenduduk.total.toLocaleString('id-ID')} jiwa`, desc: 'Per Desember 2025' },
    { icon: Building2, label: 'Dusun', value: `${demographyStats.find((s) => s.label === 'Dusun')?.value ?? '5'} Dusun`, desc: 'Krajan, Kembang, Makam, Pandak, dll' },
    { icon: Calendar, label: 'Jam Kerja', value: 'Senin - Sabtu', desc: '08.00 - 16.00 WIB' },
    { icon: MapPin, label: 'Kecamatan', value: 'Mayong', desc: 'Kab. Jepara, Jawa Tengah' },
  ]

  return (
    <>
      {/* 1. Hero */}
      <PageHero title={`Profil ${villageName}`} subtitle={profile?.overview || profilHero.subtitle}>
        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
          <Link to="/kontak">Hubungi Kami <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </PageHero>

      {/* 2. Stat Cards */}
      <Section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {infoCards.map((card, i) => (
              <Card key={i} variant="filled" className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-7 h-7 text-primary" />
                </div>
                <Typography variant="h3" className="mb-1">{card.value}</Typography>
                <Typography variant="h5" className="text-primary mb-1">{card.label}</Typography>
                <Muted className="text-sm">{card.desc}</Muted>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Lokasi & Batas Wilayah */}
      <Section className="py-16 bg-surface-container-low">
        <Container>
          <Typography variant="h2" className="mb-8">Lokasi & Batas Wilayah</Typography>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Typography variant="h3" className="mb-4">Peta Desa Kuanyar</Typography>
              <div className="rounded-xl overflow-hidden shadow-lg border border-outline-variant">
                <MapLazy villageName={villageName} contactInfo={contactInfo} />
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
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-3">Geografis</Typography>
                <ul className="text-sm">
                  {geography.items.map((g) => (
                    <li key={g.label} className="flex justify-between gap-4 py-2 border-b border-outline-variant last:border-0">
                      <span className="text-on-surface-variant shrink-0">{g.label}</span>
                      <span className="text-on-surface text-right">{g.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography variant="h4" className="mb-3">Batas Wilayah</Typography>
                <div className="grid grid-cols-2 gap-3">
                  {batasWilayah.map((b) => (
                    <Card key={b.arah} variant="filled" className="p-4 text-center">
                      <Typography variant="h6" className="mb-1">{b.arah}</Typography>
                      <Muted className="text-sm">{b.desa}</Muted>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Penggunaan Lahan */}
      <Section className="py-16">
        <Container>
          <Typography variant="h2" className="mb-8">Penggunaan Lahan</Typography>
          <div className="grid md:grid-cols-3 gap-6">
            {penggunaanLahan.map((p) => (
              <Card key={p.kategori} variant="filled" className="p-6">
                <Typography variant="h4" className="mb-2">{p.kategori}</Typography>
                <Text className="text-sm text-on-surface-variant">{p.deskripsi}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Sejarah Desa */}
      <Section className="py-16 bg-surface-container-low">
        <Container>
          <Typography variant="h2" className="mb-8">Sejarah Desa Kuanyar</Typography>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Text className="text-on-surface-variant leading-relaxed">{sejarahNaratif}</Text>
              <div className="mt-6">
                <Typography variant="h4" className="mb-3">Tokoh Penerus</Typography>
                <div className="space-y-3">
                  {tokohPenerus.map((t) => (
                    <Card key={t.nama} className="p-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <Typography variant="h6" className="mb-1">{t.nama}</Typography>
                          <Muted className="text-sm">{t.dukuh} · {t.peran}</Muted>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Typography variant="h4" className="mb-3">Periode Pemerintahan Desa</Typography>
              <div className="overflow-x-auto rounded-xl border border-outline-variant">
                <table className="w-full text-sm">
                  <thead className="bg-surface-container-highest">
                    <tr className="border-b border-outline-variant">
                      <th className="text-left px-4 py-3 font-medium text-on-surface text-sm">Nama</th>
                      <th className="text-left px-4 py-3 font-medium text-on-surface text-sm">Periode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periodePemerintahan.map((p) => (
                      <tr key={p.nama + p.periode} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
                        <td className="px-4 py-3 text-on-surface">{p.nama}</td>
                        <td className="px-4 py-3 text-on-surface-variant">{p.periode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Visi & Misi */}
      <Section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Typography variant="h3" className="mb-4">Visi</Typography>
              <Text className="text-on-surface-variant leading-relaxed">
                {profile?.vision || visionMission.vision}
              </Text>
            </div>
            <div>
              <Typography variant="h3" className="mb-4">Misi</Typography>
              <Text className="text-on-surface-variant leading-relaxed whitespace-pre-line">
                {profile?.mission || visionMission.mission.join('\n')}
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Demografi & Mata Pencaharian */}
      <Section className="py-16 bg-surface-container-low">
        <Container>
          <Typography variant="h2" className="mb-8">Demografi & Mata Pencaharian</Typography>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card variant="filled" className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <Typography variant="h3" className="mb-1">{demografiPenduduk.total.toLocaleString('id-ID')}</Typography>
              <Muted>Total Jiwa</Muted>
            </Card>
            <Card variant="filled" className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <Typography variant="h3" className="mb-1">{demografiPenduduk.laki.toLocaleString('id-ID')}</Typography>
              <Muted>Laki-laki</Muted>
            </Card>
            <Card variant="filled" className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <Typography variant="h3" className="mb-1">{demografiPenduduk.perempuan.toLocaleString('id-ID')}</Typography>
              <Muted>Perempuan</Muted>
            </Card>
          </div>

          <Typography variant="h4" className="mb-4">Distribusi Mata Pencaharian (10 Besar)</Typography>
          <DataTable data={mcRows} columns={mcColumns} />
          <Muted className="mt-2 text-xs">* Kategori "Belum/Tidak Bekerja" umumnya mencakup anak-anak usia dini dan lansia non-produktif.</Muted>
        </Container>
      </Section>

      {/* 8. Struktur Organisasi */}
      <Section className="py-16">
        <Container>
          <Typography variant="h2" className="mb-8">Struktur Organisasi</Typography>
          <OrganizationChart head={organization.head} staff={organization.staff} />
        </Container>
      </Section>

      {/* 9. Potensi Desa */}
      <Section className="py-16 bg-surface-container-low">
        <Container>
          <div className="flex items-end justify-between mb-8">
            <Typography variant="h2">Potensi Desa</Typography>
            <Link to="/potensi" className="text-primary hover:text-on-primary-container font-medium text-sm transition-colors">
              Lihat Semua Potensi →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {potensiDesa.map((p) => {
              const Icon = iconMap[p.ikon] ?? Wheat
              return (
                <Card key={p.kategori} variant="filled" className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <Typography variant="h4" className="mb-4">{p.judul}</Typography>
                  <div className="space-y-3 mb-6">
                    {p.items.map((item) => (
                      <div key={item.judul}>
                        <Typography variant="h6" className="mb-1">{item.judul}</Typography>
                        <Text className="text-sm text-on-surface-variant">{item.deskripsi}</Text>
                      </div>
                    ))}
                  </div>
                  <Link to={p.link.href} className="inline-flex items-center gap-1 text-primary hover:text-on-primary-container font-medium text-sm transition-colors">
                    {p.link.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 10. Fasilitas Umum & Kontak */}
      <Section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Typography variant="h3" className="mb-4">Fasilitas Umum</Typography>
              <Text className="text-on-surface-variant leading-relaxed">
                {profile?.facilities || 'Balai Desa, Kantor Pemerintah Desa, Puskesmas Pembantu (Pustu), Sekolah Dasar, TK, Masjid, Lapangan Olahraga, dan Pasar Desa.'}
              </Text>
              {profile?.adminInfo && (
                <>
                  <Typography variant="h3" className="mb-4 mt-8">Informasi Administrasi</Typography>
                  <Text className="text-on-surface-variant leading-relaxed">{profile.adminInfo}</Text>
                </>
              )}
            </div>
            <div>
              <Typography variant="h3" className="mb-4">Kontak</Typography>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-on-surface-variant">{contactInfo}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-on-surface-variant">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-on-surface-variant">info@kuanyar.desa.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-on-surface-variant">Senin - Sabtu, 08.00 - 16.00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
