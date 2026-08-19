import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'

interface StatCardProps {
  value: string
  label: string
  icon?: LucideIcon
}

export default function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <Card variant="filled" className="p-6 text-center animate-fade-in">
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-primary-container flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}
      <Typography variant="h2" className="text-primary font-medium mb-1">
        {value}
      </Typography>
      <Muted>{label}</Muted>
    </Card>
  )
}
