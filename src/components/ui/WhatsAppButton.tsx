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
        'inline-flex items-center gap-2 rounded-2xl bg-primary-container text-on-primary-container shadow-lg hover:shadow-xl transition-shadow',
        size === 'sm' && 'w-10 h-10 p-0 justify-center',
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  )
}
