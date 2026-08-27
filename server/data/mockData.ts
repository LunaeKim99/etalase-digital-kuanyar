export const villageProfile = {
  id: 1,
  name: 'Desa Kuanyar',
  overview:
    'Desa Kuanyar merupakan salah satu desa di Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah yang terkenal dengan usaha konveksi, katering, snack, dan pertanian sebagai sumber ekonomi utama masyarakat setempat.',
  history:
    'Desa Kuanyar berdiri sejak zaman kolonial Belanda. Nama Kuanyar berasal dari kata "Kali" dan "Anyar" yang berarti sungai baru, merujuk pada keberadaan sungai yang melintasi desa. Seiring berjalannya waktu, desa berkembang menjadi pusat kerajinan dan perdagangan di wilayah Kecamatan Mayong.',
  vision:
    'Terwujudnya Desa Kuanyar yang maju, mandiri, sejahtera, dan berdaya saing berdasarkan nilai-nilai gotong royong dan kearifan lokal.',
  mission:
    'Meningkatkan kesejahteraan masyarakat melalui pengembangan ekonomi kerakyatan berbasis UMKM dan potensi lokal; Menyelenggarakan pemerintahan desa yang bersih, transparan, dan akuntabel; Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan; Membangun infrastruktur desa yang merata dan berkelanjutan.',
  demographics:
    'Jumlah penduduk Desa Kuanyar tercatat sekitar 4.500 jiwa dengan 1.300 kepala keluarga. Mayoritas penduduk bekerja di sektor konveksi, katering, snack, dan pertanian. Tidak sedikit anak muda dan pendatang dari luar desa yang bekerja sebagai buruh pabrik konveksi. Rasio penduduk laki-laki dan perempuan relatif seimbang, dengan jumlah penduduk usia produktif sekitar 65%.',
  facilities:
    'Desa Kuanyar memiliki berbagai fasilitas umum antara lain: Balai Desa, Kantor Pemerintah Desa, Puskesmas Pembantu (Pustu), Sekolah Dasar Negeri, Taman Kanak-Kanak, Masjid, Lapangan Olahraga, dan Pasar Desa.',
  adminInfo:
    'Kantor Kepala Desa Kuanyar berlokasi di Dusun Krajan, Desa Kuanyar, Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah 59465. Pelayanan administrasi desa dilaksanakan pada hari Senin sampai Jumat, pukul 08.00 - 16.00 WIB.',
  contactInfo:
    'Alamat: Desa Kuanyar, Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah 59465. Telepon: +62 812-3456-7890. Email: info@kuanyar.desa.id.',
  lat: -6.7175,
  lng: 110.7491,
}

export interface SeedPost {
  id: number
  title: string
  slug: string
  content: string
  category: string
  publishedAt: string
  authorId: number
  coverImage?: string
  images: { imageUrl: string; caption?: string; sortOrder: number }[]
}

export const posts: SeedPost[] = [
  {
    id: 1,
    title: 'Kegiatan Maulid Nabi Fatayat NU Ranting Kuanyar',
    slug: 'peringatan-maulid-nabi-ibu-ibu-fatayat-ranting-kuanyar',
    content:
      'Kegiatan Maulid Nabi merupakan salah satu kegiatan keagamaan yang dilaksanakan oleh Fatayat NU Ranting Kuanyar sebagai bentuk kecintaan dan penghormatan kepada Nabi Muhammad SAW. Kegiatan ini menjadi momentum untuk mempererat silaturahmi antaranggota serta meningkatkan nilai-nilai keagamaan dan kebersamaan di masyarakat Desa Kuanyar.',
    category: 'Kegiatan',
    publishedAt: '2026-09-15T08:00:00.000Z',
    authorId: 1,
    coverImage: '/images/berita/maulid-nabi-fatayat/IMG_3162.PNG',
    images: [
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3162.PNG', caption: 'Suasana peringatan Maulid Nabi', sortOrder: 0 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3163.PNG', caption: 'Tausiyah Maulid Nabi', sortOrder: 1 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3164.PNG', caption: 'Dokumentasi bersama ibu-ibu Fatayat', sortOrder: 2 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3165.PNG', caption: 'Kegiatan Fatayat NU Ranting Kuanyar', sortOrder: 3 },
    ],
  },
  {
    id: 2,
    title: 'Pengajian Idaroh Fatayat NU Ranting Kuanyar',
    slug: 'acara-idaroh-ibu-ibu-fatayat-ranting-kuanyar',
    content:
      'Pengajian Idaroh merupakan salah satu program unggulan Fatayat NU Ranting Kuanyar yang dilaksanakan bersama Muslimat NU. Kegiatan ini menjadi sarana untuk mempererat silaturahmi, meningkatkan pemahaman keagamaan, serta memperkuat kebersamaan antara anggota Fatayat dan Muslimat dalam menjalankan kegiatan sosial dan keagamaan di Desa Kuanyar.',
    category: 'Kegiatan',
    publishedAt: '2026-09-15T08:00:00.000Z',
    authorId: 1,
    coverImage: '/images/berita/acara-idaroh/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg',
    images: [
      { imageUrl: '/images/berita/acara-idaroh/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg', caption: 'Ibu-ibu Fatayat mengikuti acara Idaroh', sortOrder: 0 },
      { imageUrl: '/images/berita/acara-idaroh/1b9711bb-4809-45dc-867e-8f7e00146c73.jpg', caption: 'Pembacaan sholawat dan doa bersama', sortOrder: 1 },
    ],
  },
  {
    id: 3,
    title: 'Fatayat NU Ranting Kuanyar',
    slug: 'fatayat-nu-ranting-kuanyar',
    content:
      'Fatayat NU Ranting Kuanyar merupakan organisasi perempuan muda Nahdlatul Ulama yang berdiri pada 10 April 2018. Saat ini, Fatayat NU Ranting Kuanyar dipimpin oleh Sahabat Yasalil Sairoh sebagai ketua dan Sahabat Siti Sofiatun sebagai wakil ketua, dengan jumlah sekitar 40 anggota aktif.\n\nDalam menjalankan kegiatannya, Fatayat NU Ranting Kuanyar aktif melaksanakan berbagai kegiatan keagamaan, seperti Al-Barzanji/Dziba\'iyah, pembacaan Al-Waqi\'ah, istighosah, khataman binnadhor, yasinan, serta manaqib yang dilaksanakan secara rutin di mushola maupun rumah-rumah pengurus.\n\nBeberapa program unggulan Fatayat NU Ranting Kuanyar antara lain Pengajian Idaroh bersama Muslimat, Zarkasi yang dilaksanakan setiap tahun, serta santunan yatama bersama Banom NU. Selain itu, Fatayat juga turut berkontribusi dalam berbagai kegiatan kemasyarakatan dan membantu pelaksanaan acara bersama Badan Otonom (Banom) NU di Desa Kuanyar.\n\nFatayat NU Ranting Kuanyar juga aktif membagikan informasi dan dokumentasi kegiatannya melalui media sosial dengan nama Fatayat Ranting Kuanyar di Facebook, TikTok, dan Instagram.',
    category: 'Kegiatan',
    publishedAt: '2026-09-15T08:00:00.000Z',
    authorId: 1,
    coverImage: undefined,
    images: [],
  },
]

export const categories = ['Pembangunan', 'Pemberdayaan', 'Kegiatan', 'Pertanian', 'UMKM']