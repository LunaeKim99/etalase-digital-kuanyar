import { useState } from 'react'
import { useAdminUmkms } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/DataTable'
import { Typography } from '@/components/ui/typography'
import { Plus, Edit, Trash2 } from 'lucide-react'
import type { Umkm } from '@/types/catalog'

export default function AdminUmkm() {
  const { list, create, update, del } = useAdminUmkms()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [formData, setFormData] = useState<{
    ownerId: number
    name: string
    description: string
    address: string
    whatsapp: string
    logo: string
    status: 'pending' | 'approved' | 'rejected'
  }>({
    ownerId: 2,
    name: '',
    description: '',
    address: '',
    whatsapp: '',
    logo: '',
    status: 'pending',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: formData })
      } else {
        await create.mutateAsync(formData)
      }
      setShowForm(false)
      setEditing(null)
      setFormData({ ownerId: 2, name: '', description: '', address: '', whatsapp: '', logo: '', status: 'pending' })
    } catch (err) {
      console.error(err)
      alert('Gagal menyimpan')
    }
  }

  const handleEdit = (umkm: Umkm) => {
    setEditing(umkm)
    setFormData({
      ownerId: umkm.ownerId,
      name: umkm.name,
      description: umkm.description,
      address: umkm.address,
      whatsapp: umkm.whatsapp,
      logo: umkm.logo,
      status: umkm.status,
    })
    setShowForm(true)
  }

  const handleDelete = async (umkm: Umkm) => {
    if (confirm('Hapus UMKM ini?')) {
      try {
        await del.mutateAsync(umkm.id)
      } catch {
        alert('Gagal menghapus')
      }
    }
  }

  const columns = [
    { key: 'name', header: 'Nama UMKM', cell: (row: any) => <span className="font-medium">{row.name}</span> },
    { key: 'ownerId', header: 'Pemilik ID', cell: (row: any) => <span>#{row.ownerId}</span> },
    { key: 'address', header: 'Alamat', cell: (row: any) => <span className="truncate max-w-xs">{row.address}</span> },
    { key: 'whatsapp', header: 'WhatsApp', cell: (row: any) => <span>{row.whatsapp}</span> },
    { key: 'status', header: 'Status', cell: (row: any) => (
      <span className={`badge ${
        row.status === 'approved' ? '' :
        row.status === 'rejected' ? 'badge-error' :
        'badge-secondary'
      }`}>{row.status}</span>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h3">Kelola UMKM</Typography>
        <Button onClick={() => { setEditing(null); setFormData({ ownerId: 2, name: '', description: '', address: '', whatsapp: '', logo: '', status: 'pending' }); setShowForm(true) }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah UMKM
        </Button>
      </div>

      {showForm && (
        <Card variant="filled" className="p-6">
          <Typography variant="h4" className="mb-4">{editing ? 'Edit UMKM' : 'Tambah UMKM'}</Typography>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Pemilik ID *</label>
                <Input type="number" value={formData.ownerId} onChange={e => setFormData({...formData, ownerId: parseInt(e.target.value)})} required />
              </div>
              <div>
                <label className="label">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full px-4 h-10 bg-surface-container-highest border border-outline rounded-full text-on-surface text-sm focus:border-primary focus:outline-none transition-colors">
                  <option value="pending">Pending</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Nama UMKM *</label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label className="label">Deskripsi</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-surface-container-highest border border-outline rounded-xl text-on-surface text-sm focus:border-primary focus:outline-none transition-colors resize-y" rows={3} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Alamat</label>
                <Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <label className="label">WhatsApp</label>
                <Input value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="628xxxxxxxxxx" />
              </div>
            </div>
            <div>
              <label className="label">Logo URL</label>
              <Input value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} placeholder="https://..." />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="w-full md:w-auto">{editing ? 'Update' : 'Simpan'}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); setFormData({ ownerId: 2, name: '', description: '', address: '', whatsapp: '', logo: '', status: 'pending' }) }}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <DataTable
          data={list.data ?? []}
          columns={columns}
          actions={[
            { icon: Edit, onClick: handleEdit, label: 'Edit' },
            { icon: Trash2, onClick: handleDelete, label: 'Hapus' },
          ]}
        />
      </Card>
    </div>
  )
}
