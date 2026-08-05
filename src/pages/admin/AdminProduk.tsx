import { useState } from 'react'
import { useAdminProducts, useAdminUmkms } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/DataTable'
import { Typography } from '@/components/ui/typography'
import { formatRupiah } from '@/lib/utils'
import { Plus, Edit, Trash2 } from 'lucide-react'
import type { Product } from '@/types/catalog'

export default function AdminProduk() {
  const { list, create, update, del } = useAdminProducts()
  const { list: umkmList } = useAdminUmkms()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [formData, setFormData] = useState<{
    umkmId: number
    name: string
    description: string
    price: number
    image: string
    stock: number
    status: 'active' | 'draft' | 'inactive'
  }>({
    umkmId: 1,
    name: '',
    description: '',
    price: 0,
    image: '',
    stock: 0,
    status: 'active',
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
      setFormData({ umkmId: 1, name: '', description: '', price: 0, image: '', stock: 0, status: 'active' })
    } catch (err) {
      console.error(err)
      alert('Gagal menyimpan')
    }
  }

  const handleEdit = (prod: Product) => {
    setEditing(prod)
    setFormData({
      umkmId: prod.umkmId,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      image: prod.image,
      stock: prod.stock,
      status: prod.status,
    })
    setShowForm(true)
  }

  const handleDelete = async (prod: Product) => {
    if (confirm('Hapus produk ini?')) {
      try {
        await del.mutateAsync(prod.id)
      } catch {
        alert('Gagal menghapus')
      }
    }
  }

  const getUmkmName = (umkmId: number) => {
    const umkm = umkmList.data?.find(u => u.id === umkmId)
    return umkm?.name || `#${umkmId}`
  }

  const columns = [
    { key: 'name', header: 'Nama Produk', cell: (row: any) => <span className="font-medium">{row.name}</span> },
    { key: 'umkmId', header: 'UMKM', cell: (row: any) => <span>{getUmkmName(row.umkmId)}</span> },
    { key: 'price', header: 'Harga', cell: (row: any) => <span className="font-medium">{formatRupiah(row.price)}</span> },
    { key: 'stock', header: 'Stok', cell: (row: any) => <span>{row.stock}</span> },
    { key: 'status', header: 'Status', cell: (row: any) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        row.status === 'active' ? 'bg-green-100 text-green-700' :
        row.status === 'draft' ? 'bg-gray-100 text-gray-700' :
        'bg-red-100 text-red-700'
      }`}>{row.status}</span>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h3">Kelola Produk</Typography>
        <Button onClick={() => { setEditing(null); setFormData({ umkmId: 1, name: '', description: '', price: 0, image: '', stock: 0, status: 'active' }); setShowForm(true) }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <Typography variant="h4" className="mb-4">{editing ? 'Edit Produk' : 'Tambah Produk'}</Typography>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">UMKM *</label>
                <select value={formData.umkmId} onChange={e => setFormData({...formData, umkmId: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-border rounded-lg" required>
                  {umkmList.data?.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full px-3 py-2 border border-border rounded-lg">
                  <option value="active">Aktif</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nama Produk *</label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg" rows={3} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Harga (Rp) *</label>
                <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stok</label>
                <Input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gambar URL</label>
                <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="w-full md:w-auto">{editing ? 'Update' : 'Simpan'}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); setFormData({ umkmId: 1, name: '', description: '', price: 0, image: '', stock: 0, status: 'active' }) }}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <DataTable
          data={list.data ?? []}
          columns={columns}
          actions={[
            { icon: Edit, onClick: handleEdit, label: 'Edit', className: 'text-blue-600 hover:text-blue-800' },
            { icon: Trash2, onClick: handleDelete, label: 'Hapus', className: 'text-red-600 hover:text-red-800' },
          ]}
        />
      </Card>
    </div>
  )
}