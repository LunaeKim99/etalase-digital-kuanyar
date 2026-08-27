import { Link } from 'react-router-dom'
import { Store, Wheat, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'

interface PotensiModuleConfig {
  key: string
  title: string
  description: string
  icon: typeof Store
  href: string
}

// Kategori Potensi Desa yang tersedia saat ini.
// Kategori baru di masa depan ditambahkan sebagai entri config + modul halamannya,
// tanpa perlu meredesign halaman hub atau sidebar.
const potensiModules: PotensiModuleConfig[] = [
  {
    key: 'umkm',
    title: 'UMKM',
    description: 'Usaha dan produk masyarakat',
    icon: Store,
    href: '/admin/potensi/umkm',
  },
  {
    key: 'pertanian',
    title: 'Pertanian',
    description: 'Potensi sektor pertanian desa',
    icon: Wheat,
    href: '/admin/potensi/pertanian',
  },
]

export default function AdminPotensi() {
  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h3">Potensi Desa</Typography>
        <Muted className="mt-1">Pusat pengelolaan seluruh data potensi Desa Kuanyar</Muted>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        {potensiModules.map((module) => (
          <Link key={module.key} to={module.href}>
            <Card variant="outlined" className="p-6 hover:shadow-md transition-shadow h-full">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-primary-container text-on-primary-container">
                  <module.icon className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-on-surface-variant mt-2" />
              </div>
              <Typography variant="h5" className="mt-4">{module.title}</Typography>
              <Muted className="mt-1">{module.description}</Muted>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
