export interface MediaStorage {
  put(key: string, buffer: Buffer, contentType: string): Promise<string>
  delete(key: string): Promise<void>
}

export type StorageKind = 'local' | 'vercel-blob'
