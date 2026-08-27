import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { MediaStorage } from './types.js'
import { LOCAL_STORAGE_PREFIX } from '../config/media.js'

const UPLOADS_DIR = resolve(process.cwd(), 'uploads')

export const localFsStorage: MediaStorage = {
  async put(key, buffer, contentType) {
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
