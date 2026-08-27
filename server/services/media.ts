import { randomUUID } from 'node:crypto'
import sharp, { type OutputInfo } from 'sharp'
import {
  MAX_DIMENSIONS,
  MAX_UPLOAD_BYTES,
  MEDIA_KEY_RE,
  WEBP_QUALITY,
  isAllowedMime,
  type MediaContext,
} from '../config/media.js'
import { getMediaStorage } from '../storage/index.js'

export interface UploadedMedia {
  url: string
  mimeType: 'image/webp'
  width: number
  height: number
  size: number
}

export class MediaValidationError extends Error {}

function buildKey(context: MediaContext, date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${context}/${year}/${month}/${randomUUID()}.webp`
}

/**
 * Validates and processes an uploaded image, then stores it.
 * Returns the public URL plus metadata of the generated WebP file.
 */
export async function processAndStoreImage(
  buffer: Buffer,
  mimeType: string,
  context: MediaContext,
): Promise<UploadedMedia> {
  if (buffer.length === 0) {
    throw new MediaValidationError('File kosong.')
  }
  if (buffer.length > MAX_UPLOAD_BYTES) {
    throw new MediaValidationError(
      `Gambar terlalu besar. Maksimum ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))} MB.`,
    )
  }
  if (!isAllowedMime(mimeType)) {
    throw new MediaValidationError(
      'Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.',
    )
  }

  // Content-based validation: sharp decodes the real bytes, so a mislabeled
  // file (e.g. executable renamed to .jpg) fails here instead of being stored.
  let pipeline = sharp(buffer, { failOn: 'error', animated: false })
  let metadata
  try {
    metadata = await pipeline.metadata()
  } catch {
    throw new MediaValidationError('File bukan gambar yang valid.')
  }

  if (!metadata.format || !['jpeg', 'png', 'webp', 'gif'].includes(metadata.format)) {
    throw new MediaValidationError(
      'Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.',
    )
  }
  if (metadata.format === 'gif' && (metadata.pages ?? 1) > 1) {
    throw new MediaValidationError(
      'GIF animated tidak didukung. Simpan animasi sebagai video, atau gunakan JPG/PNG/WebP.',
    )
  }

  const maxDim = MAX_DIMENSIONS[context]
  pipeline = pipeline
    .rotate() // auto-orient based on EXIF
    .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })

  let output: Buffer
  let info: OutputInfo
  try {
    const result = await pipeline.toBuffer({ resolveWithObject: true })
    output = result.data
    info = result.info
  } catch {
    throw new MediaValidationError('Gagal memproses gambar. Silakan coba file lain.')
  }

  const key = buildKey(context)
  const storage = await getMediaStorage()
  const url = await storage.put(key, output, 'image/webp')

  return {
    url,
    mimeType: 'image/webp',
    width: info.width,
    height: info.height,
    size: output.length,
  }
}

/** Extracts our storage key from a URL, or null if the URL is not ours. */
export function extractMediaKey(url: string | null | undefined): string | null {
  if (!url) return null
  let pathname: string
  try {
    pathname = new URL(url, 'http://localhost').pathname
  } catch {
    return null
  }
  // Local adapter: /uploads/<key> — Vercel Blob: the pathname is the key itself.
  const candidates = [pathname, pathname.replace(/^\/uploads\//, '')]
  for (const candidate of candidates) {
    const key = candidate.replace(/^\//, '')
    if (MEDIA_KEY_RE.test(key)) return key
  }
  return null
}

/** Deletes a stored media object if (and only if) the URL belongs to our pipeline. */
export async function deleteMediaByUrl(url: string | null | undefined): Promise<void> {
  const key = extractMediaKey(url)
  if (!key) return
  const storage = await getMediaStorage()
  await storage.delete(key).catch((err) => {
    console.error('[media] failed to delete storage object', key, err)
  })
}
