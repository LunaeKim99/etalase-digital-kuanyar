import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { useAdminCultures } from '@/services/admin'
import type { Culture } from '@/types/catalog'
import { DataTable, type Column } from '@/components/admin/DataTable'

const columns: Column<Culture>[] = [
  { header: 'Nama', accessor: 'name' },
  { header: 'Kategori', accessor: 'category' },
  { header: 'Jadwal', accessor: 'schedule' },
]

const blank: Partial<Culture> = { slug: '', name: '', category: '', description: '', image: '', schedule: '', location: '' }

export default function AdminBudaya() {
  const { list, create, update, del } = useAdminCultures()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Culture | null>(null)
  const [form, setForm] = useState<Partial<Culture>>(blank)

  const openCreate = () => { setEditing(null); setForm({ ...blank }); setDialogOpen(true) }
  const openEdit = (row: Culture) => { setEditing(row); setForm({ ...row }); setDialogOpen(true) }
  const handleDelete = (row: Culture) => { if (confirm('Hapus?')) del.mutate(row.id) }

  const handleSave = () => {
    if (editing) update.mutate({ id: editing.id, data: form })
    else create.mutate(form)
    setDialogOpen(false)
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Budaya & Tradisi</Typography>
          <Button onClick={openCreate}>Tambah Budaya</Button>
        </div>
        {list.isLoading ? <Muted>Memuat...</Muted> : (
          <DataTable data={list.data ?? []} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <DataTableDialog open={dialogOpen} title={editing ? 'Edit Budaya' : 'Tambah Budaya'}
          onClose={() => setDialogOpen(false)} onSave={handleSave} loading={create.isPending || update.isPending}>
          <div className="grid gap-4">
            {(['slug', 'name', 'category', 'image', 'schedule', 'location'] as const).map((f) => (
              <div key={f}>
                <Label>{f.charAt(0).toUpperCase() + f.slice(1)}</Label>
                <Input value={String(form[f] ?? '')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [f]: e.target.value })} />
              </div>
            ))}
            <div><Label>Deskripsi</Label><textarea className="input min-h-[80px]" value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
        </DataTableDialog>
      </Container>
    </Section>
  )
}