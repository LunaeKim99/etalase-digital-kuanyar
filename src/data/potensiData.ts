export interface PotensiItem {
  id: string
  name: string
  description: string
  image?: string
  features?: string[]
}

export interface PotensiCategory {
  slug: string
  title: string
  description: string
  icon: string
  color: string
  lightColor: string
}

export const categories: PotensiCategory[] = [
  {
    slug: 'umkm',
    title: 'UMKM',
    description: 'Usaha Mikro Kecil dan Menengah yang menjadi tulang punggung ekonomi desa.',
    icon: 'Store',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
  },
  {
    slug: 'pertanian',
    title: 'Pertanian',
    description: 'Lahan pertanian padi, jagung, dan palawija yang subur.',
    icon: 'Wheat',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
  },
  {
    slug: 'perkebunan',
    title: 'Perkebunan',
    description: 'Kebun cengkeh, kelapa, dan tanaman keras lainnya.',
    icon: 'TreePine',
    color: 'bg-lime-500',
    lightColor: 'bg-lime-50',
  },
  {
    slug: 'peternakan',
    title: 'Peternakan',
    description: 'Usaha peternakan sapi, kambing, dan unggas.',
    icon: 'Sprout',
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
  },
  {
    slug: 'perikanan',
    title: 'Perikanan',
    description: 'Hasil laut dan perikanan air tawar yang melimpah.',
    icon: 'Fish',
    color: 'bg-sky-500',
    lightColor: 'bg-sky-50',
  },
  {
    slug: 'kerajinan',
    title: 'Kerajinan',
    description: 'Industri kerajinan tangan dari bambu, kayu, dan rotan.',
    icon: 'Hammer',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
  },
  {
    slug: 'wisata',
    title: 'Wisata',
    description: 'Destinasi wisata alam dan budaya yang menarik.',
    icon: 'Camera',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
  },
  {
    slug: 'budaya',
    title: 'Budaya',
    description: 'Tradisi dan kearifan lokal Desa Kuanyar.',
    icon: 'Music',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
  },
]

export const categoryItems: Record<string, PotensiItem[]> = {
  umkm: [
    {
      id: 'umkm-1',
      name: 'UMKM Anyaman Bambu',
      description:
        'Kerajinan anyaman bambu khas Desa Kuanyar yang dikerjakan secara turun-temurun. Beragam produk seperti besek, kipas, dan kap lampu dipasarkan hingga luar kota.',
      features: ['Pengerjaan handmade', 'Bahan bambu lokal'],
    },
    {
      id: 'umkm-2',
      name: 'UMKM Ukir Kayu',
      description:
        'Sentra ukir kayu yang menghasilkan patung, relief, dan hiasan interior berkualitas tinggi. Menerima pesanan custom sesuai permintaan pembeli.',
      features: ['Desain custom', 'Kayu jati pilihan'],
    },
    {
      id: 'umkm-3',
      name: 'UMKM Kripik Tempe',
      description:
        'Produksi kripik tempe dengan cita rasa gurih dan renyah. Dikemas higienis dan tersedia dalam berbagai varian rasa.',
      features: ['Varian rasa', 'Kemasan higienis'],
    },
    {
      id: 'umkm-4',
      name: 'UMKM Batik Tulis',
      description:
        'Pembuatan batik tulis bermotif khas pesisir Kuanyar. Proses pembuatan yang teliti menghasilkan kain dengan nilai seni tinggi.',
      features: ['Motif khas lokal', 'Pewarna alami'],
    },
  ],
  pertanian: [
    {
      id: 'pertanian-1',
      name: 'Padi Sawah',
      description:
        'Budidaya padi sawah irigasi yang menjadi komoditas utama pertanian desa. Hasil panen dua kali setahun dengan kualitas beras yang pulen.',
      features: ['Dua kali panen', 'Irigasi teknis'],
    },
    {
      id: 'pertanian-2',
      name: 'Jagung',
      description:
        'Tanaman jagung hibrida ditanam pada musim kemarau di lahan tegalan. Hasilnya dipasok untuk pakan ternak dan industri olahan.',
      features: ['Jagung hibrida', 'Pasokan pakan ternak'],
    },
    {
      id: 'pertanian-3',
      name: 'Kedelai',
      description:
        'Kedelai lokal ditanam sebagai tanaman palawija pendukung kebutuhan bahan baku tempe dan tahu di sekitar desa.',
      features: ['Bahan baku tempe', 'Pola tanam rotasi'],
    },
  ],
  perkebunan: [
    {
      id: 'perkebunan-1',
      name: 'Kebun Cengkeh',
      description:
        'Perkebunan cengkeh yang tersebar di dataran tinggi desa. Cengkeh kering berkualitas tinggi menjadi komoditas ekspor andalan.',
      features: ['Cengkeh kering premium', 'Komoditas ekspor'],
    },
    {
      id: 'perkebunan-2',
      name: 'Kebun Kelapa',
      description:
        'Kelapa dibudidayakan untuk produksi kopra dan santan segar. Limbahnya dimanfaatkan menjadi arang batok dan sabut.',
      features: ['Produksi kopra', 'Pengolahan limbah'],
    },
  ],
  peternakan: [
    {
      id: 'peternakan-1',
      name: 'Ternak Sapi Potong',
      description:
        'Penggemukan sapi potong jenis sapi lokal dan PO. Dagingnya dipasok ke rumah pemotongan dan pasar tradisional.',
      features: ['Sapi PO unggul', 'Pakan fermentasi'],
    },
    {
      id: 'peternakan-2',
      name: 'Ternak Kambing',
      description:
        'Kambing etawa dan kacang dipelihara untuk daging serta susu. Pupuk kandangnya dimanfaatkan untuk pertanian organik.',
      features: ['Daging dan susu', 'Pupuk kandang organik'],
    },
    {
      id: 'peternakan-3',
      name: 'Ternak Ayam Kampung',
      description:
        'Ayam kampung dibudidayakan secara semi intensif. Telur dan dagingnya memiliki harga jual lebih tinggi dari ayam ras.',
      features: ['Semi intensif', 'Telur dan daging organik'],
    },
  ],
  perikanan: [
    {
      id: 'perikanan-1',
      name: 'Nelayan Ikan Tuna',
      description:
        'Nelayan desa menangkap ikan tuna dan cakalang di perairan utara Jawa. Hasil tangkapan didistribusikan segar maupun beku.',
      features: ['Tangkapan segar', 'Distribusi beku'],
    },
    {
      id: 'perikanan-2',
      name: 'Perikanan Gurame',
      description:
        'Budidaya gurame dalam kolam air tawar dengan sistem pemeliharaan intensif. Ikan gurame premium untuk pasar restoran.',
      features: ['Kolam intensif', 'Pasar restoran'],
    },
    {
      id: 'perikanan-3',
      name: 'Bandeng Asin',
      description:
        'Pengolahan bandeng menjadi ikan asin berkualitas dengan proses penggaraman tradisional dan pengeringan alami.',
      features: ['Proses tradisional', 'Tahan lama'],
    },
  ],
  kerajinan: [
    {
      id: 'kerajinan-1',
      name: 'Anyaman Bambu',
      description:
        'Kerajinan anyaman bambu seperti besek, kipas, dan tas dibuat dengan teknik anyaman khas. Produk diminati untuk dekorasi dan kemasan.',
      features: ['Teknik anyaman khas', 'Produk dekoratif'],
    },
    {
      id: 'kerajinan-2',
      name: 'Ukiran Kayu Jati',
      description:
        'Ukiran kayu jati dengan motif flora dan fauna menghasilkan mebel serta hiasan dinding bernilai seni tinggi.',
      features: ['Motif flora fauna', 'Mebel dan hiasan'],
    },
    {
      id: 'kerajinan-3',
      name: 'Tas Rotan',
      description:
        'Tas anyaman rotan dibuat dengan rangka kuat dan desain modern. Produk dipasarkan untuk pasar domestik dan ekspor.',
      features: ['Desain modern', 'Pasar ekspor'],
    },
  ],
  wisata: [
    {
      id: 'wisata-1',
      name: 'Air Terjun Curuga',
      description:
        'Air terjun dengan air jernih di tengah hutan desa. Menawarkan pemandangan alami dan spot foto yang memukau.',
      features: ['Spot foto', 'Trekking ringan'],
    },
    {
      id: 'wisata-2',
      name: 'Pura Kayangan',
      description:
        'Pura bersejarah dengan arsitektur khas dan suasana sakral. Menjadi pusat kegiatan keagamaan dan wisata budaya.',
      features: ['Nilai sejarah', 'Wisata budaya'],
    },
    {
      id: 'wisata-3',
      name: 'Pulau Melang',
      description:
        'Pulau kecil berpasir putih yang dapat dijangkau dengan perahu nelayan. Surga bagi pecinta snorkeling dan sunset.',
      features: ['Snorkeling', 'Panorama sunset'],
    },
  ],
  budaya: [
    {
      id: 'budaya-1',
      name: 'Tari Tradisional Kuanyar',
      description:
        'Tarian khas desa yang ditampilkan pada acara penyambutan tamu dan festival budaya. Gerakannya menggambarkan kehidupan masyarakat pesisir.',
      features: ['Filosofi pesisir', 'Festival budaya'],
    },
    {
      id: 'budaya-2',
      name: 'Upacara Adat',
      description:
        'Serangkaian upacara adat seperti sedekah laut dan nyadran dilestarikan sebagai wujud syukur masyarakat atas rezeki alam.',
      features: ['Sedekah laut', 'Tradisi nyadran'],
    },
    {
      id: 'budaya-3',
      name: 'Musik Gamelan',
      description:
        'Karawitan desa memainkan gamelan jawa untuk mengiringi pertunjukan seni. Generasi muda tetap diajak berlatih secara rutin.',
      features: ['Karawitan jawa', 'Regenerasi pemain'],
    },
  ],
}
