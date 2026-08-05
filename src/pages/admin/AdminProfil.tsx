import { useState } from 'react'
import { useAdminVillageProfile } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography, Text } from '@/components/ui/typography'
import { Save, MapPin } from 'lucide-react'

export default function AdminProfil() {
  const { update } = useAdminVillageProfile()
  const [formData, setFormData] = useState({
    name: 'Desa Kuanyar',
    overview: '',
    history: '',
    vision: '',
    mission: '',
    demographics: '',
    facilities: '',
    adminInfo: '',
    contactInfo: '',
    lat: -6.7175,
    lng: 110.7491,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await update.mutateAsync(formData)
      alert('Profil desa berhasil diperbarui')
    } catch (err) {
      console.error(err)
      alert('Gagal memperbarui')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Typography variant="h3">Kelola Profil Desa</Typography>
      <Text className="text-text-muted">
        Kelola informasi profil, visi misi, dan lokasi Desa Kuanyar
      </Text>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Desa *</label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Koordinat Peta (Lat, Lng)</label>
              <div className="flex gap-2">
                <Input type="number" step="any" placeholder="Latitude" value={formData.lat} onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} className="w-1/2" />
                <Input type="number" step="any" placeholder="Longitude" value={formData.lng} onChange={e => setFormData({...formData, lng: parseFloat(e.target.value)})} className="w-1/2" />
                <MapPin className="w-5 h-5 self-center text-text-muted ml-2" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ringkasan Desa *</label>
            <textarea value={formData.overview} onChange={e => setFormData({...formData, overview: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={3} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sejarah</label>
              <textarea value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Visi</label>
              <textarea value={formData.vision} onChange={e => setFormData({...formData, vision: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Misi</label>
              <textarea value={formData.mission} onChange={e => setFormData({...formData, mission: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Demografi</label>
              <textarea value={formData.demographics} onChange={e => setFormData({...formData, demographics: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fasilitas Umum</label>
              <textarea value={formData.facilities} onChange={e => setFormData({...formData, facilities: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Info Administrasi</label>
              <textarea value={formData.adminInfo} onChange={e => setFormData({...formData, adminInfo: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Info Kontak</label>
              <textarea value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={4} />
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
          </Button>
        </form>
      </Card>
    </div>
  )
}