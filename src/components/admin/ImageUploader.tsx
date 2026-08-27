import { useCallback, useEffect, useRef, useState } from 'react'
import { ImagePlus, Loader2, RefreshCw, Trash2, UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography, Muted } from '@/components/ui/typography'
import {
  revokeObjectUrls,
  uploadMedia,
  validateImageFile,
  type MediaContext,
} from '@/services/media'

export interface ImageUploaderProps {  label: string
  value: string
  context: MediaContext
  onChange: (url: string) => void
  onRemove?: () => void
  disabled?: boolean
  alt?: string
  hint?: string
}

/**
 * Single-image uploader: click-to-browse, drag & drop, immediate upload
 * (resize + WebP server-side), preview with Ganti/Hapus actions.
 */
export function ImageUploader({
  label,
  value,
  context,
  onChange,
  onRemove,
  disabled = false,
  alt,
  hint,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingName, setPendingName] = useState<string | undefined>(undefined)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    return () => revokeObjectUrls([previewUrl])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0]
      if (!file || disabled) return
      const validationError = validateImageFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
      setError(null)
      setPendingName(file.name)
      const objectUrl = URL.createObjectURL(file)
      revokeObjectUrls([previewUrl])
      setPreviewUrl(objectUrl)
      setUploading(true)
      try {
        const data = await uploadMedia(file, context)
        onChange(data.url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload gagal. Silakan coba lagi.')
      } finally {
        setUploading(false)
        setPendingName(undefined)
        revokeObjectUrls([objectUrl])
        setPreviewUrl(undefined)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context, disabled, onChange, previewUrl],
  )

  const openPicker = () => {
    if (!disabled && !uploading) inputRef.current?.click()
  }

  const showPreview = value || previewUrl

  return (
    <div className="space-y-2">
      <span className="label" id={`img-uploader-label-${context}`}>
        {label}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => {
          void handleFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {!showPreview ? (
        <div
          role="button"
          tabIndex={0}
          aria-disabled={disabled || uploading}
          aria-label={`${label} — pilih gambar dari komputer`}
          onClick={openPicker}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openPicker()
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            if (!disabled && !uploading) setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            void handleFiles(e.dataTransfer.files)
          }}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
            dragOver ? 'border-primary bg-primary-container/30' : 'border-outline-variant bg-surface-container-lowest'
          } ${disabled || uploading ? 'opacity-60 cursor-not-allowed' : 'hover:border-primary'}`}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-primary animate-spin" aria-hidden="true" />
          ) : (
            <UploadCloud className="w-8 h-8 text-on-surface-variant" aria-hidden="true" />
          )}
          <span className="text-sm font-medium text-on-surface">
            {uploading ? 'Mengupload...' : 'Drag & drop gambar di sini'}
          </span>
          {!uploading && <span className="text-xs text-on-surface-variant">atau klik untuk memilih file</span>}
          <span className="text-xs text-on-surface-variant">JPG, PNG, WebP · maks 4 MB</span>
        </div>
      ) : (
        <div className="flex gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-3">
          <div className="relative w-32 h-24 shrink-0 overflow-hidden rounded-lg bg-surface-container-highest">
            <img
              src={previewUrl ?? value}
              alt={alt ?? 'Preview gambar'}
              className={`w-full h-full object-cover ${uploading ? 'opacity-60' : ''}`}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between min-w-0 flex-1">
            <div className="min-w-0">
              <Typography className="truncate text-sm font-medium">
                {pendingName ?? 'Gambar saat ini'}
              </Typography>
              <Muted className="text-xs">
                {uploading ? 'Mengupload & mengonversi ke WebP...' : 'Tersimpan (WebP)'}
              </Muted>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openPicker}
                disabled={disabled || uploading}
              >
                <ImagePlus className="w-4 h-4 mr-1" /> Ganti
              </Button>
              {onRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-error"
                  onClick={() => {
                    if (!disabled && !uploading) {
                      setError(null)
                      onRemove()
                    }
                  }}
                  disabled={disabled || uploading}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Hapus
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center justify-between gap-2 rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container"
        >
          <span>{error}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Coba upload lagi"
            onClick={() => inputRef.current?.click()}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      )}
      {hint && !error && <Muted className="text-xs">{hint}</Muted>}
    </div>
  )
}
