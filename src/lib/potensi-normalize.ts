import type {
  PotensiItem,
  PotensiContact,
  PotensiKomoditas,
  PotensiMusimTanam,
  PotensiSectorData,
} from '@/types/catalog'

const EMPTY_SECTOR_DATA: PotensiSectorData = {
  komoditas: [],
  musimTanam: [],
  kelompokTani: [],
  pemasaran: '',
  modernisasi: '',
}

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function normalizeKomoditas(v: unknown): PotensiKomoditas[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((x): x is Record<string, unknown> => x && typeof x === 'object')
    .map((x) => ({ nama: asString(x.nama), deskripsi: asString(x.deskripsi) }))
}

function normalizeMusimTanam(v: unknown): PotensiMusimTanam[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((x): x is Record<string, unknown> => x && typeof x === 'object')
    .map((x) => ({
      musim: asString(x.musim),
      lahanAktif: asString(x.lahanAktif),
      lahanKosong: asString(x.lahanKosong),
    }))
}

export function normalizeSectorData(raw: unknown): PotensiSectorData | null {
  if (raw === null || raw === undefined) return null
  if (typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const isEmpty =
    asArray(obj.komoditas).length === 0 &&
    asArray(obj.musimTanam).length === 0 &&
    asArray(obj.kelompokTani).length === 0 &&
    asString(obj.pemasaran) === '' &&
    asString(obj.modernisasi) === ''
  if (isEmpty) return null
  return {
    komoditas: normalizeKomoditas(obj.komoditas),
    musimTanam: normalizeMusimTanam(obj.musimTanam),
    kelompokTani: asArray<string>(obj.kelompokTani).filter((s): s is string => typeof s === 'string'),
    pemasaran: asString(obj.pemasaran),
    modernisasi: asString(obj.modernisasi),
  }
}

export function normalizeContact(raw: unknown): PotensiContact | null {
  if (raw === null || raw === undefined) return null
  if (typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const c: PotensiContact = {
    whatsapp: typeof obj.whatsapp === 'string' ? obj.whatsapp : undefined,
    instagram: typeof obj.instagram === 'string' ? obj.instagram : undefined,
    tiktok: typeof obj.tiktok === 'string' ? obj.tiktok : undefined,
    marketplace: typeof obj.marketplace === 'string' ? obj.marketplace : undefined,
  }
  const hasAny =
    c.whatsapp || c.instagram || c.tiktok || c.marketplace
  return hasAny ? c : null
}

function normalizeStringArray(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw.filter((x): x is string => typeof x === 'string')
}

export function normalizePotensiItem(raw: unknown): PotensiItem | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>

  const images = normalizeStringArray(obj.images)
  const features = normalizeStringArray(obj.features)
  const sectorData = normalizeSectorData(obj.sectorData)
  const contact = normalizeContact(obj.contact)

  const categorySlug = typeof obj.category === 'string' ? obj.category : ''

  return {
    id: Number(obj.id) || 0,
    categoryId: Number(obj.categoryId) || 0,
    name: asString(obj.name) || 'Tanpa Nama',
    description: typeof obj.description === 'string' ? obj.description : null,
    owner: typeof obj.owner === 'string' ? obj.owner : null,
    rtRw: typeof obj.rtRw === 'string' ? obj.rtRw : null,
    dusun: typeof obj.dusun === 'string' ? obj.dusun : null,
    yearFounded: typeof obj.yearFounded === 'number' ? obj.yearFounded : null,
    capacity: typeof obj.capacity === 'string' ? obj.capacity : null,
    contact,
    isSector: Boolean(obj.isSector),
    sectorData,
    sortOrder: typeof obj.sortOrder === 'number' ? obj.sortOrder : 0,
    createdAt: asString(obj.createdAt),
    updatedAt: asString(obj.updatedAt),
    category: categorySlug,
    images,
    features,
  }
}

export function normalizePotensiItems(raw: unknown): PotensiItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => normalizePotensiItem(item))
    .filter((item): item is PotensiItem => item !== null)
}

export { EMPTY_SECTOR_DATA }
