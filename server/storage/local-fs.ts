import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { MediaStorage } from './types.js'
import { LOCAL_STORAGE_PREFIX } from '../config/media.js'

const UPLOADS_DIR = resolve(process.cwd(), 'uploads')

export const localFsStorage: MediaStorage = {
  async put(key, buffer, contentType) {
    if (process.env.VERCEL) {
      throw new Error(
        'MEDIA_STORAGE=local tidak didukung di Vercel (filesystem read-only). ' +
          'Set MEDIA_STORAGE=vercel-blob dan BLOB_READ_WRITE_TOKEN di Vercel Environment Variables.',
      )
    }
    const target = join(UPLOADS_DIR, key)
    await mkdir(resolve(target, '..'), { recursive: true })
    await writeFile(target, buffer, { mode: 0o644 })
    void contentType
    return `${LOCAL_STORAGE_PREFIX}${key}`
  },

  async delete(key) {
    try {
      await unlink(join(UPLOADS_DIR, key))
    } catch {
      // Missing file is fine — treat as already deleted.
    }
  },
}
