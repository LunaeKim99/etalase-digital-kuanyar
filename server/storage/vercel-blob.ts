import { put, del, list } from '@vercel/blob'
import type { MediaStorage } from './types.js'

export const vercelBlobStorage: MediaStorage = {
  async put(key, buffer, contentType) {
    const blob = await put(key, buffer, {
      contentType,
      access: 'public',
      addRandomSuffix: false,
    })
    return blob.url
  },

  async delete(key) {
    // Resolve the blob URL for this pathname, then delete it.
    const { blobs } = await list({ prefix: key, limit: 1 }).catch(() => ({ blobs: [] }))
    const url = blobs[0]?.pathname === key ? blobs[0].url : null
    if (url) {
      await del(url).catch(() => {
        // Already gone or transient failure — do not fail the request.
      })
    }
  },
}
