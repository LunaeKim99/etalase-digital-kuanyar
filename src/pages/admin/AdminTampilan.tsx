import { Card, CardContent } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Layout,
  MapPin,
  Store,
  FileText,
  Image,
  BarChart3,
} from 'lucide-react'

interface SectionConfig {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const sections: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'Banner utama halaman depan',
    icon: Layout,
  },
  {
    id: 'potensi-desa',
    name: 'Potensi Desa',
    description: 'Highlight potensi unggulan desa',
    icon: MapPin,
  },
  {
    id: 'umkm',
    name: 'UMKM',
    description: 'Tampilan daftar UMKM',
    icon: Store,
  },
  {
    id: 'berita',
    name: 'Berita',
    description: 'Tampilan berita terbaru',
    icon: FileText,
  },
  {
    id: 'galeri',
    name: 'Galeri',
    description: 'Tampilan galeri foto',
    icon: Image,
  },
  {
    id: 'statistik',
    name: 'Statistik',
    description: 'Statistik desa',
    icon: BarChart3,
  },
]

export default function AdminTampilan() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <Typography variant="h4">Tampilan Website</Typography>
          <Muted className="mt-1">
            Kelola tampilan dan konfigurasi bagian-bagian halaman depan website desa
          </Muted>
        </div>
        <Badge variant="outlined" size="sm" className="self-start mt-2">
          Coming Soon
        </Badge>
      </div>

      {/* Section Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card key={section.id} variant="outlined" className="p-6 hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col h-full">
              {/* Icon */}
              <div className="p-3 rounded-2xl bg-primary-container text-on-primary-container w-fit mb-4">
                <section.icon className="w-6 h-6" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Typography variant="h5" className="flex-1">
                    {section.name}
                  </Typography>
                  <Badge variant="warning" size="sm" className="flex-shrink-0 mt-0.5">
                    Coming Soon
                  </Badge>
                </div>
                <Muted className="mb-4 flex-1">{section.description}</Muted>

                {/* Action Button */}
                <Button
                  variant="outlined"
                  size="sm"
                  className="w-full justify-center"
                  disabled
                  aria-disabled="true"
                >
                  Konfigurasi
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}