import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

interface AlertDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  variant?: 'default' | 'destructive'
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  loading,
  variant = 'default',
}: AlertDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <p className="mb-6 text-on-surface-variant">{description}</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          loading={loading}
          className={variant === 'destructive' ? 'bg-error text-on-error hover:bg-error/90' : ''}
        >
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  )
}
