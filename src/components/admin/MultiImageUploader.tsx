import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ImagePlus, Loader2, RefreshCw, Trash2, UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography, Muted } from '@/components/ui/typography'
import {
  revokeObjectUrls,
  uploadMedia,
  validateImageFile,
  type MediaContext,
} from '@/services/media'

export interface MultiImageUploaderProps {
  label: string
  value: string[]
  context: MediaContext
  onChange: (urls: string[]) => void
  onReorder?: (urls: string[]) => void
  disabled?: boolean
  max?: number
  itemAlt?: (url: string, index: number) => string
}

interface PendingItem {
  id: string
  name: string
  previewUrl: string
}

function fileKey(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`
}

/**
 * Multi-image uploader: add several files at once (drag & drop or browse),
 * uploads each file independently and appends the resulting WebP URL.
 * Duplicate picks of the same file while uploading are ignored.
 */
export function MultiImageUploader({
  label,
  value,
  context,
  onChange,
  onReorder,
  disabled = false,
  max,
  itemAlt,
}: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<PendingItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inFlight = useRef<Set<string>>(new Set())

  const pendingPreviews = pending.map((p) => p.previewUrl)
  useEffect(() => {
    return () => revokeObjectUrls(pendingPreviews)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0 || disabled) return
      setError(null)

      const selected = Array.from(files)
      for (const file of selected) {
        const validationError = validateImageFile(file)
        if (validationError) {
          setError(`${file.name}: ${validationError}`)
          return
        }
      }

      const capacity = max ? max - value.length - pending.length : Infinity
      const accepted = selected.slice(0, Math.max(0, capacity))
      if (accepted.length < selected.length) {
        setError(`Maksimum ${max} gambar.`)
      }

      for (const file of accepted) {
        const key = fileKey(file)
        if (inFlight.current.has(key)) continue // same file already uploading
        inFlight.current.add(key)

        const id = `${key}:${Date.now()}`
        const previewUrl = URL.createObjectURL(file)
        setPending((prev) => [...prev, { id, name: file.name, previewUrl }])

        void uploadMedia(file, context)
          .then((data) => {
            onChange([...valueRef.current, data.url])
          })
          .catch((err) => {
            setError(
              `${file.name}: ${err instanceof Error ? err.message : 'Upload gagal. Silakan coba lagi.'}`,
            )
          })
          .finally(() => {
            inFlight.current.delete(key)
            URL.revokeObjectURL(previewUrl)
            setPending((prev) => prev.filter((p) => p.id !== id))
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context, disabled, max, onChange, pending.length, value.length],
  )

  // Keep a ref to the latest value so finished uploads append correctly.
  const valueRef = useRef(value)
  useEffect(() => {
    valueRef.current = value
  }, [value])

  const removeAt = (index: number) => {
    if (disabled) return
    onChange(value.filter((_, i) => i !== index))
  }

  const moveAt = (index: number, direction: -1 | 1) => {
    if (disabled || !onReorder) return
    const target = index + direction
    if (target < 0 || target >= value.length) return
    const next = [...value]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    onReorder(next)
  }

  const openPicker = () => {
    if (!disabled) inputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="label">
          {label}
          {max ? ` (maks ${max})` : ''} · {value.length} gambar
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {value.map((url, index) => (
          <div
            key={url}
            className="group relative aspect-square overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest"
          >
            <img
              src={url}
              alt={itemAlt?.(url, index) ?? `Gambar ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {onReorder && (
              <div className="absolute bottom-1 left-1 flex gap-1">
                <button
                  type="button"
                  aria-label={`Naikkan urutan gambar ${index + 1}`}
                  disabled={disabled || index === 0}
                  onClick={() => moveAt(index, -1)}
                  className="rounded-full bg-surface-container-high text-on-surface p-1 opacity-90 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-30"
                >
                  <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Turunkan urutan gambar ${index + 1}`}
                  disabled={disabled || index === value.length - 1}
                  onClick={() => moveAt(index, 1)}
                  className="rounded-full bg-surface-container-high text-on-surface p-1 opacity-90 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-30"
                >
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
            <button
              type="button"
              aria-label={`Hapus gambar ${index + 1}`}
              disabled={disabled}
              onClick={() => removeAt(index)}
              className="absolute top-1 right-1 rounded-full bg-error text-white p-1 opacity-90 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ))}

        {pending.map((p) => (
          <div
            key={p.id}
            className="relative aspect-square overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest"
            aria-label={`Mengupload ${p.name}`}
          >
            <img src={p.previewUrl} alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <Loader2 className="w-5 h-5 text-white animate-spin" aria-hidden="true" />
              <span className="text-xs text-white">Mengupload...</span>
            </div>
          </div>
        ))}

        {(!max || value.length + pending.length < max) && (
          <div
            role="button"
            tabIndex={0}
            aria-disabled={disabled}
            aria-label={`${label} — tambah gambar`}
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openPicker()
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              if (!disabled) setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFiles(e.dataTransfer.files)
            }}
            className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary ${
              dragOver ? 'border-primary bg-primary-container/30' : 'border-outline-variant'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-primary'}`}
          >
            <ImagePlus className="w-6 h-6 text-on-surface-variant" aria-hidden="true" />
            <span className="text-xs text-on-surface-variant flex items-center gap-1">
              <UploadCloud className="w-3 h-3" aria-hidden="true" /> Tambah
            </span>
          </div>
        )}
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center justify-between gap-2 rounded-lg bg-error-container px-3 py-2 text-sm text-on-error-container"
        >
          <Typography className="text-sm">{error}</Typography>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Pilih file lagi"
            onClick={openPicker}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      )}
      <Muted className="text-xs">JPG, PNG, WebP · maks 4 MB per gambar</Muted>
    </div>
  )
}
