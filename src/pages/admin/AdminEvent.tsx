import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { useAdminEvents } from '@/services/admin'
import type { Event } from '@/types/catalog'
import { DataTable, type Column } from '@/components/admin/DataTable'

const columns: Column<Event>[] = [
  { header: 'Nama', accessor: 'name' },
  { header: 'Tanggal', accessor: 'date' },
  { header: 'Lokasi', accessor: 'location' },
]

const blank: Partial<Event> = { slug: '', name: '', date: '', endDate: '', location: '', description: '', image: '' }

export default function AdminEvent() {
  const { list, create, update, del } = useAdminEvents()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState<Partial<Event>>(blank)

  const openCreate = () => { setEditing(null); setForm({ ...blank }); setDialogOpen(true) }
  const openEdit = (row: Event) => { setEditing(row); setForm({ ...row }); setDialogOpen(true) }
  const handleDelete = (row: Event) => { if (confirm('Hapus?')) del.mutate(row.id) }
  const handleSave = () => {
    if (editing) update.mutate({ id: editing.id, data: form })
    else create.mutate(form)
    setDialogOpen(false)
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Event</Typography>
          <Button onClick={openCreate}>Tambah Event</Button>
        </div>
        {list.isLoading ? <Muted>Memuat...</Muted> : (
          <DataTable data={list.data ?? []} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <DataTableDialog open={dialogOpen} title={editing ? 'Edit Event' : 'Tambah Event'}
          onClose={() => setDialogOpen(false)} onSave={handleSave} loading={create.isPending || update.isPending}>
          <div className="grid gap-4">
            {(['slug', 'name', 'date', 'endDate', 'location'] as const).map((f) => (
              <div key={f}>
                <Label>{f.charAt(0).toUpperCase() + f.slice(1).replace('Enddate', 'End Date')}</Label>
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