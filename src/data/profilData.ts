import type { OrgPerson } from '@/components/sections/OrganizationChart'
import type { TimelineEvent } from '@/components/sections/ProfileTimeline'

export const profilHero = {
  title: 'Profil Desa Kuanyar',
  subtitle:
    'Sejarah, visi misi, geografis, demografi, struktur organisasi, peta, dan perkembangan Desa Kuanyar, Jepara.',
}

export const history = {
  title: 'Sejarah',
  content:
    'Desa Kuanyar terletak di pesisir selatan Kabupaten Jepara, Jawa Tengah, di sepanjang Sungai Kuanyar. Nama desa terinspirasi dari sungai yang kaya akan sumber daya alam di sekitarnya. Sejak masa awal, penduduk desa bergantung pada sektor perikanan laut, pertambangan, serta pertanian padi dan cengkeh. Pada masa Pemerintahan Kolonial Belanda, Desa Kuanyar dikelola melalui sistem desa tradisional yang dipimpin oleh kepala desa adat (lurah). Seiring berjalannya waktu dan berkembangnya pemerintahan desa pasca-kemerdekaan, infrastruktur jalan, pasar, dan layanan kesehatan desa terus berkembang pesat, khususnya sektor ukir kayu dan industri kreatif anyaman bambu.',
}

export const visionMission = {
  vision:
    'Terwujudnya Desa Kuanyar yang mandiri, sejahtera, dan berkelanjutan berbasis potensi alam dan sumber daya manusia yang berdaya saing di pasar global.',
  mission: [
    'Meningkatkan kesejahteraan masyarakat melalui pemberdayaan UMKM lokal',
    'Mengembangkan sektor pertanian dan perikanan secara berkelanjutan',
    'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan',
    'Membangun infrastruktur desa yang inklusif dan berkelanjutan',
    'Mewujudkan pemerataan pelayanan publik berbasis digital',
    'Melestarikan budaya dan tradisi lokal sebagai kebanggaan desa',
  ],
}

export const geography = {
  title: 'Geografis',
  items: [
    { label: 'Letak', value: 'Pesisir selatan Kabupaten Jepara, Jawa Tengah' },
    { label: 'Luas', value: '15,2 km²' },
    { label: 'Iklim', value: 'Tropical monsoon (Am)' },
    { label: 'Topografi', value: 'Rendah, dengan sawah irigasi dan pesisir' },
    { label: 'Jarak ke pusat', value: '18 km ke Pusat Kabupaten Jepara' },
  ],
}

export const demographyStats = [
  { value: '12.508', label: 'Total Jiwa' },
  { value: '6.234', label: 'Laki-laki' },
  { value: '6.274', label: 'Perempuan' },
  { value: '89%', label: 'Pekerjaan di sektor primatif' },
]

export const organization: { head: OrgPerson; staff: OrgPerson[] } = {
  head: { name: 'Drs. Agus Salim, MM', position: 'Kepala Desa' },
  staff: [
    { name: 'Siti Rahayu, S.E', position: 'Sekretaris Desa' },
    { name: 'Budi Santoso, S.P', position: 'Kepala Urusan Keuangan' },
    { name: 'Hari Wijoyo, S.Kep', position: 'Kepala Dusun' },
  ],
}

export const mapData = {
  title: 'Peta Desa Kuanyar',
  description:
    'Desa Kuanyar terletak di koordinat 6°34′S, 110°28′E, dengan batas wilayah meliputi perkebunan cengkeh, sawah padi, dan laut Jawa.',
}

export const timeline: TimelineEvent[] = [
  {
    id: 't1',
    year: '1945',
    title: 'Kemerdekaan Indonesia',
    description:
      'Desa Kuanyar resmi tercatat dalam administrasi pemerintahan desa karena pembentukan pemerintahan desa pasca-kemerdekaan.',
  },
  {
    id: 't2',
    year: '1975',
    title: 'Pembangunan Jalan Desa',
    description: 'Pelaksanaan pembangunan jalan desa pertama yang menghubungkan ke puskesmas dan pasar',
  },
  {
    id: 't3',
    year: '1990',
    title: 'Koperasi Simpan Pinjam',
    description: 'Pembentukan koperasi simpan pinjam desa untuk meningkatkan perekonomian warga',
  },
  {
    id: 't4',
    year: '2005',
    title: 'UMKM Anyaman Bambu',
    description: 'Pemberdayaan UMKM anyaman bambu sebagai produk unggulan desa',
  },
  {
    id: 't5',
    year: '2014',
    title: 'Pembangunan Puskesmas',
    description: 'Pembangunan puskesmas desa untuk meningkatkan akses layanan kesehatan',
  },
  {
    id: 't6',
    year: '2019',
    title: 'Infrastruktur Irigasi',
    description: 'Renovasi sistem irigasi sawah yang meningkatkan hasil produktivitas pertanian',
  },
  {
    id: 't7',
    year: '2022',
    title: 'Digitalisasi Desa',
    description: 'Peluncuran etalase digital desa untuk promosi online',
  },
  {
    id: 't8',
    year: '2024',
    title: 'Juara UMKM Mandiri',
    description: 'Desa Kuanyar ditetapkan sebagai Desa UMKM mandiri tingkat kabupaten',
  },
]
