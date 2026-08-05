import { Muted } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface QRCodeProps {
  value: string
  size?: number
  label?: string
  className?: string
}

export default function QRCode({
  value,
  size = 160,
  label = 'Scan untuk berbagi',
  className,
}: QRCodeProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`}
        alt="QR Code"
        width={size}
        height={size}
        className="rounded-lg bg-white p-2"
      />
      <Muted>{label}</Muted>
    </div>
  )
}
