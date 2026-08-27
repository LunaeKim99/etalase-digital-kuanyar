import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAdminPertanianItems } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import LazyImage from '@/components/ui/LazyImage'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import {
  PertanianFormFields,
  emptyPertanianForm,
  buildContactPayload,
  type PertanianFormData,
} from '@/components/admin/PertanianFormFields'
import { ArrowLeft, Edit, Trash2, Sprout, Users2 } from 'lucide-react'

export default function AdminPertanianDetail() {
  const itemId = Number(useParams().itemId)
  const navigate = useNavigate()
  const { list, update, del } = useAdminPertanianItems()
  const { toasts, addToast, removeToast } = useToast()

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState<PertanianFormData>(emptyPertanianForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const item = useMemo(() => list.data?.find((i) => i.id === itemId), [list.data, itemId])

  const openEdit = () => {
    if (!item) return
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
    setEditOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await update.mutateAsync({
        id: itemId,
        data: {
          name: formData.name,
          description: formData.description || null,
          owner: formData.owner || null,
          rtRw: formData.rtRw || null,
          dusun: formData.dusun || null,
          yearFounded: formData.yearFounded,
          capacity: formData.capacity || null,
          contact: buildContactPayload(formData),
        },
      })
      addToast('success', 'Data pertanian berhasil diperbarui')
      setEditOpen(false)
    } catch {
      addToast('error', 'Gagal memperbarui data pertanian')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await del.mutateAsync(itemId)
      navigate('/admin/potensi/pertanian')
    } catch {
      addToast('error', 'Gagal menghapus data pertanian')
      setIsDeleting(false)
      setDeleteOpen(false)
    }
  }

  if (!list.isLoading && !item) {
    return (
      <Card className="p-8 text-center space-y-3">
        <Typography variant="h5">Data pertanian tidak ditemukan</Typography>
        <Button variant="outline" asChild>
          <Link to="/admin/potensi/pertanian">Kembali ke daftar pertanian</Link>
        </Button>
      </Card>
    )
  }

  const sector = item?.sectorData

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex items-center gap-1 text-sm text-on-surface-variant">
        <Link to="/admin/potensi" className="hover:text-on-surface">Potensi Desa</Link>
        <span>/</span>
        <Link to="/admin/potensi/pertanian" className="hover:text-on-surface">Pertanian</Link>
        <span>/</span>
        <span className="text-on-surface">{item?.name ?? '...'}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="outline" className="w-9 h-9 p-0" aria-label="Kembali" onClick={() => navigate('/admin/potensi/pertanian')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0">
            <Typography variant="h3" className="truncate">{item?.name ?? 'Memuat...'}</Typography>
            <div className="mt-1 flex gap-2">
              <Badge variant="secondary" size="sm">
                <Sprout className="w-3 h-3 mr-1" /> Pertanian
              </Badge>
              {item?.isSector && <Badge variant="default" size="sm">Sektor</Badge>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openEdit} disabled={!item}>
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="ghost" className="text-error hover:bg-error/10" onClick={() => setDeleteOpen(true)} disabled={!item}>
            <Trash2 className="w-4 h-4 mr-2" /> Hapus
          </Button>
        </div>
      </div>

      <Card variant="outlined" className="p-6">
        <Typography variant="h5" className="mb-4">Informasi</Typography>
        {item ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="sm:col-span-2">
              <dt className="text-on-surface-variant">Deskripsi</dt>
              <dd>{item.description ?? <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Pemilik / Pengelola</dt>
              <dd>{item.owner ?? <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Alamat</dt>
              <dd>
                {[item.rtRw, item.dusun].filter(Boolean).join(', ') || <Muted>—</Muted>}
              </dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Tahun Berdiri</dt>
              <dd>{item.yearFounded ?? <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Kapasitas Produksi</dt>
              <dd>{item.capacity ?? <Muted>—</Muted>}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-on-surface-variant">Kontak</dt>
              <dd>
                {item.contact ? (
                  <div className="flex flex-wrap gap-2">
                    {item.contact.whatsapp && (
                      <a href={`https://wa.me/${item.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="underline">WA: {item.contact.whatsapp}</a>
                    )}
                    {item.contact.instagram && <span>IG: @{item.contact.instagram}</span>}
                    {item.contact.tiktok && <span>TikTok: @{item.contact.tiktok}</span>}
                    {item.contact.marketplace && <span>MP: {item.contact.marketplace}</span>}
                  </div>
                ) : (
                  <Muted>—</Muted>
                )}
              </dd>
            </div>
          </dl>
        ) : (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-surface-container-highest rounded w-2/3" />
            <div className="h-4 bg-surface-container-highest rounded w-1/2" />
          </div>
        )}
      </Card>

      {sector && (
        <Card variant="outlined" className="p-6 space-y-5">
          <Typography variant="h5">Data Sektor Pertanian</Typography>

          {sector.komoditas.length > 0 && (
            <div>
              <p className="font-medium mb-2">Komoditas</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {sector.komoditas.map((k, i) => (
                  <li key={i} className="rounded-lg border border-outline-variant p-3">
                    <span className="font-medium">{k.nama}</span>
                    {k.deskripsi && <p className="text-on-surface-variant mt-1">{k.deskripsi}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sector.musimTanam.length > 0 && (
            <div>
              <p className="font-medium mb-2">Musim Tanam &amp; Lahan</p>
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-surface-container-highest">
                  <tr>
                    <th className="text-left px-3 py-2">Musim</th>
                    <th className="text-left px-3 py-2">Lahan Aktif</th>
                    <th className="text-left px-3 py-2">Lahan Kosong</th>
                  </tr>
                </thead>
                <tbody>
                  {sector.musimTanam.map((m, i) => (
                    <tr key={i} className="border-t border-outline-variant">
                      <td className="px-3 py-2">{m.musim}</td>
                      <td className="px-3 py-2">{m.lahanAktif || <Muted>—</Muted>}</td>
                      <td className="px-3 py-2">{m.lahanKosong || <Muted>—</Muted>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {sector.kelompokTani.length > 0 && (
            <div>
              <p className="font-medium mb-2 flex items-center gap-1"><Users2 className="w-4 h-4" /> Kelompok Tani</p>
              <div className="flex flex-wrap gap-2">
                {sector.kelompokTani.map((k, i) => (
                  <Badge key={i} variant="secondary" size="sm">{k}</Badge>
                ))}
              </div>
            </div>
          )}

          {(sector.pemasaran || sector.modernisasi) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Pemasaran</p>
                <p className="text-on-surface-variant whitespace-pre-line">{sector.pemasaran || '—'}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Modernisasi</p>
                <p className="text-on-surface-variant whitespace-pre-line">{sector.modernisasi || '—'}</p>
              </div>
            </div>
          )}
        </Card>
      )}

      {item && item.images.length > 0 && (
        <Card variant="outlined" className="p-6">
          <Typography variant="h5" className="mb-4">Foto</Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {item.images.map((url) => (
              <div key={url} className="aspect-video rounded-xl overflow-hidden border border-outline-variant">
                <LazyImage src={url} alt={`Foto ${item.name}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Card>
      )}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} title="Edit Data Pertanian">
        <form onSubmit={handleUpdate} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <PertanianFormFields formData={formData} setFormData={setFormData} />
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setEditOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" loading={isSubmitting}>Update</Button>
          </div>
        </form>
      </Dialog>

      <AlertDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Data Pertanian"
        description={`Apakah Anda yakin ingin menghapus "${item?.name}"? Semua gambar terkait juga akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        loading={isDeleting}
        variant="destructive"
      />
    </div>
  )
}
