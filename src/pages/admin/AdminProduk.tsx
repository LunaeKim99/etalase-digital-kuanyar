import { useState, useMemo } from 'react'
import { useAdminProducts, useAdminUmkms } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/DataTable'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { formatRupiah } from '@/lib/utils'
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Package } from 'lucide-react'
import type { Product } from '@/types/catalog'

export default function AdminProduk() {
  const { list, create, update, del } = useAdminProducts()
  const { list: umkmList } = useAdminUmkms()
  const { toasts, addToast, removeToast } = useToast()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'inactive'>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
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

  const filteredProducts = useMemo(() => {
    return (list.data ?? []).filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [list.data, search, statusFilter])

  const umkmOptions = useMemo(() => umkmList.data ?? [], [umkmList.data])

  const handleOpenCreate = () => {
    setEditing(null)
    setFormData({
      umkmId: umkmOptions[0]?.id ?? 1,
      name: '',
      description: '',
      price: 0,
      image: '',
      stock: 0,
      status: 'active',
    })
    setDialogOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditing(product)
    setFormData({
      umkmId: product.umkmId,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
      status: product.status,
    })
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditing(null)
    setFormData({
      umkmId: umkmOptions[0]?.id ?? 1,
      name: '',
      description: '',
      price: 0,
      image: '',
      stock: 0,
      status: 'active',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: formData })
        addToast('success', 'Produk berhasil diperbarui')
      } else {
        await create.mutateAsync(formData)
        addToast('success', 'Produk berhasil ditambahkan')
      }
      handleCloseDialog()
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal menyimpan produk')
    }
  }

  const handleDeleteClick = (product: Product) => {
    setDeletingId(product.id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deletingId === null) return
    try {
      await del.mutateAsync(deletingId)
      addToast('success', 'Produk berhasil dihapus')
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal menghapus produk')
    } finally {
      setDeleteDialogOpen(false)
      setDeletingId(null)
    }
  }

  const getUmkmName = (umkmId: number) => {
    const umkm = umkmOptions.find((u) => u.id === umkmId)
    return umkm?.name ?? `#${umkmId}`
  }

  const getStatusBadgeVariant = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'draft':
        return 'warning'
      case 'inactive':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'Aktif'
      case 'draft':
        return 'Draft'
      case 'inactive':
        return 'Nonaktif'
      default:
        return status
    }
  }

  const columns = [
    {
      key: 'image',
      header: 'Gambar',
      cell: (row: Product) => (
        <div className="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden flex items-center justify-center">
          {row.image ? (
            <img
              src={row.image}
              alt={row.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-on-surface-variant" />
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Nama Produk',
      cell: (row: Product) => (
        <div>
          <Typography variant="small" className="font-medium">{row.name}</Typography>
          <Muted className="truncate max-w-xs">#{row.id}</Muted>
        </div>
      ),
    },
    {
      key: 'umkmId',
      header: 'UMKM',
      cell: (row: Product) => (
        <Badge variant="secondary" size="sm">
          <Package className="w-3 h-3 mr-1" />
          {getUmkmName(row.umkmId)}
        </Badge>
      ),
    },
    {
      key: 'price',
      header: 'Harga',
      cell: (row: Product) => (
        <Typography variant="small" className="font-medium">
          {formatRupiah(row.price)}
        </Typography>
      ),
    },
    {
      key: 'stock',
      header: 'Stok',
      cell: (row: Product) => (
        <Typography variant="small">{row.stock}</Typography>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Product) => (
        <Badge variant={getStatusBadgeVariant(row.status)} size="sm">
          {getStatusLabel(row.status)}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <AlertDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setDeletingId(null)
        }}
        onConfirm={handleConfirmDelete}
        title="Hapus Produk"
        description="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        variant="destructive"
        loading={del.isPending}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h3">Kelola Produk</Typography>
          <Muted>Kelola data produk UMKM di Desa Kuanyar</Muted>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      <Card variant="outlined" className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <Input
              type="search"
              placeholder="Cari nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="w-full"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="draft">Draft</option>
              <option value="inactive">Nonaktif</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <DataTable
          data={filteredProducts}
          columns={columns}
          actions={[
            { icon: Edit, onClick: handleOpenEdit, label: 'Edit' },
            { icon: Trash2, onClick: handleDeleteClick, label: 'Hapus', className: 'text-error hover:bg-error/10' },
          ]}
          emptyMessage={search || statusFilter !== 'all' ? 'Tidak ada produk yang cocok' : 'Belum ada produk'}
        />
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        title={editing ? 'Edit Produk' : 'Tambah Produk'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">UMKM *</label>
              <Select
                value={formData.umkmId}
                onChange={(e) => setFormData({ ...formData, umkmId: parseInt(e.target.value) })}
                className="w-full"
                required
              >
                {umkmOptions.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="label">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
                className="w-full"
              >
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
                <option value="inactive">Nonaktif</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="label">Nama Produk *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label">Deskripsi</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label">Harga (Rp) *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                required
                min="0"
              />
            </div>
            <div>
              <label className="label">Stok</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>
            <div>
              <label className="label">Gambar URL</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          {formData.image && (
            <div className="relative w-full max-w-xs">
              <img
                src={formData.image}
                alt="Preview"
                className="max-w-full h-32 object-cover rounded-lg border border-outline-variant"
              />
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button type="submit" loading={create.isPending || update.isPending}>
              {editing ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}