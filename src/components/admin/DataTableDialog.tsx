import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DataTableDialogProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onSave: () => void
  saveLabel?: string
  loading?: boolean
}

export default function DataTableDialog({
  open,
  title,
  children,
  onClose,
  onSave,
  saveLabel = 'Simpan',
  loading,
}: DataTableDialogProps) {
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    if (open) setVisible(true)
  }, [open])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-surface rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-base font-medium text-on-surface">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Tutup">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-outline-variant bg-surface-container-low">
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button onClick={onSave} loading={loading}>{saveLabel}</Button>
        </div>
      </div>
    </div>
  )
}