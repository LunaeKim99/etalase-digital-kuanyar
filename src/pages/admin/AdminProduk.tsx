import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import DataTableDialog from '@/components/admin/DataTableDialog'
import { useAdminProducts, useAdminUmkms } from '@/services/admin'
import type { Product } from '@/types/catalog'
import { DataTable, type Column } from '@/components/admin/DataTable'

const columns: Column<Product>[] = [
  { header: 'Nama', accessor: 'name' },
  { header: 'UMKM', accessor: 'umkmName' },
  { header: 'Kategori', accessor: 'category' },
  { header: 'Harga', accessor: ({ price }) => `Rp${price.toLocaleString()}` },
]

const blank: Partial<Product> = {
  slug: '', name: '', umkmId: 0, umkmName: '', umkmSlug: '',
  category: '', price: 0, unit: '', stock: 0, description: '', image: '',
}

export default function AdminProduk() {
  const { list, create, update, del } = useAdminProducts()
  const { list: umkms } = useAdminUmkms()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<Partial<Product>>(blank)

  const openCreate = () => { setEditing(null); setForm({ ...blank }); setDialogOpen(true) }
  const openEdit = (row: Product) => { setEditing(row); setForm({ ...row }); setDialogOpen(true) }
  const handleDelete = (row: Product) => { if (confirm('Hapus?')) del.mutate(row.id) }
  const handleSave = () => {
    const data = { ...form }
    if (editing) update.mutate({ id: editing.id, data })
    else create.mutate(data)
    setDialogOpen(false)
  }

  return (
    <Section className="animate-slide-up">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2">Produk</Typography>
          <Button onClick={openCreate}>Tambah Produk</Button>
        </div>
        {list.isLoading ? <Muted>Memuat...</Muted> : (
          <DataTable data={list.data ?? []} columns={columns} onEdit={openEdit} onDelete={handleDelete} />
        )}
        <DataTableDialog open={dialogOpen} title={editing ? 'Edit Produk' : 'Tambah Produk'}
          onClose={() => setDialogOpen(false)} onSave={handleSave} loading={create.isPending || update.isPending}>
          <div className="grid gap-4">
            {(['slug', 'name', 'category', 'umkmName', 'umkmSlug'] as const).map((f) => (
              <div key={f}>
                <Label>{f.charAt(0).toUpperCase() + f.slice(1)}</Label>
                <Input value={String(form[f] ?? '')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [f]: e.target.value })} />
              </div>
            ))}
            <div>
              <Label>UMKM ID</Label>
              <select className="input" value={form.umkmId ?? 0}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, umkmId: Number(e.target.value) })}>
                <option value="">Pilih UMKM</option>
                {umkms.data?.map((u: { id: number; name: string }) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <div><Label>Harga</Label><Input type="number" value={form.price ?? 0}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
            <div><Label>Unit</Label><Input value={form.unit ?? ''}
              onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
            <div><Label>Stok</Label><Input type="number" value={form.stock ?? 0}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></div>
            <div><Label>Image URL</Label><Input value={form.image ?? ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            <div><Label>Deskripsi</Label><textarea className="input min-h-[80px]" value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
        </DataTableDialog>
      </Container>
    </Section>
  )
}