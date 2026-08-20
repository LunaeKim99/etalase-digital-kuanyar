export const villageProfile = {
  id: 1,
  name: 'Desa Kuanyar',
  overview:
    'Desa Kuanyar merupakan salah satu desa di Kecamatan Mayong, Kabupaten Jepara, Jawa Tengah. Desa ini dikenal dengan potensi konveksi, kuliner, dan pertanian yang menjadi sumber ekonomi utama masyarakat setempat.',
  history:
    'Desa Kuanyar berdiri sejak zaman kolonial Belanda. Nama Kuanyar berasal dari kata "Kali" dan "Anyar" yang berarti sungai baru, merujuk pada keberadaan sungai yang melintasi desa. Seiring berjalannya waktu, desa berkembang menjadi pusat kerajinan dan perdagangan di wilayah Kecamatan Mayong.',
  vision:
    'Terwujudnya Desa Kuanyar yang maju, mandiri, sejahtera, dan berdaya saing berdasarkan nilai-nilai gotong royong dan kearifan lokal.',
  mission:
    'Meningkatkan kesejahteraan masyarakat melalui pengembangan ekonomi kerakyatan berbasis UMKM dan potensi lokal; Menyelenggarakan pemerintahan desa yang bersih, transparan, dan akuntabel; Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan; Membangun infrastruktur desa yang merata dan berkelanjutan.',
  demographics:
    'Jumlah penduduk Desa Kuanyar tercatat sekitar 4.500 jiwa dengan 1.300 kepala keluarga. Mayoritas penduduk bekerja di sektor konveksi, kuliner, dan pertanian. Rasio penduduk laki-laki dan perempuan relatif seimbang, dengan jumlah penduduk usia produktif sekitar 65%.',
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
  // === KONVEKSI ===
  {
    id: 1,
    ownerId: 2,
    name: 'MYG Collection',
    description:
      'Konveksi celana cewek dan cowok milik Bapak H. Miftah. Berdiri sejak 2015. Kapasitas produksi sekitar 1.000 pcs per bulan. Menerima pesanan custom sesuai permintaan pelanggan. Pemasaran melalui sales dan agen.',
    address: 'RT 03/RW 02, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '08708530076',
    logo: '/images/umkm/konveksi-bp-h-mif.png',
    status: 'approved',
  },
  {
    id: 2,
    ownerId: 3,
    name: 'Reza Collection',
    description:
      'Konveksi yang dikelola oleh Ibu Nur Aini. Berdiri sejak 1997. Memproduksi atasan seragam sekolah, celana anak, dan celana dewasa. Kapasitas produksi sekitar 200 pcs per minggu. Melayani pesanan dari luar desa maupun luar kota, termasuk grosir ke Pasar Kliwon.',
    address: 'RT 03/RW 02, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '081227110647',
    logo: '/images/umkm/konveksi-ibu-aini.png',
    status: 'approved',
  },
  {
    id: 3,
    ownerId: 4,
    name: 'Mila Collection',
    description:
      'Konveksi yang dikelola oleh Hj. Solikin. Berdiri sejak 2004. Memproduksi celana kulot dan celana cewek. Kapasitas produksi sekitar 500 pcs per minggu. Pemasaran dilakukan melalui pengiriman.',
    address: 'RT 01/RW 01, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '',
    logo: '/images/umkm/konveksi-bp-h-solikin.png',
    status: 'approved',
  },
  {
    id: 4,
    ownerId: 5,
    name: 'Mudah Collection',
    description:
      'Konveksi yang dikelola oleh Bu Mahmudah. Memproduksi berbagai jenis celana seperti celana kulot, celana pendek, dan celana panjang. Pemasaran melalui TikTok dan media sosial. Melayani pesanan dari luar desa maupun luar kota seperti Surabaya, Pasar Jepara, Demak, dan Kudus.',
    address: 'RT 03/RW 02, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '',
    logo: '/images/umkm/konveksi-ibu-mudah.png',
    status: 'approved',
  },
  // === KULINER ===
  {
    id: 5,
    ownerId: 6,
    name: 'Dahlia Jaya Catering',
    description:
      'Usaha catering milik Ibu Dwi Ratna Safitri. Berdiri selama 10 tahun. Menyediakan nasi box, jajan basah, bento, kue ulang tahun, tumpeng, dan snack. Produk unggulan: nasi box ayam bakar. Melayani hajatan, rapat, acara desa, dan prasmanan. Dalam satu bulan dapat menerima sekitar 30 pelanggan. Marketing: WhatsApp, Instagram @dahliajayacatering, TikTok Dahlia Jaya 1.',
    address: 'RT 05/RW 02, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '082224311491',
    logo: '/images/umkm/dahlia-jaya-catering.jpg',
    status: 'approved',
  },
  {
    id: 6,
    ownerId: 7,
    name: 'Naning Bakery',
    description:
      'Usaha catering yang telah berdiri sejak 2014. Dikelola oleh Ibu Naning. Menyediakan jajan basah, kue, roti, dessert, dan nasi box savory. Produk unggulan: roti pisang. Dalam satu bulan dapat menerima hingga 100 pesanan untuk setiap jenis produk. Pesanan digunakan untuk hajatan, rapat, dan acara lainnya.',
    address: 'RT 04/RW 03, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '085701601135',
    logo: '/images/umkm/naning-catering.jpg',
    status: 'approved',
  },
  {
    id: 7,
    ownerId: 8,
    name: 'Zakya Stik Cumi & Kuping Gajah',
    description:
      'Usaha camilan rumahan milik Bu Iswati. Memproduksi Stik Cumi-cumi sebagai produk unggulan dan Kuping Gajah. Menerima pesanan termasuk permintaan khusus dari pelanggan untuk kebutuhan grosir. Pemasaran melalui rekomendasi mulut ke mulut dan WhatsApp.',
    address: 'RT 03/RW 01, Desa Kuanyar, Mayong, Jepara',
    whatsapp: '089518557169',
    logo: '/images/umkm/umkm-stik-cumi-dan-kuping-gajah.jpg',
    status: 'approved',
  },
  // === POTENSI LAINNYA ===
  {
    id: 8,
    ownerId: 9,
    name: 'Anyaman Bambu Makmur',
    description:
      'Produksi anyaman bambu tradisional untuk kebutuhan rumah tangga dan dekorasi. Bahan baku diambil langsung dari hutan bambu Desa Kuanyar.',
    address: 'Dusun Krajan, Desa Kuanyar',
    whatsapp: '6281234567890',
    logo: 'https://picsum.photos/seed/anyaman-bambu/600/400',
    status: 'approved',
  },
  {
    id: 9,
    ownerId: 10,
    name: 'Ukir Jati Karya',
    description:
      'Spesialis ukiran kayu jati dengan motif khas Jepara. Menerima pesanan custom untuk furniture dan hiasan rumah.',
    address: 'Dusun Kembang, Desa Kuanyar',
    whatsapp: '6281234567891',
    logo: 'https://picsum.photos/seed/ukir-jati/600/400',
    status: 'approved',
  },
]

export const products: SeedProduct[] = [
  // === MYG Collection ===
  {
    id: 1,
    umkmId: 1,
    name: 'Celana Cowok Custom',
    description: 'Celana cowok produksi MYG Collection, tersedia berbagai ukuran dan warna.',
    price: 50000,
    image: '/images/umkm/konveksi-bp-h-mif.png',
    stock: 200,
    status: 'active',
  },
  {
    id: 2,
    umkmId: 1,
    name: 'Celana Cewek Custom',
    description: 'Celana cewek produksi MYG Collection, tersedia berbagai model dan warna.',
    price: 50000,
    image: '/images/umkm/konveksi-bp-h-mif.png',
    stock: 200,
    status: 'active',
  },
  // === Reza Collection ===
  {
    id: 3,
    umkmId: 2,
    name: 'Atasan Seragam Sekolah',
    description: 'Atasan seragam sekolah produksi Reza Collection, menerima pesanan custom.',
    price: 45000,
    image: '/images/umkm/konveksi-ibu-aini.png',
    stock: 100,
    status: 'active',
  },
  {
    id: 4,
    umkmId: 2,
    name: 'Celana Anak',
    description: 'Celana anak produksi Reza Collection, nyaman dan awet.',
    price: 35000,
    image: '/images/umkm/konveksi-ibu-aini.png',
    stock: 80,
    status: 'active',
  },
  {
    id: 5,
    umkmId: 2,
    name: 'Celana Dewasa',
    description: 'Celana dewasa produksi Reza Collection, tersedia berbagai ukuran.',
    price: 60000,
    image: '/images/umkm/konveksi-ibu-aini.png',
    stock: 60,
    status: 'active',
  },
  // === Mila Collection ===
  {
    id: 6,
    umkmId: 3,
    name: 'Celana Kulot',
    description: 'Celana kulot produksi Mila Collection, nyaman dan fashionable.',
    price: 55000,
    image: '/images/umkm/konveksi-bp-h-solikin.png',
    stock: 150,
    status: 'active',
  },
  {
    id: 7,
    umkmId: 3,
    name: 'Celana Cewek',
    description: 'Celana cewek produksi Mila Collection, berbagai model terbaru.',
    price: 50000,
    image: '/images/umkm/konveksi-bp-h-solikin.png',
    stock: 120,
    status: 'active',
  },
  // === Mudah Collection ===
  {
    id: 8,
    umkmId: 4,
    name: 'Celana Kulot Premium',
    description: 'Celana kulot produksi Mudah Collection, tersedia berbagai warna.',
    price: 55000,
    image: '/images/umkm/konveksi-ibu-mudah.png',
    stock: 100,
    status: 'active',
  },
  {
    id: 9,
    umkmId: 4,
    name: 'Celana Pendek',
    description: 'Celana pendek produksi Mudah Collection, nyaman untuk sehari-hari.',
    price: 40000,
    image: '/images/umkm/konveksi-ibu-mudah.png',
    stock: 80,
    status: 'active',
  },
  {
    id: 10,
    umkmId: 4,
    name: 'Celana Panjang',
    description: 'Celana panjang produksi Mudah Collection, cocok untuk berbagai acara.',
    price: 65000,
    image: '/images/umkm/konveksi-ibu-mudah.png',
    stock: 70,
    status: 'active',
  },
  // === Dahlia Jaya Catering ===
  {
    id: 11,
    umkmId: 5,
    name: 'Nasi Box Ayam Bakar',
    description: 'Nasi box ayam bakar menjadi produk unggulan Dahlia Jaya Catering.',
    price: 25000,
    image: '/images/umkm/dahlia-jaya-catering.jpg',
    stock: 30,
    status: 'active',
  },
  {
    id: 12,
    umkmId: 5,
    name: 'Bento Custom',
    description: 'Bento custom sesuai permintaan pelanggan.',
    price: 30000,
    image: '/images/umkm/dahlia-jaya-catering.jpg',
    stock: 20,
    status: 'active',
  },
  {
    id: 13,
    umkmId: 5,
    name: 'Snack Box',
    description: 'Snack box untuk berbagai acara seperti hajatan dan rapat.',
    price: 20000,
    image: '/images/umkm/dahlia-jaya-catering.jpg',
    stock: 25,
    status: 'active',
  },
  // === Naning Bakery ===
  {
    id: 14,
    umkmId: 6,
    name: 'Roti Pisang',
    description: 'Roti pisang menjadi produk unggulan Naning Bakery.',
    price: 5000,
    image: '/images/umkm/naning-catering.jpg',
    stock: 100,
    status: 'active',
  },
  {
    id: 15,
    umkmId: 6,
    name: 'Nasi Box Savory',
    description: 'Nasi box savory untuk berbagai acara.',
    price: 22000,
    image: '/images/umkm/naning-catering.jpg',
    stock: 30,
    status: 'active',
  },
  {
    id: 16,
    umkmId: 6,
    name: 'Kue Kering',
    description: 'Berbagai jenis kue kering untuk hajatan dan acara.',
    price: 40000,
    image: '/images/umkm/naning-catering.jpg',
    stock: 50,
    status: 'active',
  },
  // === Zakya ===
  {
    id: 17,
    umkmId: 7,
    name: 'Stik Cumi-cumi',
    description: 'Stik Cumi-cumi produk unggulan Zakya, cita rasa khas dan produksi rumahan.',
    price: 15000,
    image: '/images/umkm/umkm-stik-cumi.jpg',
    stock: 40,
    status: 'active',
  },
  {
    id: 18,
    umkmId: 7,
    name: 'Kuping Gajah',
    description: 'Kuping gajah produksi Zakya, camilan rumahan yang renyah.',
    price: 15000,
    image: '/images/umkm/umkm-stik-cumi-dan-kuping-gajah.jpg',
    stock: 35,
    status: 'active',
  },
  // === Anyaman Bambu ===
  {
    id: 19,
    umkmId: 8,
    name: 'Keranjang Anyaman Bambu',
    description: 'Keranjang bambu serbaguna, kuat dan tahan lama.',
    price: 45000,
    image: 'https://picsum.photos/seed/bambu-keranjang/600/400',
    stock: 25,
    status: 'active',
  },
  // === Ukir Jati ===
  {
    id: 20,
    umkmId: 9,
    name: 'Hiasan Dinding Ukir Jati',
    description: 'Hiasan dinding kayu jati dengan ukiran motif khas Jepara.',
    price: 350000,
    image: 'https://picsum.photos/seed/jati-hiasan/600/400',
    stock: 10,
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
    coverImage: '/images/berita/maulid-nabi-fatayat/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg',
    images: [
      { imageUrl: '/images/berita/maulid-nabi-fatayat/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg', caption: 'Ibu-ibu Fatayat mengikuti peringatan Maulid Nabi', sortOrder: 0 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/1b9711bb-4809-45dc-867e-8f7e00146c73.jpg', caption: 'Pembacaan sholawat bersama', sortOrder: 1 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3162.PNG', caption: 'Suasana peringatan Maulid Nabi', sortOrder: 2 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3163.PNG', caption: 'Tausiyah Maulid Nabi', sortOrder: 3 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3164.PNG', caption: 'Dokumentasi bersama ibu-ibu Fatayat', sortOrder: 4 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3165.PNG', caption: 'Kegiatan Fatayat NU Ranting Kuanyar', sortOrder: 5 },
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