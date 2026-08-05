import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { useAdminArticles } from '@/services/admin'
import type { Article } from '@/types/catalog'
import { DataTable, type Column } from '@/components/admin/DataTable'

const columns: Column<Article>[] = [
  { header: 'Judul', accessor: 'title' },
  { header: 'Kategori', accessor: 'category' },
  { header: 'Penulis', accessor: 'author' },
]

const blank: Partial<Article> = { slug: '', title: '', category: '', author: '', date: '', cover: '', excerpt: '', content: '' }

export default function AdminArtikel() {
  const { list, create, update, del } = useAdminArticles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Article | null>(null)
  const [form, setForm] = useState<Partial<Article>>(blank)

  const openCreate = () => { setEditing(null); setForm({ ...blank }); setDialogOpen(true) }
  const openEdit = (row: Article) => { setEditing(row); setForm({ ...row }); setDialogOpen(true) }
  const handleDelete = (row: Article) => { if (confirm('Hapus?')) del.mutate(row.id) }
  const handleSave = () => {
    if (editing) update.mutate({ id: editing.id, data: form })
    else create.mutate(form)
    setDialogOpen(false)
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Artikel</Typography>
          <Button onClick={openCreate}>Tambah Artikel</Button>
        </div>
        {list.isLoading ? <Muted>Memuat...</Muted> : (
          <DataTable data={list.data ?? []} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <DataTableDialog open={dialogOpen} title={editing ? 'Edit Artikel' : 'Tambah Artikel'}
          onClose={() => setDialogOpen(false)} onSave={handleSave} loading={create.isPending || update.isPending}>
          <div className="grid gap-4">
            {(['slug', 'title', 'category', 'author', 'date'] as const).map((f) => (
              <div key={f}>
                <Label>{f.charAt(0).toUpperCase() + f.slice(1)}</Label>
                <Input value={String(form[f] ?? '')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [f]: e.target.value })} />
              </div>
            ))}
            <div><Label>Cover URL</Label><Input value={form.cover ?? ''}
              onChange={(e) => setForm({ ...form, cover: e.target.value })} /></div>
            <div><Label>Excerpt</Label><Input value={form.excerpt ?? ''}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
            <div><Label>Konten</Label><textarea className="input min-h-[120px]" value={form.content ?? ''}
              onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
          </div>
        </DataTableDialog>
      </Container>
    </Section>
  )
}