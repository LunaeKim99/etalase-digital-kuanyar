import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { useAdminTourisms } from '@/services/admin'
import type { Tourism } from '@/types/catalog'
import { DataTable, type Column } from '@/components/admin/DataTable'

const columns: Column<Tourism>[] = [
  { header: 'Nama', accessor: 'name' },
  { header: 'Lokasi', accessor: 'location' },
  { header: 'Kategori', accessor: 'category' },
]

const blank: Partial<Tourism> = { slug: '', name: '', category: '', location: '', lat: 0, lng: 0, description: '', address: '', phone: '', image: '', gallery: [], facilities: [] }

export default function AdminWisata() {
  const { list, create, update, del } = useAdminTourisms()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Tourism | null>(null)
  const [form, setForm] = useState<Partial<Tourism>>(blank)

  const openCreate = () => { setEditing(null); setForm({ ...blank }); setDialogOpen(true) }
  const openEdit = (row: Tourism) => { setEditing(row); setForm({ ...row }); setDialogOpen(true) }
  const handleDelete = (row: Tourism) => { if (confirm('Hapus?')) del.mutate(row.id) }
  const handleSave = () => {
    if (editing) update.mutate({ id: editing.id, data: form })
    else create.mutate(form)
    setDialogOpen(false)
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Wisata</Typography>
          <Button onClick={openCreate}>Tambah Wisata</Button>
        </div>
        {list.isLoading ? <Muted>Memuat...</Muted> : (
          <DataTable data={list.data ?? []} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <DataTableDialog open={dialogOpen} title={editing ? 'Edit Wisata' : 'Tambah Wisata'}
          onClose={() => setDialogOpen(false)} onSave={handleSave} loading={create.isPending || update.isPending}>
          <div className="grid gap-4">
            {(['slug', 'name', 'category', 'location', 'lat', 'lng'] as const).map((f) => (
              <div key={f}>
                <Label>{f.charAt(0).toUpperCase() + f.slice(1)}</Label>
                <Input value={String(form[f] ?? '')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [f]: e.target.value })} />
              </div>
            ))}
            <div><Label>Deskripsi</Label><textarea className="input min-h-[80px]" value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.image ?? ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
          </div>
        </DataTableDialog>
      </Container>
    </Section>
  )
}