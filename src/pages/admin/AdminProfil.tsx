import { useState, useEffect } from 'react'
import { useAdminVillageProfile } from '@/services/admin'
import { Tabs } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Typography, Text } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { Save, MapPin } from 'lucide-react'

export default function AdminProfil() {
  const { get, update } = useAdminVillageProfile()
  const { data } = get
  const { addToast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    overview: '',
    history: '',
    vision: '',
    mission: '',
    demographics: '',
    facilities: '',
    adminInfo: '',
    contactInfo: '',
    lat: '',
    lng: '',
  })

  useEffect(() => {
    if (data) {
      setName(data.name || '')
      setOverview(data.overview || '')
      setHistory(data.history || '')
      setVision(data.vision || '')
      setMission(data.mission || '')
      setDemographics(data.demographics || '')
      setFacilities(data.facilities || '')
      setAdminInfo(data.adminInfo || '')
      setContactInfo(data.contactInfo || '')
      setLat(data.lat?.toString() || '')
      setLng(data.lng?.toString() || '')
    }
  }, [data])

  const setName = (value: string) => setFormData(prev => ({ ...prev, name: value }))
  const setOverview = (value: string) => setFormData(prev => ({ ...prev, overview: value }))
  const setHistory = (value: string) => setFormData(prev => ({ ...prev, history: value }))
  const setVision = (value: string) => setFormData(prev => ({ ...prev, vision: value }))
  const setMission = (value: string) => setFormData(prev => ({ ...prev, mission: value }))
  const setDemographics = (value: string) => setFormData(prev => ({ ...prev, demographics: value }))
  const setFacilities = (value: string) => setFormData(prev => ({ ...prev, facilities: value }))
  const setAdminInfo = (value: string) => setFormData(prev => ({ ...prev, adminInfo: value }))
  const setContactInfo = (value: string) => setFormData(prev => ({ ...prev, contactInfo: value }))
  const setLat = (value: string) => setFormData(prev => ({ ...prev, lat: value }))
  const setLng = (value: string) => setFormData(prev => ({ ...prev, lng: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await update.mutateAsync({
        name: formData.name,
        overview: formData.overview,
        history: formData.history,
        vision: formData.vision,
        mission: formData.mission,
        demographics: formData.demographics,
        facilities: formData.facilities,
        adminInfo: formData.adminInfo,
        contactInfo: formData.contactInfo,
        lat: formData.lat ? parseFloat(formData.lat) : null,
        lng: formData.lng ? parseFloat(formData.lng) : null,
      })
      addToast('success', 'Profil desa berhasil diperbarui')
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal memperbarui profil desa')
    }
  }

  const tabs = [
    { id: 'identitas', label: 'Identitas' },
    { id: 'sejarah', label: 'Sejarah' },
    { id: 'visi-misi', label: 'Visi & Misi' },
    { id: 'demografi', label: 'Demografi' },
    { id: 'geografis', label: 'Geografis' },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <Typography variant="h3">Kelola Profil Desa</Typography>
      <Text className="text-on-surface-variant">
        Kelola informasi profil, visi misi, dan lokasi Desa Kuanyar
      </Text>

      <Card variant="filled" className="p-6">
        <Tabs tabs={tabs} defaultTab="identitas">
          {(activeTab) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'identitas' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Nama Desa *</label>
                      <Input value={formData.name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Ringkasan Desa *</label>
                      <Textarea value={formData.overview} onChange={e => setOverview(e.target.value)} rows={3} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Info Administrasi</label>
                      <Textarea value={formData.adminInfo} onChange={e => setAdminInfo(e.target.value)} rows={4} />
                    </div>
                    <div>
                      <label className="label">Info Kontak</label>
                      <Textarea value={formData.contactInfo} onChange={e => setContactInfo(e.target.value)} rows={4} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sejarah' && (
                <div>
                  <label className="label">Sejarah Desa</label>
                  <Textarea value={formData.history} onChange={e => setHistory(e.target.value)} rows={8} placeholder="Tulis sejarah desa di sini..." />
                </div>
              )}

              {activeTab === 'visi-misi' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Visi</label>
                    <Textarea value={formData.vision} onChange={e => setVision(e.target.value)} rows={6} placeholder="Tulis visi desa di sini..." />
                  </div>
                  <div>
                    <label className="label">Misi</label>
                    <Textarea value={formData.mission} onChange={e => setMission(e.target.value)} rows={6} placeholder="Tulis misi desa di sini..." />
                  </div>
                </div>
              )}

              {activeTab === 'demografi' && (
                <div>
                  <label className="label">Demografi</label>
                  <Textarea value={formData.demographics} onChange={e => setDemographics(e.target.value)} rows={8} placeholder="Tulis data demografi desa di sini..." />
                </div>
              )}

              {activeTab === 'geografis' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Koordinat Peta (Lat, Lng)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="any"
                        placeholder="Latitude"
                        value={formData.lat}
                        onChange={e => setLat(e.target.value)}
                        className="w-1/2"
                      />
                      <Input
                        type="number"
                        step="any"
                        placeholder="Longitude"
                        value={formData.lng}
                        onChange={e => setLng(e.target.value)}
                        className="w-1/2"
                      />
                      <MapPin className="w-5 h-5 self-center text-on-surface-variant ml-2" />
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
              </Button>
            </form>
          )}
        </Tabs>
      </Card>

      <ToastContainer toasts={[]} onRemove={() => {}} />
    </div>
  )
}