import type { LucideIcon } from 'lucide-react'
import { Users, MapPin, Store, Package, Hammer, Wheat, TreePine, Camera } from 'lucide-react'

export interface HeroData {
  title: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

export const hero: HeroData = {
  title: 'Etalase Digital Desa Kuanyar',
  subtitle:
    'Temui kekayaan potensi, UMKM, produk unggulan, dan wisata budaya Desa Kuanyar — modern, responsif, dan terhubung.',
  ctaPrimary: { label: 'Jelajahi Potensi', href: '/potensi' },
  ctaSecondary: { label: 'Lihat UMKM', href: '/umkm' },
}

export interface StatData {
  id: string
  value: string
  label: string
  icon: LucideIcon
}

export const stats: StatData[] = [
  { id: 'pop', value: '12.508', label: 'Jiwa', icon: Users },
  { id: 'area', value: '15,2', label: 'km² Luas Desa', icon: MapPin },
  { id: 'umkm', value: '340+', label: 'UMKM Aktif', icon: Store },
  { id: 'wisata', value: '8', label: 'Pusat Wisata', icon: Package },
]

export interface PotentialData {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const potentials: PotentialData[] = [
  {
    id: 'kerajinan',
    title: 'UMKM Kerajinan Kayu',
    description: 'Desa Kuanyar terkenal dengan ukir kayu kudamati hasil bahan baku kayu jati lokal.',
    icon: Hammer,
  },
  {
    id: 'pertanian',
    title: 'Pertanian Padi & Palawija',
    description: 'Lahan subak hijau memproduksi padi, jagung, kedelai, dan kacang tanah.',
    icon: Wheat,
  },
  {
    id: 'cengkeh',
    title: 'Kebun Cengkeh Tradisional',
    description: 'Perkebunan cengkeh tradisional yang menjadi ikon aromatik desa.',
    icon: TreePine,
  },
  {
    id: 'wisata',
    title: 'Wisata Eko-Budaya',
    description: 'Paket wisata etno-budaya dari seni lokal sampai spot keindahan alam.',
    icon: Camera,
  },
]

export interface ProductData {
  id: string
  image: string
  name: string
  price: string
  unit: string
  slug?: string
}

export const products: ProductData[] = [
  { id: 'p1', image: 'https://picsum.photos/seed/kuanyar-bambu/600/400', name: 'Keranjang Anyaman Bambu', price: 'Rp125.000', unit: '0.5 kg' },
  { id: 'p2', image: 'https://picsum.photos/seed/kuanyar-ukir/600/400', name: 'Lukisan Ukir Kayu Jati', price: 'Rp850.000', unit: '1 lusin' },
  { id: 'p3', image: 'https://picsum.photos/seed/kuanyar-jerami/600/400', name: 'Tas Anyaman Jerami', price: 'Rp95.000', unit: '1 buah' },
  { id: 'p4', image: 'https://picsum.photos/seed/kuanyar-alas/600/400', name: 'Alas Tidur Anyaman', price: 'Rp300.000', unit: '1 set' },
]

export interface TourismData {
  id: string
  image: string
  name: string
  location: string
}

export const tourism: TourismData[] = [
  { id: 't1', image: 'https://picsum.photos/seed/kuanyar-curuga/800/600', name: 'Air Terjun Curuga', location: 'Desa Kuanyar' },
  { id: 't2', image: 'https://picsum.photos/seed/kuanyar-kayangan/800/600', name: 'Pura Kayangan', location: 'Gunung Sari' },
  { id: 't3', image: 'https://picsum.photos/seed/kuanyar-melang/800/600', name: 'Pulau Melang', location: 'Pantai Utara' },
]

export interface GalleryData {
  id: string
  image: string
  title: string
}

export const gallery: GalleryData[] = [
  { id: 'g1', image: 'https://picsum.photos/seed/kuanyar-gal1/600/600', title: 'Proses Ukir Kayu' },
  { id: 'g2', image: 'https://picsum.photos/seed/kuanyar-gal2/600/600', title: 'Sawah Subak Hijau' },
  { id: 'g3', image: 'https://picsum.photos/seed/kuanyar-gal3/600/600', title: 'Bunga Cengkeh' },
  { id: 'g4', image: 'https://picsum.photos/seed/kuanyar-gal4/600/600', title: 'Wisata Curuga' },
  { id: 'g5', image: 'https://picsum.photos/seed/kuanyar-gal5/600/600', title: 'Produk Anyaman' },
  { id: 'g6', image: 'https://picsum.photos/seed/kuanyar-gal6/600/600', title: 'Kegiatan Desa' },
]

export interface CtaData {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
}

export const cta: CtaData = {
  title: 'Ingin Tampil di Etalase Desa?',
  subtitle: 'Hubungi kami untuk promosi UMKM, kolaborasi produk, dan pencatatan data wisata.',
  buttonText: 'Hubungi Kami',
  buttonHref: '/kontak',
}
