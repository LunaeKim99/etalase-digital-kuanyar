import { useState } from 'react'
import { useAdminPosts } from '@/services/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/ui/DataTable'
import { Typography } from '@/components/ui/typography'
import { Plus, Edit, Trash2 } from 'lucide-react'
import type { Post } from '@/types/catalog'

export default function AdminBeritaGaleri() {
  const { list, create, update, del } = useAdminPosts()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    coverImage: '',
    publishedAt: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, data: formData })
      } else {
        await create.mutateAsync(formData)
      }
      setShowForm(false)
      setEditing(null)
      setFormData({ title: '', slug: '', content: '', category: '', coverImage: '', publishedAt: '' })
    } catch (err) {
      console.error(err)
      alert('Gagal menyimpan')
    }
  }

  const handleEdit = (post: Post) => {
    setEditing(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      category: post.category,
      coverImage: post.coverImage || '',
      publishedAt: post.publishedAt || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (post: Post) => {
    if (confirm('Hapus postingan ini?')) {
      try {
        await del.mutateAsync(post.id)
      } catch {
        alert('Gagal menghapus')
      }
    }
  }

  const columns = [
    { key: 'title', header: 'Judul', cell: (row: any) => <span className="font-medium">{row.title}</span> },
    { key: 'category', header: 'Kategori', cell: (row: any) => <span className="badge">{row.category}</span> },
    { key: 'publishedAt', header: 'Diterbitkan', cell: (row: any) => <span>{row.publishedAt ? new Date(row.publishedAt).toLocaleDateString('id-ID') : 'Draft'}</span> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h3">Kelola Berita & Galeri</Typography>
        <Button onClick={() => { setEditing(null); setFormData({ title: '', slug: '', content: '', category: '', coverImage: '', publishedAt: '' }); setShowForm(true) }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Postingan
        </Button>
      </div>

      {showForm && (
        <Card variant="filled" className="p-6">
          <Typography variant="h4" className="mb-4">{editing ? 'Edit Postingan' : 'Tambah Postingan'}</Typography>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div>
              <label className="label">Judul *</label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Slug *</label>
                <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
              </div>
              <div>
                <label className="label">Kategori</label>
                <Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="label">Konten</label>
              <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 bg-surface-container-highest border border-outline rounded-xl text-on-surface text-sm focus:border-primary focus:outline-none transition-colors resize-y" rows={6} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Sampul URL</label>
                <Input value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} placeholder="https://..." />
              </div>
              <div>
                <label className="label">Tanggal Terbit</label>
                <Input type="datetime-local" value={formData.publishedAt} onChange={e => setFormData({...formData, publishedAt: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? 'Update' : 'Simpan'}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); setFormData({ title: '', slug: '', content: '', category: '', coverImage: '', publishedAt: '' }) }}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <DataTable
          data={list.data ?? []}
          columns={columns}
          actions={[
            { icon: Edit, onClick: handleEdit, label: 'Edit' },
            { icon: Trash2, onClick: handleDelete, label: 'Hapus' },
          ]}
        />
      </Card>
    </div>
  )
}
