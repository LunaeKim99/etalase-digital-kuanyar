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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-background rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-heading font-bold text-xl text-text">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Tutup">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 space-y-4">{children}</div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button onClick={onSave} loading={loading}>{saveLabel}</Button>
        </div>
      </div>
    </div>
  )
}