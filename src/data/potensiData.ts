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
  id: number
  name: string
  description: string
  images: string[]
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
    color: 'bg-primary-container text-on-primary-container',
    lightColor: 'bg-primary-container text-on-primary-container',
  },
  {
    slug: 'umkm-makanan',
    title: 'UMKM Makanan',
    description: 'Usaha catering dan bakery dengan produk unggulan khas Desa Kuanyar.',
    icon: 'UtensilsCrossed',
    color: 'bg-tertiary-container text-on-tertiary-container',
    lightColor: 'bg-tertiary-container text-on-tertiary-container',
  },
  {
    slug: 'pertanian',
    title: 'Pertanian',
    description: 'Sektor pertanian unggulan dengan komoditas padi dan jagung, didukung kelompok tani aktif.',
    icon: 'Wheat',
    color: 'bg-secondary-container text-on-secondary-container',
    lightColor: 'bg-secondary-container text-on-secondary-container',
  },
]

interface PotensiItemResponse {
  id: number
  name: string
  description: string
  category: PotensiCategory
  owner: string | null
  rtRw: string | null
  dusun: string | null
  yearFounded: number | null
  capacity: string | null
  whatsapp: string | null
  instagram: string | null
  tiktok: string | null
  marketplace: string | null
  isSector: boolean
  images: { imageUrl: string; caption: string | null; sortOrder: number }[]
  features: string[]
  sectorData: PotensiSectorData | null
}

function mapItem(raw: PotensiItemResponse): PotensiItem {
  const contact: PotensiContact = {}
  if (raw.whatsapp) contact.whatsapp = raw.whatsapp
  if (raw.instagram) contact.instagram = raw.instagram
  if (raw.tiktok) contact.tiktok = raw.tiktok
  if (raw.marketplace) contact.marketplace = raw.marketplace

  const item: PotensiItem = {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    images: raw.images.map((img) => img.imageUrl),
    category: raw.category,
    isSector: raw.isSector,
  }
  if (raw.features.length) item.features = raw.features
  if (raw.owner) item.owner = raw.owner
  if (raw.rtRw) item.rtRw = raw.rtRw
  if (raw.dusun) item.dusun = raw.dusun
  if (raw.yearFounded) item.yearFounded = raw.yearFounded
  if (raw.capacity) item.capacity = raw.capacity
  if (Object.keys(contact).length > 0) item.contact = contact
  if (raw.sectorData) item.sectorData = raw.sectorData

  return item
}

export async function getAllItems(): Promise<PotensiItem[]> {
  const res = await fetch('/api/potensi/items')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  return (json.data ?? []).map(mapItem)
}

export async function getItemById(id: number): Promise<PotensiItem | undefined> {
  const items = await getAllItems()
  return items.find((item) => item.id === id)
}

export function getCategoryMeta(slug: PotensiCategory): PotensiCategoryMeta | undefined {
  return categories.find((cat) => cat.slug === slug)
}