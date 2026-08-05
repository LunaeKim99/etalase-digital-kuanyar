import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { DataTable, type Column } from '@/components/admin/DataTable'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { Input, Label } from '@/components/ui/input'
import { useAdminUmkms } from '@/services/admin'
import type { Umkm } from '@/types/catalog'

const columns: Column<Umkm>[] = [
  { header: 'Nama', accessor: 'name' },
  { header: 'Pemilik', accessor: 'owner' },
  { header: 'Kategori', accessor: 'category' },
  { header: 'Telepon', accessor: 'phone' },
]

const blank: Partial<Umkm> = { slug: '', name: '', owner: '', category: '', phone: '', description: '', address: '', image: '' }

export default function AdminUmkm() {
  const { list, create, update, del } = useAdminUmkms()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Umkm | null>(null)
  const [form, setForm] = useState<Partial<Umkm>>(blank)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  const openCreate = () => {
    setEditing(null)
    setForm({ ...blank })
    setDialogOpen(true)
  }

  const openEdit = (row: Umkm) => {
    setEditing(row)
    setForm({ ...row })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editing) {
      update.mutate({ id: editing.id, data: form }, {
        onSuccess: () => setDialogOpen(false),
      })
    } else {
      create.mutate(form, {
        onSuccess: () => setDialogOpen(false),
      })
    }
  }

  const handleDelete = (row: Umkm) => {
    if (deleteConfirm === row.id) {
      del.mutate(row.id)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(row.id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">UMKM</Typography>
          <Button onClick={openCreate}>Tambah UMKM</Button>
        </div>
        {list.isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-surface rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <DataTable
            data={list.data ?? []}
            columns={columns}
            onEdit={openEdit}
            onDelete={handleDelete}
            renderRowActions={(row) => (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(row)}
                className={deleteConfirm === row.id ? 'text-error font-bold' : 'text-text-muted'}
              >
                {deleteConfirm === row.id ? 'Konfirmasi Hapus' : ''}
              </Button>
            )}
          />
        )}
        <DataTableDialog
          open={dialogOpen}
          title={editing ? 'Edit UMKM' : 'Tambah UMKM'}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          loading={create.isPending || update.isPending}
        >
          <div className="grid gap-4">
            {(['slug', 'name', 'owner', 'category', 'phone', 'address'] as const).map((f) => (
              <div key={f}>
                <Label htmlFor={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</Label>
                <Input
                  id={f}
                  value={(form[f] as string) ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [f]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                id="description"
                className="input min-h-[80px]"
                value={(form.description as string) ?? ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="image">Gambar URL</Label>
              <Input
                id="image"
                value={(form.image as string) ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, image: e.target.value })}
              />
            </div>
          </div>
        </DataTableDialog>
      </Container>
    </Section>
  )
}