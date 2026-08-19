import { useAdminUmkms, useAdminProducts, useAdminPosts, useAdminCategories } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Typography, Text } from '@/components/ui/typography'
import { Store, Package, FileText, Tag } from 'lucide-react'

export default function AdminDashboard() {
  const { list: umkmList } = useAdminUmkms()
  const { list: prodList } = useAdminProducts()
  const { list: postList } = useAdminPosts()
  const { list: catList } = useAdminCategories()

  const stats = [
    { label: 'Total UMKM', value: umkmList.data?.length ?? 0, icon: Store, bg: 'bg-primary-container', text: 'text-on-primary-container' },
    { label: 'Total Produk', value: prodList.data?.length ?? 0, icon: Package, bg: 'bg-secondary-container', text: 'text-on-secondary-container' },
    { label: 'Total Berita', value: postList.data?.length ?? 0, icon: FileText, bg: 'bg-tertiary-container', text: 'text-on-tertiary-container' },
    { label: 'Kategori', value: catList.data?.length ?? 0, icon: Tag, bg: 'bg-surface-container-highest', text: 'text-on-surface' },
  ]

  return (
    <div className="space-y-6">
      <Typography variant="h3">Ringkasan Dashboard</Typography>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} variant="filled" className="p-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.text}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <Typography variant="h3" className="text-2xl">{stat.value}</Typography>
                <Text className="text-sm text-on-surface-variant">{stat.label}</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="filled" className="p-6">
        <Typography variant="h4" className="mb-4">Aktivitas Terkini</Typography>
        <div className="space-y-3 text-sm text-on-surface-variant">
          <p>• Sistem siap digunakan</p>
          <p>• Data dimuat dari database SQLite</p>
          <p>• UMKM pending perlu disetujui oleh admin</p>
        </div>
      </Card>
    </div>
  )
}
