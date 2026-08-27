import { getToken, ApiError } from './admin'

export type MediaContext = 'berita' | 'galeri' | 'umkm' | 'potensi'

export interface UploadedMedia {
  url: string
  mimeType: string
  width: number
  height: number
  size: number
}

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'Format gambar tidak didukung. Gunakan JPG, PNG, atau WebP.'
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return `Gambar terlalu besar. Maksimum ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))} MB.`
  }
  return null
}

export async function uploadMedia(file: File, context: MediaContext): Promise<UploadedMedia> {
  const token = getToken()
  const form = new FormData()
  form.append('file', file)
  form.append('context', context)

  const res = await fetch('/api/admin/media/upload', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  })

  if (res.status === 401) throw new ApiError('Sesi telah berakhir, silakan login ulang', 401)
  let payload: { success?: boolean; data?: UploadedMedia; error?: string } | null = null
  try {
    payload = await res.json()
  } catch {
    // fallthrough
  }
  if (!res.ok || !payload?.data) {
    throw new ApiError(payload?.error ?? 'Upload gagal. Silakan coba lagi.', res.status)
  }
  return payload.data
}

export async function deleteOrphanMedia(url: string): Promise<void> {
  try {
    const token = getToken()
    await fetch(`/api/admin/media?url=${encodeURIComponent(url)}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  } catch {
    // Rollback is best-effort; orphan cleanup failures are non-fatal.
  }
}

/** Revoke object URLs created for local previews. */
export function revokeObjectUrls(urls: (string | undefined)[]) {
  for (const url of urls) {
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
  }
}
