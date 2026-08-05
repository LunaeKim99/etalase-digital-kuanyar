import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phone: string
  message?: string
  size?: 'sm' | 'md'
  className?: string
  label?: string
}

export default function WhatsAppButton({
  phone,
  message,
  size = 'md',
  className,
  label = 'Chat WhatsApp',
}: WhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message ?? 'Halo, saya ingin bertanya.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'btn btn-primary bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center gap-2',
        size === 'sm' && 'btn-sm',
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  )
}
