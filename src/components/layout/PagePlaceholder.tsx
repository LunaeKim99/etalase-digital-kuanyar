import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

interface PagePlaceholderProps {
  title: string
  description?: string
  icon?: LucideIcon
}

export function PagePlaceholder({ title, description, icon }: PagePlaceholderProps) {
  return (
    <section className="py-28 md:py-36">
      <Container size="md">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {icon && (() => {
            const Icon = icon
            return (
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-primary" />
              </div>
            )
          })()}
          <span className="badge mb-4">Segera Hadir</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-on-surface-variant text-lg mb-8">{description}</p>
          )}
          <Button variant="outline" asChild>
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
