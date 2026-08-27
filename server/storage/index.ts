import type { MediaStorage, StorageKind } from './types.js'

export type { MediaStorage, StorageKind }

function resolveKind(): StorageKind {
  const configured = process.env.MEDIA_STORAGE
  if (configured === 'local' || configured === 'vercel-blob') return configured
  // Default: Vercel Blob when running on Vercel, local filesystem otherwise.
  return process.env.VERCEL ? 'vercel-blob' : 'local'
}

let cached: MediaStorage | null = null

export async function getMediaStorage(): Promise<MediaStorage> {
  if (cached) return cached
  if (resolveKind() === 'local') {
    const { localFsStorage } = await import('./local-fs.js')
    cached = localFsStorage
  } else {
    const { vercelBlobStorage } = await import('./vercel-blob.js')
    cached = vercelBlobStorage
  }
  return cached
}
