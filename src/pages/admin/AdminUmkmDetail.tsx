import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAdminUmkmItems, useAdminPotensiCategories, useAdminPotensiImages, useAdminPotensiFeatures } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { deleteOrphanMedia } from '@/services/media'
import { MultiImageUploader } from '@/components/admin/MultiImageUploader'
import { ArrowLeft, Edit, Trash2, Plus, ExternalLink, Tag } from 'lucide-react'

interface UmkmFormData {
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
}

const emptyForm: UmkmFormData = {
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
}

export default function AdminUmkmDetail() {
  const umkmId = Number(useParams().umkmId)
  const navigate = useNavigate()
  const { list, update, del, umkmCategoryIds } = useAdminUmkmItems()
  const { list: catList } = useAdminPotensiCategories()
  const imagesApi = useAdminPotensiImages(umkmId)
  const featuresApi = useAdminPotensiFeatures()
  const { toasts, addToast, removeToast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState<UmkmFormData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const categories = useMemo(() => catList.data ?? [], [catList.data])
  const item = useMemo(
    () => list.data?.find((i) => i.id === umkmId && umkmCategoryIds.includes(i.categoryId)),
    [list.data, umkmId, umkmCategoryIds]
  )

  const openEdit = () => {
    if (!item) return
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
    })
    setDialogOpen(true)
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
      }
      await update.mutateAsync({ id: umkmId, data: payload })
      addToast('success', 'UMKM berhasil diperbarui')
      setDialogOpen(false)
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal memperbarui UMKM')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await del.mutateAsync(umkmId)
      navigate('/admin/potensi/umkm')
    } catch {
      addToast('error', 'Gagal menghapus UMKM')
      setIsDeleting(false)
      setDeleteOpen(false)
    }
  }

  const imageRows = useMemo(() => imagesApi.rows.data ?? [], [imagesApi.rows.data])
  const imageUrls = useMemo(
    () => (imageRows.length > 0 ? imageRows.map((r) => r.imageUrl) : item?.images ?? []),
    [imageRows, item],
  )

  const handleImagesChange = async (nextUrls: string[]) => {
    const added = nextUrls.filter((url) => !imageUrls.includes(url))
    const removedIds = imageUrls
      .filter((url) => !nextUrls.includes(url))
      .map((url) => imageRows.find((r) => r.imageUrl === url)?.id)
      .filter((id): id is number => typeof id === 'number')

    for (const url of added) {
      try {
        await imagesApi.add.mutateAsync({
          itemId: umkmId,
          imageUrl: url,
          sortOrder: nextUrls.indexOf(url),
        })
      } catch {
        void deleteOrphanMedia(url)
        addToast('error', 'Gagal menyimpan salah satu gambar. File upload dihapus.')
      }
    }
    for (const id of removedIds) {
      try {
        await imagesApi.del.mutateAsync(id)
        addToast('success', 'Gambar dihapus')
      } catch {
        addToast('error', 'Gagal menghapus gambar')
      }
    }
  }

  const handleImagesReorder = async (nextUrls: string[]) => {
    const orderedIds = nextUrls
      .map((url) => imageRows.find((r) => r.imageUrl === url)?.id)
      .filter((id): id is number => typeof id === 'number')
    if (orderedIds.length !== nextUrls.length) return
    try {
      await imagesApi.reorder.mutateAsync({ itemId: umkmId, orderedIds })
    } catch {
      addToast('error', 'Gagal mengubah urutan gambar')
    }
  }

  const handleAddFeature = async () => {
    if (!newFeature.trim()) return
    try {
      await featuresApi.add.mutateAsync({ itemId: umkmId, feature: newFeature.trim() })
      addToast('success', 'Fitur ditambahkan')
      setNewFeature('')
    } catch {
      addToast('error', 'Gagal menambahkan fitur')
    }
  }

  const getCategoryTitle = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? slug

  if (!list.isLoading && !item) {
    return (
      <Card className="p-8 text-center space-y-3">
        <Typography variant="h5">UMKM tidak ditemukan</Typography>
        <Button variant="outline" asChild>
          <Link to="/admin/potensi/umkm">Kembali ke daftar UMKM</Link>
        </Button>
      </Card>
    )
  }

  const wa = item?.contact?.whatsapp
  const ig = item?.contact?.instagram
  const tt = item?.contact?.tiktok
  const mp = item?.contact?.marketplace

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center gap-1 text-sm text-on-surface-variant">
        <Link to="/admin/potensi" className="hover:text-on-surface">Potensi Desa</Link>
        <span>/</span>
        <Link to="/admin/potensi/umkm" className="hover:text-on-surface">UMKM</Link>
        <span>/</span>
        <span className="text-on-surface">{item?.name ?? '...'}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="outline" className="w-9 h-9 p-0" aria-label="Kembali" onClick={() => navigate('/admin/potensi/umkm')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0">
            <Typography variant="h3" className="truncate">{item?.name ?? 'Memuat...'}</Typography>
            {item && <Badge variant="secondary" size="sm" className="mt-1">{getCategoryTitle(item.category)}</Badge>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openEdit} disabled={!item}>
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="outline" className="text-error hover:bg-error/10" onClick={() => setDeleteOpen(true)} disabled={!item}>
            <Trash2 className="w-4 h-4 mr-2" /> Hapus
          </Button>
        </div>
      </div>

      <Card variant="outlined" className="p-6">
        <Typography variant="h5" className="mb-4">Profil UMKM</Typography>
        {item ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-on-surface-variant">Nama Usaha</dt>
              <dd className="font-medium">{item.name}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Pemilik / Pengelola</dt>
              <dd>{item.owner ?? <Muted>—</Muted>}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-on-surface-variant">Deskripsi</dt>
              <dd className="whitespace-pre-line">{item.description ?? <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Alamat</dt>
              <dd>{[item.rtRw, item.dusun].filter(Boolean).join(', ') || <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Tahun Berdiri</dt>
              <dd>{item.yearFounded ?? <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Kapasitas Produksi</dt>
              <dd>{item.capacity ?? <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Kontak</dt>
              <dd>
                <div className="flex flex-wrap gap-3">
                  {wa && (
                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      WA: {wa} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {ig && <span>IG: @{ig}</span>}
                  {tt && <span>TikTok: @{tt}</span>}
                  {mp && <span>MP: {mp}</span>}
                  {!wa && !ig && !tt && !mp && <Muted>—</Muted>}
                </div>
              </dd>
            </div>
          </dl>
        ) : (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-surface-container-highest rounded w-1/2" />
            <div className="h-4 bg-surface-container-highest rounded w-1/3" />
          </div>
        )}
      </Card>

      <Card variant="outlined" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h5">Fitur / Keunggulan</Typography>
          <Badge variant="secondary" size="sm">{item?.features?.length ?? 0}</Badge>
        </div>
        {item && item.features.length > 0 ? (
          <ul className="space-y-2">
            {item.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest">
                <Tag className="w-4 h-4 text-on-surface-variant" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Muted>Belum ada fitur</Muted>
        )}
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Tambah fitur baru..."
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
          />
          <Button onClick={handleAddFeature} disabled={!newFeature.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <Card variant="outlined" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h5">Foto</Typography>
          <Badge variant="secondary" size="sm">{imageUrls.length}</Badge>
        </div>
        <MultiImageUploader
          label="Foto UMKM"
          context="umkm"
          value={imageUrls}
          max={20}
          disabled={!item}
          onChange={(next) => void handleImagesChange(next)}
          onReorder={(next) => void handleImagesReorder(next)}
          itemAlt={(_, i) => `Foto ${i + 1} ${item?.name ?? 'UMKM'}`}
        />
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Edit UMKM">
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="label">Kategori *</label>
            <Select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
              required
            >
              <option value="">Pilih kategori</option>
              {categories
                .filter((c) => c.slug === 'konveksi' || c.slug === 'umkm-makanan')
                .map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
            </Select>
          </div>

          <div>
            <label className="label">Nama UMKM *</label>
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
                onChange={(e) => setFormData({ ...formData, yearFounded: e.target.value ? parseInt(e.target.value) : null })}
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
                <Input value={formData.contactWhatsapp} onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })} placeholder="628xxxxxxxxxx" />
              </div>
              <div>
                <label className="label">Instagram</label>
                <Input value={formData.contactInstagram} onChange={(e) => setFormData({ ...formData, contactInstagram: e.target.value })} placeholder="username" />
              </div>
              <div>
                <label className="label">TikTok</label>
                <Input value={formData.contactTiktok} onChange={(e) => setFormData({ ...formData, contactTiktok: e.target.value })} placeholder="username" />
              </div>
              <div>
                <label className="label">Marketplace</label>
                <Input value={formData.contactMarketplace} onChange={(e) => setFormData({ ...formData, contactMarketplace: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" loading={isSubmitting}>Update</Button>
          </div>
        </form>
      </Dialog>

      <AlertDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus UMKM"
        description={`Apakah Anda yakin ingin menghapus "${item?.name}"? Semua gambar dan fitur terkait juga akan dihapus.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        loading={isDeleting}
        variant="destructive"
      />
    </div>
  )
}
