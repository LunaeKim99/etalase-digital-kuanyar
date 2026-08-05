export const categories: string[] = [
  'Kerajinan',
  'Kuliner',
  'Fashion',
  'Pertanian',
  'Perikanan',
]

export interface Umkm {
  id: number
  slug: string
  name: string
  owner: string
  category: string
  phone: string
  description: string
  address: string
  image?: string
}

export interface Product {
  id: number
  slug: string
  name: string
  umkmId: number
  umkmName: string
  umkmSlug: string
  category: string
  price: number
  unit: string
  stock: number
  description: string
  image?: string
}

export const umkms: Umkm[] = [
  {
    id: 1,
    slug: 'anyaman-bambu-makmur',
    name: 'Anyaman Bambu Makmur',
    owner: 'Sutrisno',
    category: 'Kerajinan',
    phone: '6281234567890',
    description: 'Produksi anyaman bambu tradisional untuk kebutuhan rumah tangga dan dekorasi. Bahan baku diambil langsung dari hutan bambu Desa Kuanyar.',
    address: 'Dusun Krajan, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm1/600/400',
  },
  {
    id: 2,
    slug: 'ukir-jati-karya',
    name: 'Ukir Jati Karya',
    owner: 'Haryanto',
    category: 'Kerajinan',
    phone: '6282345678901',
    description: 'Pengrajin ukiran kayu jati khas Jawa dengan motif flora dan fauna. Setiap ukiran dikerjakan secara manual oleh tukang ahli.',
    address: 'Dusun Tengah, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm2/600/400',
  },
  {
    id: 3,
    slug: 'kripik-tempe-mbok-darmi',
    name: 'Kripik Tempe Mbok Darmi',
    owner: 'Darmi',
    category: 'Kuliner',
    phone: '6283456789012',
    description: 'Kripik tempe renyah dengan rasa original dan balado. Diproduksi setiap hari menggunakan kedelai pilihan dari petani lokal.',
    address: 'Dusun Kidul, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm3/600/400',
  },
  {
    id: 4,
    slug: 'batik-kuanyar',
    name: 'Batik Kuanyar',
    owner: 'Sri Wahyuni',
    category: 'Fashion',
    phone: '6284567890123',
    description: 'Batik tulis dengan corak khas desa Kuanyar yang terinspirasi dari alam sekitar. Motif daun, bunga, dan sungai menjadi ciri khasnya.',
    address: 'Dusun Lor, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm4/600/400',
  },
  {
    id: 5,
    slug: 'tani-jaya-makmur',
    name: 'Tani Jaya Makmur',
    owner: 'Bambang Sutrisno',
    category: 'Pertanian',
    phone: '6285678901234',
    description: 'Kelompok tani penghasil padi organik dan sayuran segar. Sawah seluas 5 hektar dikelola secara berkelanjutan tanpa bahan kimia.',
    address: 'Dusun Wetan, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm5/600/400',
  },
  {
    id: 6,
    slug: 'nelayan-samudra',
    name: 'Nelayan Samudra',
    owner: 'Joko Prasetyo',
    category: 'Perikanan',
    phone: '6286789012345',
    description: 'Penjualan ikan laut segar hasil tangkapan nelayan pantai selatan. Tersedia berbagai jenis ikan, udang, dan cumi.',
    address: 'Dusun Selatan, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm6/600/400',
  },
  {
    id: 7,
    slug: 'kerajinan-rotan-sari',
    name: 'Kerajinan Rotan Sari',
    owner: 'Widodo',
    category: 'Kerajinan',
    phone: '6287890123456',
    description: 'Pembuatan furnitur dan kerajinan rotan berkualitas tinggi. Kursi, meja, dan keranjang rotan menjadi produk unggulan.',
    address: 'Dusun Krajan, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm7/600/400',
  },
  {
    id: 8,
    slug: 'kopi-cengkeh-kuanyar',
    name: 'Kopi Cengkeh Kuanyar',
    owner: 'Agus Setiadi',
    category: 'Kuliner',
    phone: '6288901234567',
    description: 'Kopi robusta khas pegunungan Kuanyar dengan sentuhan cengkeh. Disangrai tradisional untuk cita rasa yang kuat dan khas.',
    address: 'Dusun Tengah, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-umkm8/600/400',
  },
]

export const products: Product[] = [
  {
    id: 1,
    slug: 'keranjang-anyaman-bambu',
    name: 'Keranjang Anyaman Bambu',
    umkmId: 1,
    umkmName: 'Anyaman Bambu Makmur',
    umkmSlug: 'anyaman-bambu-makmur',
    category: 'Kerajinan',
    price: 125000,
    unit: '0,5 kg',
    stock: 50,
    description: 'Keranjang anyaman bambu berukuran sedang, cocok untuk wadah buah atau aksesoris rumah.',
    image: 'https://picsum.photos/seed/kuanyar-p1/600/400',
  },
  {
    id: 2,
    slug: 'tikar-bambu-standar',
    name: 'Tikar Bambu Standar',
    umkmId: 1,
    umkmName: 'Anyaman Bambu Makmur',
    umkmSlug: 'anyaman-bambu-makmur',
    category: 'Kerajinan',
    price: 85000,
    unit: '1 lembar',
    stock: 30,
    description: 'Tikar anyaman bambu berukuran 2x1 meter, nyaman untuk duduk santai.',
    image: 'https://picsum.photos/seed/kuanyar-p2/600/400',
  },
  {
    id: 3,
    slug: 'ukiran-kayu-motif-burung',
    name: 'Ukiran Kayu Motif Burung',
    umkmId: 2,
    umkmName: 'Ukir Jati Karya',
    umkmSlug: 'ukir-jati-karya',
    category: 'Kerajinan',
    price: 350000,
    unit: '1 pcs',
    stock: 15,
    description: 'Panel ukiran kayu jati motif burung elang, cocok untuk hiasan dinding.',
    image: 'https://picsum.photos/seed/kuanyar-p3/600/400',
  },
  {
    id: 4,
    slug: 'kripik-tempe-original',
    name: 'Kripik Tempe Original',
    umkmId: 3,
    umkmName: 'Kripik Tempe Mbok Darmi',
    umkmSlug: 'kripik-tempe-mbok-darmi',
    category: 'Kuliner',
    price: 15000,
    unit: '250 gram',
    stock: 200,
    description: 'Kripik tempe renyah rasa original, digoreng dengan minyak kelapa pilihan.',
    image: 'https://picsum.photos/seed/kuanyar-p4/600/400',
  },
  {
    id: 5,
    slug: 'kripik-tempe-balado',
    name: 'Kripik Tempe Balado',
    umkmId: 3,
    umkmName: 'Kripik Tempe Mbok Darmi',
    umkmSlug: 'kripik-tempe-mbok-darmi',
    category: 'Kuliner',
    price: 18000,
    unit: '250 gram',
    stock: 150,
    description: 'Kripik tempe dengan bumbu balado pedas manis, cocok untuk camilan.',
    image: 'https://picsum.photos/seed/kuanyar-p5/600/400',
  },
  {
    id: 6,
    slug: 'batik-tulis-daun-kuanyar',
    name: 'Batik Tulis Daun Kuanyar',
    umkmId: 4,
    umkmName: 'Batik Kuanyar',
    umkmSlug: 'batik-kuanyar',
    category: 'Fashion',
    price: 275000,
    unit: '1 kain',
    stock: 20,
    description: 'Kain batik tulis motif daun Kuanyar, bahan katun primis premium.',
    image: 'https://picsum.photos/seed/kuanyar-p6/600/400',
  },
  {
    id: 7,
    slug: 'beras-organik-kuanyar',
    name: 'Beras Organik Kuanyar',
    umkmId: 5,
    umkmName: 'Tani Jaya Makmur',
    umkmSlug: 'tani-jaya-makmur',
    category: 'Pertanian',
    price: 75000,
    unit: '5 kg',
    stock: 100,
    description: 'Beras organik premium dari sawah tanpa pestisida, pulen dan harum.',
    image: 'https://picsum.photos/seed/kuanyar-p7/600/400',
  },
  {
    id: 8,
    slug: 'ikan-tuna-segar',
    name: 'Ikan Tuna Segar',
    umkmId: 6,
    umkmName: 'Nelayan Samudra',
    umkmSlug: 'nelayan-samudra',
    category: 'Perikanan',
    price: 65000,
    unit: '1 kg',
    stock: 40,
    description: 'Ikan tuna segar hasil tangkapan nelayan lokal, dikirim langsung dari pelabuhan.',
    image: 'https://picsum.photos/seed/kuanyar-p8/600/400',
  },
  {
    id: 9,
    slug: 'kursi-rotan-lipat',
    name: 'Kursi Rotan Lipat',
    umkmId: 7,
    umkmName: 'Kerajinan Rotan Sari',
    umkmSlug: 'kerajinan-rotan-sari',
    category: 'Kerajinan',
    price: 450000,
    unit: '1 pcs',
    stock: 10,
    description: 'Kursi rotan lipat yang ringan dan kuat, cocok untuk teras atau taman.',
    image: 'https://picsum.photos/seed/kuanyar-p9/600/400',
  },
  {
    id: 10,
    slug: 'kopi-robusta-cengkeh',
    name: 'Kopi Robusta Cengkeh',
    umkmId: 8,
    umkmName: 'Kopi Cengkeh Kuanyar',
    umkmSlug: 'kopi-cengkeh-kuanyar',
    category: 'Kuliner',
    price: 45000,
    unit: '250 gram',
    stock: 80,
    description: 'Bubuk kopi robusta robusta panggang tradisional dengan campuran cengkeh pilihan.',
    image: 'https://picsum.photos/seed/kuanyar-p10/600/400',
  },
]

export interface Tourism {
  id: number
  slug: string
  name: string
  category: string
  location: string
  lat: number
  lng: number
  description: string
  address: string
  phone?: string
  image?: string
  gallery?: string[]
  facilities?: string[]
}

export interface Culture {
  id: number
  slug: string
  name: string
  category: string
  description: string
  image?: string
  schedule?: string
  location?: string
}

export interface Event {
  id: number
  slug: string
  name: string
  date: string
  endDate?: string
  location: string
  description: string
  image?: string
}

export const tourism: Tourism[] = [
  {
    id: 1,
    slug: 'curuga-waterfall',
    name: 'Air Terjun Curuga',
    category: 'Alam',
    location: 'Dusun Curuga',
    lat: -6.62,
    lng: 110.58,
    description: 'Air terjun 2 tingkatan dengan air jernih di tengah hutan. Trekking ringan 15 menit dari parkir.',
    address: 'Dusun Curuga, Desa Kuanyar',
    phone: '6285123456789',
    image: 'https://picsum.photos/seed/kuanyar-t1/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t1a/800/600',
      'https://picsum.photos/seed/kuanyar-t1b/800/600',
      'https://picsum.photos/seed/kuanyar-t1c/800/600',
    ],
    facilities: ['Parkir', 'Toilet', 'Mushola', 'Warung'],
  },
  {
    id: 2,
    slug: 'pura-kayangan',
    name: 'Pura Kayangan',
    category: 'Budaya',
    location: 'Gunung Sari',
    lat: -6.59,
    lng: 110.61,
    description: 'Pura bersejarah arsitektur Bali kuno. Tempat ibadah dan wisata budaya.',
    address: 'Gunung Sari, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-t2/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t2a/800/600',
      'https://picsum.photos/seed/kuanyar-t2b/800/600',
    ],
    facilities: ['Parkir', 'Toilet'],
  },
  {
    id: 3,
    slug: 'pulau-melang',
    name: 'Pulau Melang',
    category: 'Pantai',
    location: 'Pantai Utara',
    lat: -6.55,
    lng: 110.72,
    description: 'Pulau kecil pasir putih, snorkeling terumbu karang, sunset spektakuler.',
    address: 'Pantai Utara, Desa Kuanyar',
    phone: '6285234567890',
    image: 'https://picsum.photos/seed/kuanyar-t3/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t3a/800/600',
      'https://picsum.photos/seed/kuanyar-t3b/800/600',
      'https://picsum.photos/seed/kuanyar-t3c/800/600',
    ],
    facilities: ['Perahu Nelayan', 'Snorkeling Gear Rental'],
  },
  {
    id: 4,
    slug: 'bukit-cengkeh',
    name: 'Bukit Cengkeh',
    category: 'Alam',
    location: 'Dusun Cengkeh',
    lat: -6.65,
    lng: 110.63,
    description: 'Perkebunan cengkeh luas dengan pemandangan bukit hijau. Spot foto & edukasi.',
    address: 'Dusun Cengkeh, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-t4/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t4a/800/600',
      'https://picsum.photos/seed/kuanyar-t4b/800/600',
    ],
    facilities: ['Parkir', 'Jalur Trekking'],
  },
  {
    id: 5,
    slug: 'sawah-subak',
    name: 'Sawah Subak Hijau',
    category: 'Agrowisata',
    location: 'Dusun Sawah',
    lat: -6.61,
    lng: 110.60,
    description: 'Sistem irigasi tradisional Subak yang dijaga. Edukasi pertanian & foto.',
    address: 'Dusun Sawah, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-t5/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t5a/800/600',
      'https://picsum.photos/seed/kuanyar-t5b/800/600',
    ],
    facilities: ['Homestay', 'Petani Pandu'],
  },
  {
    id: 6,
    slug: 'pantai-mayong',
    name: 'Pantai Mayong',
    category: 'Pantai',
    location: 'Kec. Mayong',
    lat: -6.70,
    lng: 110.68,
    description: 'Pantai pasir hitam khas pesisir utara Jawa dengan pemandangan gunung Muria.',
    address: 'Kec. Mayong, Kab. Jepara',
    image: 'https://picsum.photos/seed/kuanyar-t6/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t6a/800/600',
      'https://picsum.photos/seed/kuanyar-t6b/800/600',
    ],
    facilities: ['Warung Makan', 'Parkir Luas'],
  },
  {
    id: 7,
    slug: 'desa-kerajinan',
    name: 'Kampung Kerajinan Bambu',
    category: 'Budaya',
    location: 'Dusun Krajan',
    lat: -6.63,
    lng: 110.59,
    description: 'Kampung pengrajin bambu tradisional. Demo proses anyaman & belanja langsung.',
    address: 'Dusun Krajan, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-t7/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t7a/800/600',
      'https://picsum.photos/seed/kuanyar-t7b/800/600',
      'https://picsum.photos/seed/kuanyar-t7c/800/600',
    ],
    facilities: ['Workshop', 'Galeri Produk'],
  },
  {
    id: 8,
    slug: 'masjid-agung',
    name: 'Masjid Agung Kuanyar',
    category: 'Religi',
    location: 'Dusun Tengah',
    lat: -6.60,
    lng: 110.60,
    description: 'Masjid bersejarah arsitektur Jawa-Demak. Tempat ziarah & wisata religius.',
    address: 'Dusun Tengah, Desa Kuanyar',
    image: 'https://picsum.photos/seed/kuanyar-t8/800/600',
    gallery: [
      'https://picsum.photos/seed/kuanyar-t8a/800/600',
      'https://picsum.photos/seed/kuanyar-t8b/800/600',
    ],
    facilities: ['Parkir', 'Ruang Wudhu'],
  },
]

export const cultures: Culture[] = [
  {
    id: 1,
    slug: 'tari-kuanyar',
    name: 'Tari Tradisional Kuanyar',
    category: 'Seni Pertunjukan',
    description: 'Tarian khas pesisir menggambarkan kehidupan nelayan & petani. Ditampilkan di festival.',
    image: 'https://picsum.photos/seed/kuanyar-c1/800/600',
    schedule: 'Setiap festival desa & hari raya',
    location: 'Balai Desa',
  },
  {
    id: 2,
    slug: 'sedekah-laut',
    name: 'Sedekah Laut',
    category: 'Tradisi',
    description: 'Upacara tahunan mengeluarkan sesaji ke laut sebagai syukur hasil tangkapan.',
    image: 'https://picsum.photos/seed/kuanyar-c2/800/600',
    schedule: 'Bulan Syawal',
    location: 'Pantai Kuanyar',
  },
  {
    id: 3,
    slug: 'nyadran',
    name: 'Nyadran',
    category: 'Tradisi',
    description: 'Ziarah kubur leluhur berserta doa bersama dan makanan tradisional.',
    image: 'https://picsum.photos/seed/kuanyar-c3/800/600',
    schedule: 'Sebelum Ramadhan',
    location: 'Makam Desa',
  },
  {
    id: 4,
    slug: 'gamelan-desa',
    name: 'Gamelan Desa Kuanyar',
    category: 'Seni Musik',
    description: 'Karawitan jawa tradisional dimainkan generasi muda untuk pelestarian.',
    image: 'https://picsum.photos/seed/kuanyar-c4/800/600',
    schedule: 'Latihan Minggu sore',
    location: 'Balai Desa',
  },
  {
    id: 5,
    slug: 'batik-pesisir',
    name: 'Batik Tulis Pesisir',
    category: 'Kerajinan',
    description: 'Batik tulis motif pesisir (laut, ikan, karang) pewarna alami.',
    image: 'https://picsum.photos/seed/kuanyar-c5/800/600',
    schedule: 'Produksi harian',
    location: 'UKM Batik Mbok Darmi',
  },
  {
    id: 6,
    slug: 'wayang-kulit',
    name: 'Wayang Kulit Desa',
    category: 'Seni Pertunjukan',
    description: 'Pewayangan tradisional cerita Mahabharata & Ramayana dialek Jawa.',
    image: 'https://picsum.photos/seed/kuanyar-c6/800/600',
    schedule: 'Acara khusus',
    location: 'Balai Desa',
  },
]

export const events: Event[] = [
  {
    id: 1,
    slug: 'festival-budaya-kuanyar',
    name: 'Festival Budaya Kuanyar',
    date: '2025-08-15',
    endDate: '2025-08-17',
    location: 'Lapangan Desa Kuanyar',
    description: 'Festival 3 hari: pertunjukan tari, musik, pameran UMKM, kuliner, lomba.',
    image: 'https://picsum.photos/seed/kuanyar-e1/800/600',
  },
  {
    id: 2,
    slug: 'sedekah-laut-2025',
    name: 'Sedekah Laut 2025',
    date: '2025-05-10',
    location: 'Pantai Kuanyar',
    description: 'Upacara tradisional tahunan bersama nelayan dan masyarakat.',
    image: 'https://picsum.photos/seed/kuanyar-e2/800/600',
  },
  {
    id: 3,
    slug: 'lomba-ukir-kayu',
    name: 'Lomba Ukir Kayu Tingkat Desa',
    date: '2025-09-20',
    location: 'Balai Desa',
    description: 'Kompetisi ukiran kayu untuk generasi muda.',
    image: 'https://picsum.photos/seed/kuanyar-e3/800/600',
  },
  {
    id: 4,
    slug: 'wisata-malab',
    name: 'Wisata Malam di Air Terjun Curuga',
    date: '2025-07-25',
    location: 'Air Terjun Curuga',
    description: 'Acara malam: camping, api unggun, observasi bintang.',
    image: 'https://picsum.photos/seed/kuanyar-e4/800/600',
  },
  {
    id: 5,
    slug: 'pasar-umat',
    name: 'Pasar Umat Mingguan',
    date: '2025-01-01',
    endDate: '2025-12-31',
    location: 'Lapangan Desa',
    description: 'Pasar mingguan produk UMKM & hasil pertanian.',
    image: 'https://picsum.photos/seed/kuanyar-e5/800/600',
  },
]

export interface GalleryItem {
  id: number
  type: 'foto' | 'video'
  title: string
  category: string
  image: string
  videoUrl?: string
  createdAt: string
}

export interface GalleryCategory {
  id: string
  label: string
}

export const galleryCategories: GalleryCategory[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'umkm', label: 'UMKM' },
  { id: 'wisata', label: 'Wisata' },
  { id: 'budaya', label: 'Budaya' },
  { id: 'kegiatan', label: 'Kegiatan' },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: 'foto',
    title: 'Workshop Anyaman Bambu',
    category: 'umkm',
    image: 'https://picsum.photos/seed/kuanyar-gal1/600/400',
    createdAt: '2025-01-15',
  },
  {
    id: 2,
    type: 'foto',
    title: 'Panen Padi Subak',
    category: 'kegiatan',
    image: 'https://picsum.photos/seed/kuanyar-gal2/600/400',
    createdAt: '2025-02-20',
  },
  {
    id: 3,
    type: 'foto',
    title: 'Tari Kolosal Festival',
    category: 'budaya',
    image: 'https://picsum.photos/seed/kuanyar-gal3/600/400',
    createdAt: '2025-03-12',
  },
  {
    id: 4,
    type: 'foto',
    title: 'Sunset Pulau Melang',
    category: 'wisata',
    image: 'https://picsum.photos/seed/kuanyar-gal4/600/400',
    createdAt: '2025-04-05',
  },
  {
    id: 5,
    type: 'foto',
    title: 'Batik Tulis Motif Pesisir',
    category: 'umkm',
    image: 'https://picsum.photos/seed/kuanyar-gal5/600/400',
    createdAt: '2025-05-18',
  },
  {
    id: 6,
    type: 'foto',
    title: 'Gotong Royong Perbaikan Jalan',
    category: 'kegiatan',
    image: 'https://picsum.photos/seed/kuanyar-gal6/600/400',
    createdAt: '2025-06-22',
  },
  {
    id: 7,
    type: 'foto',
    title: 'Air Terjun Curuga',
    category: 'wisata',
    image: 'https://picsum.photos/seed/kuanyar-gal7/600/400',
    createdAt: '2025-07-30',
  },
  {
    id: 8,
    type: 'foto',
    title: 'Rapat Kerja Bulanan',
    category: 'kegiatan',
    image: 'https://picsum.photos/seed/kuanyar-gal8/600/400',
    createdAt: '2025-08-10',
  },
  {
    id: 9,
    type: 'video',
    title: 'Profil Kampung Kerajinan Bambu',
    category: 'umkm',
    image: 'https://picsum.photos/seed/kuanyar-vid9/600/400',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    createdAt: '2025-01-25',
  },
  {
    id: 10,
    type: 'video',
    title: 'Festival Budaya Kuanyar 2024',
    category: 'budaya',
    image: 'https://picsum.photos/seed/kuanyar-vid10/600/400',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    createdAt: '2025-04-14',
  },
  {
    id: 11,
    type: 'video',
    title: 'Tour Wisata Alam Kuanyar',
    category: 'wisata',
    image: 'https://picsum.photos/seed/kuanyar-vid11/600/400',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    createdAt: '2025-06-08',
  },
  {
    id: 12,
    type: 'video',
    title: 'Panen Raya Musim Gaduh',
    category: 'kegiatan',
    image: 'https://picsum.photos/seed/kuanyar-vid12/600/400',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    createdAt: '2025-09-01',
  },
]

export interface ArticleCategory {
  id: string
  label: string
}

export const articleCategories: ArticleCategory[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'berita', label: 'Berita' },
  { id: 'ekonomi', label: 'Ekonomi' },
  { id: 'budaya', label: 'Budaya' },
  { id: 'wisata', label: 'Wisata' },
  { id: 'pembangunan', label: 'Pembangunan' },
]

export interface Article {
  id: number
  slug: string
  title: string
  category: string
  author: string
  date: string
  cover: string
  excerpt: string
  content: string
  createdAt: string
}

export const articles: Article[] = [
  {
    id: 1,
    slug: 'festival-budaya-kuanyar-2025',
    title: 'Festival Budaya Kuanyar 2025 Dibuka',
    category: 'budaya',
    author: 'Admin Desa',
    date: '2025-08-01',
    cover: 'https://picsum.photos/seed/kuanyar-art1/800/400',
    excerpt: 'Festival budaya tahunan kembali digelar di Desa Kuanyar dengan rangkaian acara yang lebih meriah dan menarik.',
    content:
      'Festival Budaya Kuanyar 2025 secara resmi dibuka di Lapangan Desa Kuanyar pada hari pertama Agustus. Acara ini menggambarkan kekayaan budaya lokal melalui pertunjukan tari tradisional, musik, dan pameran seni. Peserta dari seluruh dusun se-Desa Kuanyar turun untuk memamerikan kearifan lokal mereka.\n\nPartisipasi masyarakat sangatlah meriah. Warga tidak hanya hadir sebagai penonton, tetapi juga terlibat langsung dalam berbagai lomba budaya yang diselenggarakan. Ini menciptakan kehangatan dan kebersamaan yang kuat, mempererat ikatan sosial antarwarga.\n\nDampak ekonomi dari festival ini terasa signifikan. Pedagang dan UMKM lokal merush rodio dapat pelanggan baru yang banyak. Pemerata berharap, event ini menjadi pendorong pembaruan ekonomi desa berkelanjutan.',
    createdAt: '2025-08-01',
  },
  {
    id: 2,
    slug: 'umkm-anyaman-mendunia',
    title: 'UMKM Anyaman Bambu Kuanyar Menembus Pasar Luar Negeri',
    category: 'ekonomi',
    author: 'Dinas Koperasi',
    date: '2025-07-15',
    cover: 'https://picsum.photos/seed/kuanyar-art2/800/400',
    excerpt: 'Anyaman bambu asli Desa Kuanyar kini mendapatkan pengakuan internasional berkat kerja sama pemerintah desa dengan pelaku UMKM.',
    content:
      'Produk anyaman bambu dari UMKM di Dusun Krajan berhasil masuk ke pasar ekspor. Kerja sama dengan platform e-commerce internasional dan pelatihan desain yang diberikan oleh pemerintah desa menjadi kunci utama kesuksesan ini.\n\nDukungan pemasaran yang dilakukan melalui event nasional maupun partisipasi pameran kerajinan memberikan exposure yang luas. Konsumen asing tertarik dengan estetika alami dan nilai budaya yang terkandung dalam setiap karya anyaman bambu.\n\nPendapatan para pengrajin pun mengalami peningkatan signifikan. Pemerintah desa berupaya menjaga kualitas tetap tinggi dan menjaga keberlanjutan sumber daya bambu dengan kebijakan pengelolaan hutan yang bertanggung jawab.',
    createdAt: '2025-07-15',
  },
  {
    id: 3,
    slug: 'panen-padi-musim-gaduh',
    title: 'Panen Raya Padi Musim Gaduh Hasil Meningkat 15%',
    category: 'berita',
    author: 'KP3K',
    date: '2025-06-20',
    cover: 'https://picsum.photos/seed/kuanyar-art3/800/400',
    excerpt: 'Panen musim gaduh di sawah subak Desa Kuanyar menghasilkan produktivitas yang lebih baik dibandingkan musim sebelumnya.',
    content:
      'Panen padi musim gaduh yang dilaksanakan pada Juni lalu membuktikan hasil yang mengejutkan. Kelompok tani Tani Jaya Makmur melaporkan peningkatan hasil hingga 15% berkat optimasi irigasi Subak dan penggunaan benih unggul yang disubsidikan oleh pemerintah.\n\nKegiatan panen raya turut diikuti perangkat desa dan warga sekitar. Gotong royong menyalakan semangat kebersamaan sekaligus memastikan proses panen berjalan efisien dan merata.\n\nPemerintah desa berencana memperluas lahan pertanaman padi organik di lahan pasca panen. Harapannya, inovasi ini dapat meningkatkan ketahanan pangan dan pendapatan petani di Desa Kuanyar.',
    createdAt: '2025-06-20',
  },
  {
    id: 4,
    slug: 'digitalisasi-layanan-desa',
    title: 'Digitalisasi Layanan Desa: Semua Kini Lebih Mudah',
    category: 'pembangunan',
    author: 'Admin Desa',
    date: '2025-05-10',
    cover: 'https://picsum.photos/seed/kuanyar-art4/800/400',
    excerpt: 'Sistem layanan desa kini tersedia secara online, mempermudah warga mengakses berbagai keperluan administrasi.',
    content:
      'Layanan publik di Desa Kuanyar resmi masuk era digital. Mulai dari pembuatan KTP, surat keterangan tidak mampu, hingga pengajuan izin kegiatan, semuanya dapat dilakukan melalui portal desa yang telah diluncurkan.\n\nSistem ini mendukung notifikasi berbasis SMS dan aplikasi untuk memastikan warga mendapatkan informasi terbaru. Integrasi dengan database nasional pun dilakukan untuk mencegah duplikasi data dan memastikan keabsahan dokumen.\n\nResponden warga desa memberikan apresiasi atas kemudahan baru ini. Perluasan cakupan jaringan dan pelatihan literasi digital untuk warga tetap menjadi fokus pengembangan berikutnya.',
    createdAt: '2025-05-10',
  },
  {
    id: 5,
    slug: 'pelestarian-sedekah-laut',
    title: 'Pelestarian Tradisi Sedekah Laut di Pesisir Kuanyar',
    category: 'budaya',
    author: 'Budayawan',
    date: '2025-04-22',
    cover: 'https://picsum.photos/seed/kuanyar-art5/800/400',
    excerpt: 'Tradisi turun-temurun Sedekah Laut tetap dilestarikan sebagai warisan budaya kebanggaan masyarakat pesisir.',
    content:
      'Tradisi Sedekah Laut yang telah turun-temurun turun ke generasi keempat tetap dijaga keasliannya. Setiap tahunnya, warga pesisir melakukan upacara syukur dengan menyajikan makanan tradisional ke laut.\n\nUpacara ini diiringi dengan pertunjukan tari tradisional yang menggambarkan proses penangkapan ikan dan kehidupan nelayan. Para generasi muda diajak menjaga dan mempelajari makna filosofi tradisi ini.\n\nPemerintah desa bekerja sama dengan kelompok budaya lokal untuk mendokumentasikan proses ritual secara video dan melatih anak-anak desa sebagai pelopor generasi berikutnya.',
    createdAt: '2025-04-22',
  },
  {
    id: 6,
    slug: 'wisata-curuga-baru',
    title: 'Air Terjun Curuga Raih Sertifikasi Destinasi Aman',
    category: 'wisata',
    author: 'Dinas Pariwisata',
    date: '2025-03-18',
    cover: 'https://picsum.photos/seed/kuanyar-art6/800/400',
    excerpt: 'Air Terjun Curuga resmi mendapatkan sertifikasi tempat wisata yang aman untuk dikunjungi oleh wisatawan.',
    content:
      'Setelah melewati proses audit ketat, Air Terjun Curuga berhasil meraih sertifikasi Destinasi Wisata Aman dari otoritas pariwisata nasional. Standar keamanan yang harus dipenuhi mencakup jalur pendakian yang aman, prasarana penolong kesehatan, dan protokol kehilangan lingkungan.\n\nSertifikasi ini membuka peluang bagi wisatawan lokal dan mancanegara untuk merasakan keindahan alam yang ditawarkan. Akses jalan ke lokasi juga semakin baik berkat proyek infrastruktur yang digerakan pemerintah.\n\nPemerintah desa bersama komunitas wisata setempat berkomitmen menjaga kebersihan dan keamanan pengunjung. Program edukasi keamanan bagi pengunjung baru juga rutin dilaksanakan.',
    createdAt: '2025-03-18',
  },
  {
    id: 7,
    slug: 'pelatihan-ukir-muda',
    title: 'Pelatihan Ukir Kayu untuk Generasi Muda',
    category: 'ekonomi',
    author: 'PKK Desa',
    date: '2025-02-10',
    cover: 'https://picsum.photos/seed/kuanyar-art7/800/400',
    excerpt: 'Generasi muda setempat dilatih keterampilan ukir kayu untuk meningkatkan nilai ekonomi komunitas.',
    content:
      'Program pelatihan ukir kayu yang digelar oleh PKK Desa memberikan kesempatan bagi anak muda untuk mendalami seni ukir tradisional. Materi mencakup dasar-dasar teknik pemotongan, pola tradisional, hingga penggunaan lukisan berfiturat.\n\nDengan keterampilan baru, para peserta dilatih untuk mengembangkan produk unik yang dapat dijual baik langsung maupun secara online. Pembinaan ini bertujuan menciptakan alternatif pendapatan yang berkelanjutan.\n\nPelatihan selanjutnya akan dilanjutkan secara berkala dan melibatkan tukang ahli lokal sebagai instruktur. Pemerintah desa juga menyediakan bantuan material dasar untuk para peserta yang ingin memulai usaha.',
    createdAt: '2025-02-10',
  },
]

