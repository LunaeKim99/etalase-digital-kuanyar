import type { OrgPerson } from '@/components/sections/OrganizationChart'
import type { TimelineEvent } from '@/components/sections/ProfileTimeline'

export const profilHero = {
  title: 'Profil Desa Kuanyar',
  subtitle:
    'Sejarah, profil wilayah, demografi, mata pencaharian, dan potensi Desa Kuanyar, Jepara.',
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
    { label: 'Letak', value: 'Kecamatan Mayong, Kabupaten Jepara, Provinsi Jawa Tengah' },
    { label: 'Wilayah', value: 'Dataran rendah dengan aksesibilitas baik' },
    { label: 'Iklim', value: 'Tropical monsoon (Am)' },
    { label: 'Topografi', value: 'Rendah, dekat pusat pemerintahan dan kawasan industri Mayong' },
  ],
}

export const demographyStats = [
  { value: '4.504', label: 'Total Jiwa' },
  { value: '2.294', label: 'Laki-laki' },
  { value: '2.210', label: 'Perempuan' },
  { value: '5', label: 'Dusun' },
]

export const demografiPenduduk = { total: 4504, laki: 2294, perempuan: 2210 }

export interface MataPencaharian {
  no: number
  pekerjaan: string
  jumlah: number
  persen: string
}
export const mataPencaharian: MataPencaharian[] = [
  { no: 1, pekerjaan: 'Wiraswasta', jumlah: 1072, persen: '23,8%' },
  { no: 2, pekerjaan: 'Belum/Tidak Bekerja*', jumlah: 1058, persen: '23,5%' },
  { no: 3, pekerjaan: 'Pelajar/Mahasiswa', jumlah: 913, persen: '20,3%' },
  { no: 4, pekerjaan: 'Buruh Harian Lepas', jumlah: 420, persen: '9,3%' },
  { no: 5, pekerjaan: 'Mengurus Rumah Tangga', jumlah: 406, persen: '9,0%' },
  { no: 6, pekerjaan: 'Karyawan Swasta', jumlah: 236, persen: '5,2%' },
  { no: 7, pekerjaan: 'Petani/Pekebun', jumlah: 71, persen: '1,6%' },
  { no: 8, pekerjaan: 'Tukang Jahit', jumlah: 55, persen: '1,2%' },
  { no: 9, pekerjaan: 'Tukang Kayu', jumlah: 46, persen: '1,0%' },
  { no: 10, pekerjaan: 'Perdagangan', jumlah: 41, persen: '0,9%' },
]

export const batasWilayah = [
  { arah: 'Utara', desa: 'Desa Pelang' },
  { arah: 'Selatan', desa: 'Desa Paren' },
  { arah: 'Barat', desa: 'Desa Kalipucang Wetan' },
  { arah: 'Timur', desa: 'Desa Tigajuru' },
]

export const penggunaanLahan = [
  { kategori: 'Permukiman', deskripsi: 'Kawasan permukiman penduduk yang padat, tersebar di sepanjang jalan desa.' },
  { kategori: 'Pertanian', deskripsi: 'Lahan sawah dan ladang produktif yang menjadi penyangga ketahanan pangan.' },
  { kategori: 'Fasilitas Umum', deskripsi: 'Sarana pendidikan, tempat ibadah, pasar desa, puskesmas pembantu, dan pemerintahan desa.' },
]

export type PotensiSummaryCategory = 'konveksi' | 'umkm-makanan' | 'pertanian'
export interface PotensiSummaryItem {
  kategori: PotensiSummaryCategory
  judul: string
  ikon: string
  items: { judul: string; deskripsi: string }[]
  link: { label: string; href: string }
}
export const potensiDesa: PotensiSummaryItem[] = [
  {
    kategori: 'konveksi',
    judul: 'Konveksi',
    ikon: 'Shirt',
    items: [
      { judul: 'MYG Collection', deskripsi: 'Konveksi celana cewek & cowok, kapasitas ~1.000 pcs/bulan, pesanan custom.' },
      { judul: 'Reza Collection', deskripsi: 'Atasan seragam sekolah, celana anak & dewasa, grosir ke Pasar Kliwon.' },
      { judul: 'Mila Collection', deskripsi: 'Celana kulot & cewek, kapasitas ~500 pcs/minggu, distribusi via pengiriman.' },
      { judul: 'Mudah Collection', deskripsi: 'Celana kulot, pendek, panjang, pemasaran via TikTok, grosir ke Surabaya/Jepara/Demak/Kudus.' },
    ],
    link: { label: 'Lihat Detail', href: '/potensi' },
  },
  {
    kategori: 'umkm-makanan',
    judul: 'Katering & Bakery',
    ikon: 'UtensilsCrossed',
    items: [
      { judul: 'Dahlia Jaya Catering', deskripsi: 'Nasi box ayam bakar (unggulan), jajan basah, bento, tumpeng, snack untuk hajatan & rapat.' },
      { judul: 'Naning Bakery', deskripsi: 'Roti pisang (unggulan), jajan basah, kue, roti, dessert, nasi box savory.' },
    ],
    link: { label: 'Lihat Detail', href: '/potensi' },
  },
  {
    kategori: 'pertanian',
    judul: 'Pertanian',
    ikon: 'Wheat',
    items: [
      { judul: 'Lahan Sawah', deskripsi: 'Komoditas utama padi dan jagung, didukung 4 kelompok tani aktif.' },
      { judul: 'Ketahanan Pangan', deskripsi: 'Lahan dipelihara sebagai penyangga ketahanan pangan, modernisasi via alsintan & bibit unggul.' },
    ],
    link: { label: 'Lihat Detail', href: '/potensi' },
  },
]

export const sejarahNaratif = [
  'Nama Desa Kuanyar bermula dari sebutan "Bumiku Anyar" (Tanah Baruku) yang dicetuskan oleh Mbah Kresek, tokoh penerus desa.',
  'Cikal bakal desa diawali oleh kedatangan Nyai Safah (Mbok Emban), pengasuh setia Ratu Kalinyamat, bersama suaminya Mbah Wali.',
  'Atas jasanya, Ratu Kalinyamat memberikan tanah di wilayah ini; Mbok Emban mendirikan pesanggrahan bernama "Sentono".',
  'Mbah Wali menendang bedug masjid Sentono karena sepi jamaah; lokasi jatuhnya kini adalah Masjid Baitul Mujtahidin (Masjid Kauman), didirikan 1880 oleh KH Hasan Janamin.',
  'Sepeninggal Mbok Emban, desa berkembang dengan dibukanya dukuh-dukuh baru: Sebatang (Mbah Kresek), Gedang Gepeng (Mbah Sastro Mulyono), Kranggan (Mbah Suradi), dan lainnya.',
  'Sentono kini menjadi bagian dari Dukuh Kauman sebagai pusat penyebaran agama Islam di Desa Kuanyar.',
].join(' ')

export const tokohPenerus = [
  { nama: 'Nyai Safah (Mbok Emban)', dukuh: 'Sentono', peran: 'Pengasuh Ratu Kalinyamat, pendiri pesanggrahan Sentono' },
  { nama: 'Mbah Wali', dukuh: 'Sentono', peran: 'Suami Mbok Emban, tokoh spiritual' },
  { nama: 'Mbah Kresek', dukuh: 'Sebatang', peran: 'Penerus pertama, memberi nama Kuanyar ("Bumiku Anyar")' },
  { nama: 'Mbah Sastro Mulyono', dukuh: 'Gedang Gepeng', peran: 'Tokoh perintis pembangunan' },
  { nama: 'Mbah Sugeng', dukuh: 'Mbondoyo', peran: 'Tokoh perintis pembangunan' },
  { nama: 'Raden Suryo', dukuh: 'Ngalasan Timur', peran: 'Tokoh perintis pembangunan' },
  { nama: 'Mbah Sastroamijoyo', dukuh: 'Ngalasan Barat', peran: 'Tokoh perintis pembangunan' },
  { nama: 'Mbah Suradi', dukuh: 'Kranggan', peran: 'Tokoh perintis pembangunan' },
  { nama: 'Mbok Dodol', dukuh: 'Babadan', peran: 'Tokoh perintis pembangunan' },
]

export const periodePemerintahan = [
  { nama: 'Banis', periode: '1837-1840' },
  { nama: 'Yahya', periode: '1840-1865' },
  { nama: 'Ropingi', periode: '1880-1905' },
  { nama: 'Wirongangsi', periode: '1905-1922' },
  { nama: 'H. Glempo', periode: '1922' },
  { nama: 'H. Sulaiman', periode: '1922-1945' },
  { nama: 'Maskat Hadiwijaya', periode: '1945-1975' },
  { nama: 'Abu Cholil', periode: '1975-1986' },
  { nama: 'Ubeid Zubaidi', periode: '1986-1996' },
  { nama: 'Abdul Qodir', periode: '1996-2003' },
  { nama: 'Ubeid Zubaidi', periode: '2003-2013' },
  { nama: 'Abdu Harisman', periode: '2013-2019' },
  { nama: 'Khomsatun', periode: '2019-2025' },
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
