import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminPertanianItems } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/DataTable'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import {
  PertanianFormFields,
  emptyPertanianForm,
  buildContactPayload,
  type PertanianFormData,
} from '@/components/admin/PertanianFormFields'
import { Plus, Edit, Trash2, Search, Eye, Image as ImageIcon, Wheat } from 'lucide-react'
import type { PotensiItem } from '@/types/catalog'

export default function AdminPertanian() {
  const navigate = useNavigate()
  const { list, create, update, del, pertanianCategoryId } = useAdminPertanianItems()
  const { toasts, addToast, removeToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<PotensiItem | null>(null)
  const [formData, setFormData] = useState<PertanianFormData>(emptyPertanianForm)
  const [deleteTarget, setDeleteTarget] = useState<PotensiItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return (list.data ?? []).filter(
      (item) =>
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description ?? '').toLowerCase().includes(q),
    )
  }, [list.data, searchQuery])

  const openCreateDialog = () => {
    setEditing(null)
    setFormData(emptyPertanianForm)
    setDialogOpen(true)
  }

  const openEditDialog = (item: PotensiItem) => {
    setEditing(item)
    setFormData({
      name: item.name,
      description: item.description ?? '',
      owner: item.owner ?? '',
      rtRw: item.rtRw ?? '',
      dusun: item.dusun ?? '',
      yearFounded: item.yearFounded,
      capacity: item.capacity ?? '',
      contactWhatsapp: item.contact?.whatsapp ?? '',
      contactInstagram: item.contact?.instagram ?? '',
      contactTiktok: item.contact?.tiktok ?? '',
      contactMarketplace: item.contact?.marketplace ?? '',
    })
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditing(null)
    setFormData(emptyPertanianForm)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        name: formData.name,
        description: formData.description || null,
        owner: formData.owner || null,
        rtRw: formData.rtRw || null,
        dusun: formData.dusun || null,
        yearFounded: formData.yearFounded,
        capacity: formData.capacity || null,
        contact: buildContactPayload(formData),
      }
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: payload })
        addToast('success', 'Data pertanian berhasil diperbarui')
      } else {
        await create.mutateAsync(payload)
        addToast('success', 'Data pertanian berhasil ditambahkan')
      }
      closeDialog()
    } catch (err) {
      console.error(err)
      addToast('error', editing ? 'Gagal memperbarui data pertanian' : 'Gagal menambahkan data pertanian')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await del.mutateAsync(deleteTarget.id)
      addToast('success', 'Data pertanian berhasil dihapus')
    } catch {
      addToast('error', 'Gagal menghapus data pertanian')
    } finally {
      setIsDeleting(false)
      setDeleteTarget(null)
    }
  }

  const columns = [
    { key: 'name', header: 'Nama', cell: (row: PotensiItem) => <span className="font-medium">{row.name}</span> },
    { key: 'owner', header: 'Pemilik / Pengelola', cell: (row: PotensiItem) => row.owner ?? <Muted>—</Muted> },
    { key: 'dusun', header: 'Dusun', cell: (row: PotensiItem) => row.dusun ?? <Muted>—</Muted> },
    {
      key: 'images',
      header: 'Gambar',
      cell: (row: PotensiItem) => (
        <span className="flex items-center gap-1 text-sm">
          <ImageIcon className="w-4 h-4 text-on-surface-variant" />
          {row.images?.length ?? 0}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h3">Data Pertanian</Typography>
          <Muted className="mt-1">Potensi Desa › Pertanian — komoditas, lahan, dan kelompok tani</Muted>
        </div>
        <Button onClick={openCreateDialog} disabled={!pertanianCategoryId}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Data
        </Button>
      </div>

      <Card variant="outlined" className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input
            placeholder="Cari nama atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card>
        {!list.isLoading && filteredData.length === 0 ? (
          <div className="text-center py-12">
            <Wheat className="w-10 h-10 mx-auto mb-3 text-on-surface-variant" />
            <p className="text-on-surface-variant mb-4">
              {searchQuery ? 'Tidak ada data yang cocok' : 'Belum ada data pertanian'}
            </p>
            {!searchQuery && (
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Data
              </Button>
            )}
          </div>
        ) : (
          <DataTable
            data={filteredData}
            columns={columns}
            loading={list.isLoading}
            error={list.isError ? 'Gagal memuat data pertanian' : null}
            onRetry={() => list.refetch()}
            actions={[
              { icon: Eye, onClick: (row: PotensiItem) => navigate(`/admin/potensi/pertanian/${row.id}`), label: 'Detail' },
              { icon: Edit, onClick: openEditDialog, label: 'Edit' },
              { icon: Trash2, onClick: (row: PotensiItem) => setDeleteTarget(row), label: 'Hapus', className: 'text-error hover:bg-error/10' },
            ]}
            emptyMessage="Belum ada data pertanian"
          />
        )}
      </Card>

      <Dialog open={dialogOpen} onClose={closeDialog} title={editing ? 'Edit Data Pertanian' : 'Tambah Data Pertanian'}>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <PertanianFormFields formData={formData} setFormData={setFormData} />
          <div className="flex gap-2 justify-end pt-2">
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
        title="Hapus Data Pertanian"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"? Semua gambar terkait juga akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        loading={isDeleting}
        variant="destructive"
      />
    </div>
  )
}
