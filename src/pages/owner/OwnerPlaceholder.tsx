import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Construction } from 'lucide-react'

interface Props {
  title: string
}

export default function OwnerPlaceholder({ title }: Props) {
  return (
    <div className="space-y-6">
      <Typography variant="h3">{title}</Typography>
      <Card variant="filled" className="p-8 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container mx-auto mb-4">
          <Construction className="w-6 h-6" />
        </div>
        <Typography variant="h5" className="mb-2">Halaman Segera Hadir</Typography>
        <p className="text-on-surface-variant text-sm">
          Fitur ini sedang dalam pengembangan.
        </p>
      </Card>
    </div>
  )
}