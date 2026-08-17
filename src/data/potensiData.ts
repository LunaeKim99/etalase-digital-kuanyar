export type PotensiCategory = 'konveksi' | 'umkm-makanan' | 'pertanian'

export interface PotensiContact {
  whatsapp?: string
  instagram?: string
  tiktok?: string
  marketplace?: string
}

export interface PotensiKomoditas {
  nama: string
  deskripsi: string
}

export interface PotensiMusimTanam {
  musim: string
  lahanAktif: string
  lahanKosong: string
}

export interface PotensiSectorData {
  komoditas: PotensiKomoditas[]
  musimTanam: PotensiMusimTanam[]
  kelompokTani: string[]
  pemasaran: string
  modernisasi: string
}

export interface PotensiItem {
  id: string
  name: string
  description: string
  image: string
  category: PotensiCategory
  features?: string[]
  owner?: string
  rtRw?: string
  dusun?: string
  yearFounded?: number
  capacity?: string
  contact?: PotensiContact
  isSector?: boolean
  sectorData?: PotensiSectorData
}

export interface PotensiCategoryMeta {
  slug: PotensiCategory
  title: string
  description: string
  icon: string
  color: string
  lightColor: string
}

export const categories: PotensiCategoryMeta[] = [
  {
    slug: 'konveksi',
    title: 'Konveksi',
    description: 'Usaha konveksi pakaian yang menyerap tenaga kerja lokal dan memasarkan produk ke dalam maupun luar kota.',
    icon: 'Shirt',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
  },
  {
    slug: 'umkm-makanan',
    title: 'UMKM Makanan',
    description: 'Usaha catering dan bakery dengan produk unggulan khas Desa Kuanyar.',
    icon: 'UtensilsCrossed',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
  },
  {
    slug: 'pertanian',
    title: 'Pertanian',
    description: 'Sektor pertanian unggulan dengan komoditas padi dan jagung, didukung kelompok tani aktif.',
    icon: 'Wheat',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
  },
]

export const categoryItems: Record<PotensiCategory, PotensiItem[]> = {
  konveksi: [
    {
      id: 'konveksi-1',
      name: 'MYG Collection',
      description:
        'Usaha konveksi milik Bapak H. Miftah yang memproduksi celana cewek dan cowok dengan kapasitas sekitar 1.000 pcs per bulan. MYG Collection menerima pesanan custom sesuai permintaan pelanggan.',
      image: '/images/potensi/konveksi-1.jpg',
      category: 'konveksi',
      owner: 'Bapak H. Miftah',
      rtRw: 'RT 03/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2015,
      capacity: '1.000 pcs/bulan',
      features: ['Celana cewek & cowok', 'Pesanan custom', 'Distribusi via sales & agen'],
      contact: { whatsapp: '628708530076' },
    },
    {
      id: 'konveksi-2',
      name: 'Reza Collection',
      description:
        'Usaha konveksi milik Ibu Nur Aini yang memproduksi atasan seragam sekolah, celana anak, dan celana dewasa. Melayani pesanan custom dengan kapasitas 200 pcs per minggu, termasuk penjualan grosir ke Pasar Kliwon.',
      image: '/images/potensi/konveksi-2.jpg',
      category: 'konveksi',
      owner: 'Ibu Nur Aini',
      rtRw: 'RT 03/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 1997,
      capacity: '200 pcs/minggu',
      features: ['Atasan seragam sekolah', 'Celana anak & dewasa', 'Grosir ke Pasar Kliwon'],
      contact: { whatsapp: '6281227110647' },
    },
    {
      id: 'konveksi-3',
      name: 'Mila Collection',
      description:
        'Usaha konveksi milik Hj. Solikin yang memproduksi celana kulot dan celana cewek dengan kapasitas sekitar 500 pcs per minggu. Produk didistribusikan melalui pengiriman.',
      image: '/images/potensi/konveksi-3.jpg',
      category: 'konveksi',
      owner: 'Hj. Solikin',
      rtRw: 'RT 01/RW 01',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2004,
      capacity: '500 pcs/minggu',
      features: ['Celana kulot & cewek', 'Distribusi via pengiriman', 'Kapasitas 500 pcs/minggu'],
      contact: { marketplace: 'Pemesanan via WhatsApp' },
    },
    {
      id: 'konveksi-4',
      name: 'Mudah Collection',
      description:
        'Usaha konveksi milik Bu Mahmudah yang memproduksi berbagai jenis celana: kulot, pendek, dan panjang. Pemasaran dilakukan melalui TikTok dan melayani pesanan grosir ke Surabaya, Jepara, Demak, dan Kudus.',
      image: '/images/potensi/konveksi-4.jpg',
      category: 'konveksi',
      owner: 'Bu Mahmudah',
      rtRw: 'RT 03/RW 02',
      dusun: 'Mayong, Kuanyar',
      features: ['Celana kulot, pendek, panjang', 'Jualan via TikTok', 'Grosir ke Surabaya/Jepara/Demak/Kudus'],
      contact: {
        tiktok: 'Mudah Collection',
        marketplace: 'Grosir ke Surabaya, Jepara, Demak, Kudus',
      },
    },
  ],
  'umkm-makanan': [
    {
      id: 'umkm-makanan-1',
      name: 'Dahlia Jaya Catering',
      description:
        'Usaha catering milik Ibu Dwi Ratna Safitri yang menyediakan nasi box, jajan basah, bento, kue ulang tahun, tumpeng, dan snack. Produk unggulan: nasi box ayam bakar. Melayani hajatan, rapat, acara desa, dan prasmanan.',
      image: '/images/potensi/umkm-makanan-1.jpg',
      category: 'umkm-makanan',
      owner: 'Ibu Dwi Ratna Safitri',
      rtRw: 'RT 05/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2016,
      capacity: '~30 pelanggan/bulan',
      features: ['Nasi box ayam bakar (unggulan)', 'Jajan basah, bento, tumpeng, snack', 'Catering hajatan & rapat'],
      contact: {
        whatsapp: '6282224311491',
        instagram: 'dahliajayacatering',
        tiktok: 'Dahlia Jaya 1',
      },
    },
    {
      id: 'umkm-makanan-2',
      name: 'Naning Bakery',
      description:
        'Usaha catering dan bakery milik Ibu Naning yang menyediakan jajan basah, kue, roti, dessert, hingga nasi box savory. Produk unggulan: roti pisang. Menerima pesanan custom untuk hajatan, rapat, dan acara lainnya.',
      image: '/images/potensi/umkm-makanan-2.jpg',
      category: 'umkm-makanan',
      owner: 'Ibu Naning',
      rtRw: 'RT 04/RW 03',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2014,
      capacity: '~100 pesanan/bulan',
      features: ['Roti pisang (unggulan)', 'Jajan basah, kue, roti, dessert', 'Nasi box savory'],
      contact: { whatsapp: '6285701601135' },
    },
  ],
  pertanian: [
    {
      id: 'pertanian-1',
      name: 'Pertanian',
      description:
        'Sektor pertanian merupakan salah satu potensi unggulan di Desa Kuanyar, dengan komoditas utama berupa padi dan jagung. Padi menjadi hasil pertanian yang paling banyak dihasilkan sekaligus menjadi salah satu ciri khas Desa Kuanyar.',
      image: '/images/potensi/pertanian-1.jpg',
      category: 'pertanian',
      isSector: true,
      sectorData: {
        komoditas: [
          {
            nama: 'Padi',
            deskripsi: 'Hasil pertanian terbanyak sekaligus menjadi ciri khas Desa Kuanyar.',
          },
          {
            nama: 'Jagung',
            deskripsi: 'Ditanam pada Musim Tanam 3 (MT3), diolah menjadi nto-nto maupun digunakan sebagai bahan campuran produk catering.',
          },
        ],
        musimTanam: [
          { musim: 'MT1', lahanAktif: '80%', lahanKosong: '20%' },
          { musim: 'MT2', lahanAktif: '90%', lahanKosong: '10%' },
          { musim: 'MT3', lahanAktif: '20% (jagung)', lahanKosong: '80%' },
        ],
        kelompokTani: ['Karya Bhakti 1', 'Karya Bhakti 2', 'Mudi Rejeki', 'Bhakti Jaya'],
        pemasaran:
          'Hasil umumnya untuk kebutuhan pribadi dan dijual ke pengkulak. MT1 lebih sering dijual karena kendala penjemuran padi. MT2 dijual ketika harga dianggap menguntungkan, bahkan dapat disimpan hingga musim tanam berikutnya. Sebagian hasil juga diolah menjadi produk turunan seperti nto-nto dari jagung.',
        modernisasi:
          'Pemerintah Desa Kuanyar mendorong modernisasi pertanian melalui penggunaan bibit unggul serta pemanfaatan alsintan (alat dan mesin pertanian).',
      },
    },
  ],
}

export function getItemsByCategory(category: PotensiCategory): PotensiItem[] {
  return categoryItems[category] ?? []
}

export function getAllItems(): PotensiItem[] {
  return [...categoryItems.konveksi, ...categoryItems['umkm-makanan'], ...categoryItems.pertanian]
}

export function getItemById(id: string): PotensiItem | undefined {
  return getAllItems().find((item) => item.id === id)
}

export function getCategoryMeta(slug: PotensiCategory): PotensiCategoryMeta | undefined {
  return categories.find((cat) => cat.slug === slug)
}

