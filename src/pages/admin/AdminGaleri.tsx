import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { useAdminGallery } from '@/services/admin'
import type { GalleryItem } from '@/types/catalog'
import { DataTable, type Column } from '@/components/admin/DataTable'

const columns: Column<GalleryItem>[] = [
  { header: 'Tipe', accessor: 'type' },
  { header: 'Judul', accessor: 'title' },
  { header: 'Kategori', accessor: 'category' },
]

const blank: Partial<GalleryItem> = { type: 'foto', title: '', category: '', image: '', videoUrl: '' }

export default function AdminGaleri() {
  const { list, create, update, del } = useAdminGallery()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState<Partial<GalleryItem>>(blank)

  const openCreate = () => { setEditing(null); setForm({ ...blank }); setDialogOpen(true) }
  const openEdit = (row: GalleryItem) => { setEditing(row); setForm({ ...row }); setDialogOpen(true) }
  const handleDelete = (row: GalleryItem) => { if (confirm('Hapus?')) del.mutate(row.id) }
  const handleSave = () => {
    if (editing) update.mutate({ id: editing.id, data: form })
    else create.mutate(form)
    setDialogOpen(false)
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Galeri</Typography>
          <Button onClick={openCreate}>Tambah Item</Button>
        </div>
        {list.isLoading ? <Muted>Memuat...</Muted> : (
          <DataTable data={list.data ?? []} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <DataTableDialog open={dialogOpen} title={editing ? 'Edit Galeri' : 'Tambah Galeri'}
          onClose={() => setDialogOpen(false)} onSave={handleSave} loading={create.isPending || update.isPending}>
          <div className="grid gap-4">
            <div>
              <Label>Tipe</Label>
              <select className="input" value={form.type ?? 'foto'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, type: e.target.value as 'foto' | 'video' })}>
                <option value="foto">Foto</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div><Label>Judul</Label><Input value={form.title ?? ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Kategori</Label><Input value={form.category ?? ''}
              onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.image ?? ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            <div><Label>Video URL</Label><Input value={form.videoUrl ?? ''}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} /></div>
          </div>
        </DataTableDialog>
      </Container>
    </Section>
  )
}