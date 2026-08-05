export const villageProfile = {
  id: 1,
  name: 'Desa Kuanyar',
  overview:
    'Desa Kuanyar merupakan salah satu desa di Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah. Desa ini dikenal dengan potensi pertanian, kerajinan anyaman bambu, dan kerajinan ukir jati yang menjadi sumber ekonomi utama masyarakat setempat.',
  history:
    'Desa Kuanyar berdiri sejak zaman kolonial Belanda. Nama Kuanyar berasal dari kata "Kali" dan "Anyar" yang berarti sungai baru, merujuk pada keberadaan sungai yang melintasi desa. Seiring berjalannya waktu, desa berkembang menjadi pusat kerajinan dan perdagangan di wilayah Kecamatan Mayong.',
  vision:
    'Terwujudnya Desa Kuanyar yang maju, mandiri, sejahtera, dan berdaya saing berdasarkan nilai-nilai gotong royong dan kearifan lokal.',
  mission:
    'Meningkatkan kesejahteraan masyarakat melalui pengembangan ekonomi kerakyatan berbasis UMKM dan potensi lokal; Menyelenggarakan pemerintahan desa yang bersih, transparan, dan akuntabel; Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan; Membangun infrastruktur desa yang merata dan berkelanjutan.',
  demographics:
    'Jumlah penduduk Desa Kuanyar tercatat sekitar 4.500 jiwa dengan 1.300 kepala keluarga. Mayoritas penduduk bekerja di sektor pertanian dan kerajinan. Rasio penduduk laki-laki dan perempuan relatif seimbang, dengan jumlah penduduk usia produktif sekitar 65%.',
  facilities:
    'Desa Kuanyar memiliki berbagai fasilitas umum antara lain: Balai Desa, Kantor Pemerintah Desa, Puskesmas Pembantu (Pustu), Sekolah Dasar Negeri, Taman Kanak-Kanak, Masjid, Lapangan Olahraga, dan Pasar Desa.',
  adminInfo:
    'Kantor Kepala Desa Kuanyar berlokasi di Dusun Krajan, Desa Kuanyar, Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah 59465. Pelayanan administrasi desa dilaksanakan pada hari Senin sampai Jumat, pukul 08.00 - 16.00 WIB.',
  contactInfo:
    'Alamat: Desa Kuanyar, Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah 59465. Telepon: +62 812-3456-7890. Email: info@kuanyar.desa.id.',
  lat: -6.7175,
  lng: 110.7491,
}

export interface SeedUmkm {
  id: number
  ownerId: number
  name: string
  description: string
  address: string
  whatsapp: string
  logo: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface SeedProduct {
  id: number
  umkmId: number
  name: string
  description: string
  price: number
  image: string
  stock: number
  status: 'active' | 'draft' | 'inactive'
}

export const umkms: SeedUmkm[] = [
  {
    id: 1,
    ownerId: 2,
    name: 'Anyaman Bambu Makmur',
    description: 'Produksi anyaman bambu tradisional untuk kebutuhan rumah tangga dan dekorasi. Bahan baku diambil langsung dari hutan bambu Desa Kuanyar.',
    address: 'Dusun Krajan, Desa Kuanyar',
    whatsapp: '6281234567890',
    logo: 'https://picsum.photos/seed/kuanyar-umkm1/600/400',
    status: 'approved',
  },
  {
    id: 2,
    ownerId: 3,
    name: 'Ukir Jati Karya',
    description: 'Spesialis ukiran kayu jati dengan motif khas Jepara. Menerima pesanan custom untuk furniture dan hiasan rumah.',
    address: 'Dusun Kembang, Desa Kuanyar',
    whatsapp: '6281234567891',
    logo: 'https://picsum.photos/seed/kuanyar-umkm2/600/400',
    status: 'approved',
  },
  {
    id: 3,
    ownerId: 4,
    name: 'Kopi Arabika Kuanyar',
    description: 'Kopi arabika khas dataran tinggi, diolah secara manual dengan metode natural process. Rasa khas dan cita rasa premium.',
    address: 'Dusun Makam, Desa Kuanyar',
    whatsapp: '6281234567892',
    logo: 'https://picsum.photos/seed/kuanyar-umkm3/600/400',
    status: 'approved',
  },
  {
    id: 4,
    ownerId: 5,
    name: 'Batik Kuanyar',
    description: 'Batik tulis khas Kuanyar dengan motif flora dan fauna lokal. Pewarna alami dari tanaman sekitar.',
    address: 'Dusun Pandak, Desa Kuanyar',
    whatsapp: '6281234567893',
    logo: 'https://picsum.photos/seed/kuanyar-umkm4/600/400',
    status: 'approved',
  },
  {
    id: 5,
    ownerId: 6,
    name: 'Madu Hutan Kuanyar',
    description: 'Madu hutan murni dari kawasan hutan desa, dipanen oleh petani madu lokal. Kaya manfaat untuk kesehatan.',
    address: 'Dusun Krajan, Desa Kuanyar',
    whatsapp: '6281234567894',
    logo: 'https://picsum.photos/seed/kuanyar-umkm5/600/400',
    status: 'pending',
  },
  {
    id: 6,
    ownerId: 7,
    name: 'Kue Kering Lestari',
    description: 'Produksi kue kering khas Jepara seperti nastar, kastengel, dan kue kacang untuk berbagai acara.',
    address: 'Dusun Kembang, Desa Kuanyar',
    whatsapp: '6281234567895',
    logo: 'https://picsum.photos/seed/kuanyar-umkm6/600/400',
    status: 'approved',
  },
]

export const products: SeedProduct[] = [
  {
    id: 1,
    umkmId: 1,
    name: 'Keranjang Anyaman Bambu',
    description: 'Keranjang bambu serbaguna, kuat dan tahan lama.',
    price: 45000,
    image: 'https://picsum.photos/seed/kuanyar-prod1/600/400',
    stock: 25,
    status: 'active',
  },
  {
    id: 2,
    umkmId: 1,
    name: 'Tempat Tisu Bambu',
    description: 'Tempat tisu berbahan bambu dengan desain minimalis.',
    price: 25000,
    image: 'https://picsum.photos/seed/kuanyar-prod2/600/400',
    stock: 40,
    status: 'active',
  },
  {
    id: 3,
    umkmId: 2,
    name: 'Hiasan Dinding Ukir Jati',
    description: 'Hiasan dinding kayu jati dengan ukiran motif khas Jepara.',
    price: 350000,
    image: 'https://picsum.photos/seed/kuanyar-prod3/600/400',
    stock: 10,
    status: 'active',
  },
  {
    id: 4,
    umkmId: 3,
    name: 'Kopi Arabika 250gr',
    description: 'Kopi arabika bubuk kualitas premium, 250 gram.',
    price: 65000,
    image: 'https://picsum.photos/seed/kuanyar-prod4/600/400',
    stock: 50,
    status: 'active',
  },
  {
    id: 5,
    umkmId: 4,
    name: 'Kain Batik Tulis',
    description: 'Kain batik tulis motif flora lokal, pewarna alami.',
    price: 250000,
    image: 'https://picsum.photos/seed/kuanyar-prod5/600/400',
    stock: 15,
    status: 'active',
  },
  {
    id: 6,
    umkmId: 5,
    name: 'Madu Hutan 500ml',
    description: 'Madu hutan murni, 500 mililiter.',
    price: 85000,
    image: 'https://picsum.photos/seed/kuanyar-prod6/600/400',
    stock: 30,
    status: 'draft',
  },
  {
    id: 7,
    umkmId: 6,
    name: 'Nastar Nanas',
    description: 'Kue nastar isi selai nanas asli.',
    price: 60000,
    image: 'https://picsum.photos/seed/kuanyar-prod7/600/400',
    stock: 20,
    status: 'active',
  },
  {
    id: 8,
    umkmId: 6,
    name: 'Kastengel Keju',
    description: 'Kue kastengel rasa keju premium.',
    price: 75000,
    image: 'https://picsum.photos/seed/kuanyar-prod8/600/400',
    stock: 18,
    status: 'active',
  },
]

export interface SeedPost {
  id: number
  title: string
  slug: string
  content: string
  category: string
  publishedAt: string
  authorId: number
  coverImage: string
  images: { imageUrl: string; caption?: string; sortOrder: number }[]
}

export const posts: SeedPost[] = [
  {
    id: 1,
    title: 'Pembangunan Jalan Desa Kuanyar Rampung',
    slug: 'pembangunan-jalan-desa-kuanyar-rampung',
    content:
      'Pembangunan jalan desa Kuanyar sepanjang 1,5 kilometer telah resmi rampung dan diresmikan oleh Kepala Desa. Jalan ini menghubungkan Dusun Krajan dengan Dusun Kembang, mempermudah akses transportasi warga dan distribusi hasil panen.',
    category: 'Pembangunan',
    publishedAt: '2026-07-20T08:00:00.000Z',
    authorId: 1,
    coverImage: 'https://picsum.photos/seed/kuanyar-berita1/800/450',
    images: [
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita1a/800/450', caption: 'Peresmian jalan desa', sortOrder: 0 },
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita1b/800/450', caption: 'Kondisi jalan setelah pembangunan', sortOrder: 1 },
    ],
  },
  {
    id: 2,
    title: 'Pelatihan UMKM Digitalisasi Produk',
    slug: 'pelatihan-umkm-digitalisasi-produk',
    content:
      'Pemerintah Desa Kuanyar bersama Dinas Koperasi dan UMKM mengadakan pelatihan digitalisasi produk bagi pelaku UMKM. Pelatihan ini mencakup fotografi produk, pengelolaan marketplace, dan strategi pemasaran digital.',
    category: 'Pemberdayaan',
    publishedAt: '2026-07-15T08:00:00.000Z',
    authorId: 1,
    coverImage: 'https://picsum.photos/seed/kuanyar-berita2/800/450',
    images: [
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita2a/800/450', caption: 'Sesi fotografi produk', sortOrder: 0 },
    ],
  },
  {
    id: 3,
    title: 'Festival Kuliner Kuanyar 2026',
    slug: 'festival-kuliner-kuanyar-2026',
    content:
      'Festival kuliner Desa Kuanyar tahun 2026 sukses digelar dengan diikuti puluhan stand UMKM kuliner. Acara ini menjadi ajang promosi produk kuliner khas desa dan menarik ratusan pengunjung dari berbagai daerah.',
    category: 'Kegiatan',
    publishedAt: '2026-07-01T08:00:00.000Z',
    authorId: 1,
    coverImage: 'https://picsum.photos/seed/kuanyar-berita3/800/450',
    images: [
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita3a/800/450', caption: 'Suasana festival kuliner', sortOrder: 0 },
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita3b/800/450', caption: 'Stand UMKM kuliner', sortOrder: 1 },
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita3c/800/450', caption: 'Pengunjung festival', sortOrder: 2 },
    ],
  },
  {
    id: 4,
    title: 'Gotong Royong Bersih Desa',
    slug: 'gotong-royong-bersih-desa',
    content:
      'Warga Desa Kuanyar melaksanakan kegiatan gotong royong membersihkan lingkungan desa dalam rangka menyambut Hari Kemerdekaan Republik Indonesia. Kegiatan ini diikuti oleh seluruh elemen masyarakat.',
    category: 'Kegiatan',
    publishedAt: '2026-06-25T08:00:00.000Z',
    authorId: 1,
    coverImage: 'https://picsum.photos/seed/kuanyar-berita4/800/450',
    images: [
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita4a/800/450', caption: 'Warga gotong royong', sortOrder: 0 },
    ],
  },
  {
    id: 5,
    title: 'Panen Raya Padi di Sawah Kuanyar',
    slug: 'panen-raya-padi-di-sawah-kuanyar',
    content:
      'Musim panen raya padi di sawah Desa Kuanyar menghasilkan panen yang melimpah. Para petani berhasil meningkatkan hasil panen berkat penggunaan bibit unggul dan sistem irigasi yang diperbaiki.',
    category: 'Pertanian',
    publishedAt: '2026-06-10T08:00:00.000Z',
    authorId: 1,
    coverImage: 'https://picsum.photos/seed/kuanyar-berita5/800/450',
    images: [
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita5a/800/450', caption: 'Sawah siap panen', sortOrder: 0 },
    ],
  },
  {
    id: 6,
    title: 'Pasar Digital Desa Kuanyar Resmi Diluncurkan',
    slug: 'pasar-digital-desa-kuanyar-resmi-diluncurkan',
    content:
      'Pemerintah desa meluncurkan platform etalase digital untuk mempromosikan produk UMKM lokal. Platform ini memungkinkan warga dan pembeli dari luar daerah untuk melihat dan memesan produk UMKM Desa Kuanyar secara online.',
    category: 'Pemberdayaan',
    publishedAt: '2026-05-30T08:00:00.000Z',
    authorId: 1,
    coverImage: 'https://picsum.photos/seed/kuanyar-berita6/800/450',
    images: [
      { imageUrl: 'https://picsum.photos/seed/kuanyar-berita6a/800/450', caption: 'Peluncuran etalase digital', sortOrder: 0 },
    ],
  },
]

export const categories = ['Pembangunan', 'Pemberdayaan', 'Kegiatan', 'Pertanian', 'UMKM']