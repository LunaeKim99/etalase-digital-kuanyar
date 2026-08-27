import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminUmkms } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { DataTable } from '@/components/ui/DataTable'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { emptyUmkmForm, UmkmFormFields, type UmkmFormData } from '@/components/admin/UmkmFormFields'
import { Plus, Edit, Trash2, Search, Filter, Package } from 'lucide-react'
import type { Umkm } from '@/types/catalog'

export default function AdminUmkm() {
  const navigate = useNavigate()
  const { list, create, update, del } = useAdminUmkms()
  const { toasts, addToast, removeToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Umkm | null>(null)
  const [formData, setFormData] = useState<UmkmFormData>(emptyUmkmForm)

  const [deleteTarget, setDeleteTarget] = useState<Umkm | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredData = list.data?.filter((umkm) => {
    const matchesSearch =
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || umkm.status === statusFilter
    return matchesSearch && matchesStatus
  }) ?? []

  const openCreateDialog = () => {
    setEditing(null)
    setFormData(emptyUmkmForm)
    setDialogOpen(true)
  }

  const openEditDialog = (umkm: Umkm) => {
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
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditing(null)
    setFormData(emptyUmkmForm)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: formData })
        addToast('success', 'UMKM berhasil diperbarui')
      } else {
        await create.mutateAsync(formData)
        addToast('success', 'UMKM berhasil ditambahkan')
      }
      closeDialog()
    } catch (err) {
      console.error(err)
      addToast('error', editing ? 'Gagal memperbarui UMKM' : 'Gagal menambahkan UMKM')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await del.mutateAsync(deleteTarget.id)
      addToast('success', 'UMKM berhasil dihapus')
    } catch {
      addToast('error', 'Gagal menghapus UMKM')
    } finally {
      setIsDeleting(false)
      setDeleteTarget(null)
    }
  }

  const openDeleteDialog = (umkm: Umkm) => {
    setDeleteTarget(umkm)
  }

  const getStatusBadge = (status: Umkm['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" size="sm">Disetujui</Badge>
      case 'rejected':
        return <Badge variant="error" size="sm">Ditolak</Badge>
      case 'pending':
      default:
        return <Badge variant="warning" size="sm">Menunggu</Badge>
    }
  }

  const columns = [
    { key: 'name', header: 'Nama UMKM', cell: (row: Umkm) => <span className="font-medium">{row.name}</span> },
    { key: 'ownerId', header: 'Pemilik ID', cell: (row: Umkm) => <span>#{row.ownerId}</span> },
    { key: 'address', header: 'Alamat', cell: (row: Umkm) => <span className="truncate max-w-xs">{row.address}</span> },
    { key: 'whatsapp', header: 'WhatsApp', cell: (row: Umkm) => <span>{row.whatsapp}</span> },
    { key: 'status', header: 'Status', cell: (row: Umkm) => getStatusBadge(row.status) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h3">Kelola UMKM</Typography>
          <Muted className="mt-1">Potensi Desa › UMKM — kelola data usaha masyarakat Desa Kuanyar</Muted>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" /> Tambah UMKM
        </Button>
      </div>

      <Card variant="outlined" className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <Input
              placeholder="Cari nama atau alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-on-surface-variant" />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="w-[180px]"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        {!list.isLoading && filteredData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-on-surface-variant mb-4">Belum ada UMKM</p>
            <p className="text-on-surface-variant mb-4">Tambahkan UMKM pertama untuk memulai</p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" /> Tambah UMKM
            </Button>
          </div>
        ) : (
          <DataTable
            data={filteredData}
            columns={columns}
            loading={list.isLoading}
            error={list.isError ? 'Gagal memuat data UMKM' : null}
            onRetry={() => list.refetch()}
            actions={[
              { icon: Package, onClick: (row: Umkm) => navigate(`/admin/potensi/umkm/${row.id}/produk`), label: 'Produk' },
              { icon: Edit, onClick: openEditDialog, label: 'Edit' },
              { icon: Trash2, onClick: openDeleteDialog, label: 'Hapus' },
            ]}
          />
        )}
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        title={editing ? 'Edit UMKM' : 'Tambah UMKM'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <UmkmFormFields formData={formData} setFormData={setFormData} />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={closeDialog} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {editing ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Dialog>

      <AlertDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus UMKM"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        loading={isDeleting}
        variant="destructive"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}