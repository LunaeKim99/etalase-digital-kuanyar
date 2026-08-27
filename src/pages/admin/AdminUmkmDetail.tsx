import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAdminProducts, useAdminUmkms } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Typography, Muted } from '@/components/ui/typography'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { UmkmFormFields, emptyUmkmForm, type UmkmFormData } from '@/components/admin/UmkmFormFields'
import { formatRupiah } from '@/lib/utils'
import { ArrowLeft, Edit, Package, ExternalLink } from 'lucide-react'

function StatusBadge({ status }: { status: 'pending' | 'approved' | 'rejected' }) {
  if (status === 'approved') return <Badge variant="success" size="sm">Disetujui</Badge>
  if (status === 'rejected') return <Badge variant="error" size="sm">Ditolak</Badge>
  return <Badge variant="warning" size="sm">Menunggu</Badge>
}

export default function AdminUmkmDetail() {
  const umkmId = Number(useParams().umkmId)
  const navigate = useNavigate()
  const { list, update } = useAdminUmkms()
  const { list: prodList } = useAdminProducts()
  const { toasts, addToast, removeToast } = useToast()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState<UmkmFormData>(emptyUmkmForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const umkm = useMemo(() => list.data?.find((u) => u.id === umkmId), [list.data, umkmId])
  const products = useMemo(
    () => (prodList.data ?? []).filter((p) => p.umkmId === umkmId),
    [prodList.data, umkmId],
  )

  const openEdit = () => {
    if (!umkm) return
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await update.mutateAsync({ id: umkmId, data: formData })
      addToast('success', 'UMKM berhasil diperbarui')
      setDialogOpen(false)
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal memperbarui UMKM')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!list.isLoading && !umkm) {
    return (
      <Card className="p-8 text-center space-y-3">
        <Typography variant="h5">UMKM tidak ditemukan</Typography>
        <Button variant="outline" asChild>
          <Link to="/admin/potensi/umkm">Kembali ke daftar UMKM</Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-on-surface-variant">
        <Link to="/admin/potensi" className="hover:text-on-surface">Potensi Desa</Link>
        <span>/</span>
        <Link to="/admin/potensi/umkm" className="hover:text-on-surface">UMKM</Link>
        <span>/</span>
        <span className="text-on-surface">{umkm?.name ?? '...'}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="outline" className="w-9 h-9 p-0" aria-label="Kembali" onClick={() => navigate('/admin/potensi/umkm')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="min-w-0">
            <Typography variant="h3" className="truncate">{umkm?.name ?? 'Memuat...'}</Typography>
            {umkm && <div className="mt-1"><StatusBadge status={umkm.status} /></div>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openEdit} disabled={!umkm}>
            <Edit className="w-4 h-4 mr-2" /> Edit Profil
          </Button>
          <Button onClick={() => navigate(`/admin/potensi/umkm/${umkmId}/produk`)} disabled={!umkm}>
            <Package className="w-4 h-4 mr-2" /> Kelola Produk ({products.length})
          </Button>
        </div>
      </div>

      {/* Profil UMKM */}
      <Card variant="outlined" className="p-6">
        <Typography variant="h5" className="mb-4">Profil UMKM</Typography>
        {umkm ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-on-surface-variant">Nama Usaha</dt>
              <dd className="font-medium">{umkm.name}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Pemilik</dt>
              <dd>User #{umkm.ownerId}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-on-surface-variant">Deskripsi</dt>
              <dd>{umkm.description || <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">Alamat</dt>
              <dd>{umkm.address || <Muted>—</Muted>}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">WhatsApp</dt>
              <dd>
                {umkm.whatsapp ? (
                  <a
                    href={`https://wa.me/${umkm.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {umkm.whatsapp} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Muted>—</Muted>
                )}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-on-surface-variant">Logo</dt>
              <dd>
                {umkm.logo ? (
                  <img src={umkm.logo} alt={`Logo ${umkm.name}`} className="w-20 h-20 rounded-xl object-cover border border-outline-variant" />
                ) : (
                  <Muted>Tidak ada logo</Muted>
                )}
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

      {/* Ringkasan Produk */}
      <Card variant="outlined" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h5">Produk</Typography>
          <Button variant="outline" size="sm" onClick={() => navigate(`/admin/potensi/umkm/${umkmId}/produk`)}>
            Lihat Semua
          </Button>
        </div>
        {products.length === 0 ? (
          <Muted>Belum ada produk untuk UMKM ini.</Muted>
        ) : (
          <ul className="divide-y divide-outline-variant">
            {products.slice(0, 5).map((p) => (
              <li key={p.id} className="py-2 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Typography variant="small" className="font-medium truncate">{p.name}</Typography>
                  <Muted>{formatRupiah(p.price)} · Stok {p.stock}</Muted>
                </div>
                <Badge
                  variant={p.status === 'active' ? 'success' : p.status === 'draft' ? 'warning' : 'error'}
                  size="sm"
                >
                  {p.status === 'active' ? 'Aktif' : p.status === 'draft' ? 'Draft' : 'Nonaktif'}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Edit UMKM">
        <form onSubmit={handleSubmit} className="space-y-4">
          <UmkmFormFields formData={formData} setFormData={setFormData} />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" loading={isSubmitting}>Update</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}