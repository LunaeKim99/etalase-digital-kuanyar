import { useState, useMemo } from 'react'
import { useAdminPotensiItems, useAdminPotensiCategories } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DataTable } from '@/components/ui/DataTable'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, Search, Filter, Image as ImageIcon, Tag } from 'lucide-react'
import type { PotensiItem } from '@/types/catalog'

interface ItemFormData {
  categoryId: number
  name: string
  description: string
  owner: string
  rtRw: string
  dusun: string
  yearFounded: number | null
  capacity: string
  contactWhatsapp: string
  contactInstagram: string
  contactTiktok: string
  contactMarketplace: string
  isSector: boolean
}

const emptyItemForm: ItemFormData = {
  categoryId: 0,
  name: '',
  description: '',
  owner: '',
  rtRw: '',
  dusun: '',
  yearFounded: null,
  capacity: '',
  contactWhatsapp: '',
  contactInstagram: '',
  contactTiktok: '',
  contactMarketplace: '',
  isSector: false,
}

export default function AdminPotensi() {
  const { list, create, update, del } = useAdminPotensiItems()
  const { list: catList } = useAdminPotensiCategories()
  const { toasts, addToast, removeToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<PotensiItem | null>(null)
  const [formData, setFormData] = useState<ItemFormData>(emptyItemForm)

  const [deleteTarget, setDeleteTarget] = useState<PotensiItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const categories = useMemo(() => catList.data ?? [], [catList.data])

  const filteredData = useMemo(() => {
    return (list.data ?? []).filter((item) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description ?? '').toLowerCase().includes(q) ||
        (item.owner ?? '').toLowerCase().includes(q)
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [list.data, searchQuery, categoryFilter])

  const getCategoryTitle = (slug: string) => {
    return categories.find((c) => c.slug === slug)?.title ?? slug
  }

  const openCreateDialog = () => {
    setEditing(null)
    setFormData({ ...emptyItemForm, categoryId: categories[0]?.id ?? 0 })
    setDialogOpen(true)
  }

  const openEditDialog = (item: PotensiItem) => {
    setEditing(item)
    setFormData({
      categoryId: item.categoryId,
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
      isSector: item.isSector,
    })
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditing(null)
    setFormData(emptyItemForm)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        categoryId: formData.categoryId,
        name: formData.name,
        description: formData.description || null,
        owner: formData.owner || null,
        rtRw: formData.rtRw || null,
        dusun: formData.dusun || null,
        yearFounded: formData.yearFounded,
        capacity: formData.capacity || null,
        contact:
          formData.contactWhatsapp || formData.contactInstagram || formData.contactTiktok || formData.contactMarketplace
            ? {
                whatsapp: formData.contactWhatsapp || undefined,
                instagram: formData.contactInstagram || undefined,
                tiktok: formData.contactTiktok || undefined,
                marketplace: formData.contactMarketplace || undefined,
              }
            : null,
        isSector: formData.isSector,
      }
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: payload })
        addToast('success', 'Potensi berhasil diperbarui')
      } else {
        await create.mutateAsync(payload)
        addToast('success', 'Potensi berhasil ditambahkan')
      }
      closeDialog()
    } catch (err) {
      console.error(err)
      addToast('error', editing ? 'Gagal memperbarui potensi' : 'Gagal menambahkan potensi')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await del.mutateAsync(deleteTarget.id)
      addToast('success', 'Potensi berhasil dihapus')
    } catch {
      addToast('error', 'Gagal menghapus potensi')
    } finally {
      setIsDeleting(false)
      setDeleteTarget(null)
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Nama Potensi',
      cell: (row: PotensiItem) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: 'category',
      header: 'Kategori',
      cell: (row: PotensiItem) => (
        <Badge variant="secondary" size="sm">
          <Tag className="w-3 h-3 mr-1" />
          {getCategoryTitle(row.category)}
        </Badge>
      ),
    },
    {
      key: 'owner',
      header: 'Pemilik',
      cell: (row: PotensiItem) => row.owner ?? <Muted>—</Muted>,
    },
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
    {
      key: 'isSector',
      header: 'Tipe',
      cell: (row: PotensiItem) =>
        row.isSector ? <Badge variant="secondary" size="sm">Sektor</Badge> : <Badge variant="default" size="sm">UMKM</Badge>,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h3">Kelola Potensi Desa</Typography>
          <Muted className="mt-1">Kelola data potensi desa yang tampil di halaman publik</Muted>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Potensi
        </Button>
      </div>

      <Card variant="outlined" className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <Input
              placeholder="Cari nama atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-on-surface-variant" />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-[180px]"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.title}</option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        {!list.isLoading && filteredData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-on-surface-variant mb-4">Belum ada potensi desa</p>
            <p className="text-on-surface-variant mb-4">Tambahkan potensi pertama untuk memulai</p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" /> Tambah Potensi
            </Button>
          </div>
        ) : (
          <DataTable
            data={filteredData}
            columns={columns}
            loading={list.isLoading}
            error={list.isError ? 'Gagal memuat data potensi' : null}
            onRetry={() => list.refetch()}
            actions={[
              { icon: Edit, onClick: openEditDialog, label: 'Edit' },
              { icon: Trash2, onClick: (item: PotensiItem) => setDeleteTarget(item), label: 'Hapus' },
            ]}
          />
        )}
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        title={editing ? 'Edit Potensi' : 'Tambah Potensi'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Kategori *</label>
              <Select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="label">Tipe</label>
              <Select
                value={formData.isSector ? 'sector' : 'umkm'}
                onChange={(e) => setFormData({ ...formData, isSector: e.target.value === 'sector' })}
              >
                <option value="umkm">UMKM / Usaha</option>
                <option value="sector">Sektor (Pertanian dll)</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="label">Nama Potensi *</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Pemilik / Pengelola</label>
              <Input
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              />
            </div>
            <div>
              <label className="label">RT/RW</label>
              <Input
                value={formData.rtRw}
                onChange={(e) => setFormData({ ...formData, rtRw: e.target.value })}
                placeholder="RT 01/RW 01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Dusun</label>
              <Input
                value={formData.dusun}
                onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Tahun Berdiri</label>
              <Input
                type="number"
                value={formData.yearFounded ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearFounded: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="label">Kapasitas Produksi</label>
            <Input
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              placeholder="cth: 1000 pcs/bulan"
            />
          </div>

          <div className="border-t border-outline-variant pt-4">
            <Typography variant="h6" className="mb-3">Kontak (opsional)</Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">WhatsApp</label>
                <Input
                  value={formData.contactWhatsapp}
                  onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
                  placeholder="628xxxxxxxxxx"
                />
              </div>
              <div>
                <label className="label">Instagram</label>
                <Input
                  value={formData.contactInstagram}
                  onChange={(e) => setFormData({ ...formData, contactInstagram: e.target.value })}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="label">TikTok</label>
                <Input
                  value={formData.contactTiktok}
                  onChange={(e) => setFormData({ ...formData, contactTiktok: e.target.value })}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="label">Marketplace</label>
                <Input
                  value={formData.contactMarketplace}
                  onChange={(e) => setFormData({ ...formData, contactMarketplace: e.target.value })}
                />
              </div>
            </div>
          </div>

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
        title="Hapus Potensi"
        description={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"? Semua gambar dan fitur terkait juga akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        loading={isDeleting}
        variant="destructive"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
