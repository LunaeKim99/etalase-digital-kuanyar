export const MEDIA_CONTEXTS = ['berita', 'galeri', 'umkm', 'potensi'] as const
export type MediaContext = (typeof MEDIA_CONTEXTS)[number]

export function isMediaContext(v: unknown): v is MediaContext {
  return typeof v === 'string' && (MEDIA_CONTEXTS as readonly string[]).includes(v)
}

export const MAX_DIMENSIONS: Record<MediaContext, number> = {
  berita: 1920,
  galeri: 1920,
  umkm: 1600,
  potensi: 1920,
}

const DEFAULT_WEBP_QUALITY = 82
export const WEBP_QUALITY = (() => {
  const parsed = Number(process.env.IMAGE_WEBP_QUALITY)
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 100 ? parsed : DEFAULT_WEBP_QUALITY
})()

/** Vercel serverless request body limit is ~4.5MB — stay safely below it. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

export function isAllowedMime(mime: unknown): mime is (typeof ALLOWED_MIME_TYPES)[number] {
  return typeof mime === 'string' && (ALLOWED_MIME_TYPES as readonly string[]).includes(mime)
}

/** Only URLs whose path matches this pattern may be deleted from storage. */
export const MEDIA_KEY_RE =
  /^(berita|galeri|umkm|potensi)\/\d{4}\/\d{2}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.webp$/

export const LOCAL_STORAGE_PREFIX = '/uploads/'
