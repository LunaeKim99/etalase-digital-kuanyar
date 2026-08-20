import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Tabs } from '@/components/ui/tabs'
import { Dialog } from '@/components/ui/dialog'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { DataTable } from '@/components/ui/DataTable'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { useAdminPosts } from '@/services/admin'
import { apiReq } from '@/services/admin'
import { FileText, Image, Plus, Edit, Trash2, Upload } from 'lucide-react'
import type { Post, PostImage } from '@/types/catalog'

function useAdminPostImagesList() {
  return useQuery({
    queryKey: ['admin_post_images'],
    queryFn: () => apiReq<{ data: PostImage[] }>('/api/admin/images', 'GET'),
    select: (r) => r.data,
  })
}

function useAdminPostImagesMutations() {
  const qc = useQueryClient()
  return {
    add: useMutation({
      mutationFn: (data: { postId: number; imageUrl: string; caption?: string; sortOrder?: number }) =>
        apiReq<{ data: PostImage }>(`/api/admin/posts/${data.postId}/images`, 'POST', data),
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin_post_images'] }),
    }),
    del: useMutation({
      mutationFn: (id: number) => apiReq<{ data: unknown }>(`/api/admin/images/${id}`, 'DELETE'),
      onSuccess: () => qc.invalidateQueries({ queryKey: ['admin_post_images'] }),
    }),
  }
}

export default function AdminBeritaGaleri() {
  const { list: postsList, create: createPost, update: updatePost, del: deletePost } = useAdminPosts()
  const { data: imagesList } = useAdminPostImagesList()
  const { add: addImage, del: deleteImage } = useAdminPostImagesMutations()
  const { toasts, addToast, removeToast } = useToast()

  // Berita state
  const [beritaDialogOpen, setBeritaDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [beritaFormData, setBeritaFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    coverImage: '',
    publishedAt: '',
  })

  // Galeri state
  const [galeriDialogOpen, setGaleriDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<PostImage | null>(null)
  const [galeriFormData, setGaleriFormData] = useState({
    postId: '',
    imageUrl: '',
    caption: '',
    sortOrder: 0,
  })

  // Delete confirmations
  const [deletePostId, setDeletePostId] = useState<number | null>(null)
  const [deleteImageId, setDeleteImageId] = useState<number | null>(null)

  const handleBeritaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPost) {
        await updatePost.mutateAsync({ id: editingPost.id, data: beritaFormData })
        addToast('success', 'Berita berhasil diperbarui')
      } else {
        await createPost.mutateAsync(beritaFormData)
        addToast('success', 'Berita berhasil ditambahkan')
      }
      closeBeritaDialog()
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal menyimpan berita')
    }
  }

  const handleBeritaEdit = (post: Post) => {
    setEditingPost(post)
    setBeritaFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      category: post.category,
      coverImage: post.coverImage || '',
      publishedAt: post.publishedAt || '',
    })
    setBeritaDialogOpen(true)
  }

  const handleBeritaDeleteConfirm = async () => {
    if (!deletePostId) return
    try {
      await deletePost.mutateAsync(deletePostId)
      addToast('success', 'Berita berhasil dihapus')
    } catch {
      addToast('error', 'Gagal menghapus berita')
    } finally {
      setDeletePostId(null)
    }
  }

  const closeBeritaDialog = () => {
    setBeritaDialogOpen(false)
    setEditingPost(null)
    setBeritaFormData({ title: '', slug: '', content: '', category: '', coverImage: '', publishedAt: '' })
  }

  const handleGaleriSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingImage) {
        // Note: API only supports add/delete, not update for images
        // For simplicity, we'll delete and re-add (or just show toast)
        addToast('warning', 'Edit gambar belum didukung, hapus dan upload ulang')
      } else {
        await addImage.mutateAsync({
          postId: Number(galeriFormData.postId),
          imageUrl: galeriFormData.imageUrl,
          caption: galeriFormData.caption,
          sortOrder: galeriFormData.sortOrder,
        })
        addToast('success', 'Gambar berhasil diupload')
      }
      closeGaleriDialog()
    } catch (err) {
      console.error(err)
      addToast('error', 'Gagal menyimpan gambar')
    }
  }

  const handleGaleriEdit = (image: PostImage) => {
    setEditingImage(image)
    setGaleriFormData({
      postId: String(image.postId),
      imageUrl: image.imageUrl,
      caption: image.caption || '',
      sortOrder: image.sortOrder,
    })
    setGaleriDialogOpen(true)
  }

  const handleGaleriDeleteConfirm = async () => {
    if (!deleteImageId) return
    try {
      await deleteImage.mutateAsync(deleteImageId)
      addToast('success', 'Gambar berhasil dihapus')
    } catch {
      addToast('error', 'Gagal menghapus gambar')
    } finally {
      setDeleteImageId(null)
    }
  }

  const closeGaleriDialog = () => {
    setGaleriDialogOpen(false)
    setEditingImage(null)
    setGaleriFormData({ postId: '', imageUrl: '', caption: '', sortOrder: 0 })
  }

  // Berita columns
  const beritaColumns = [
    {
      key: 'coverImage',
      header: 'Sampul',
      cell: (row: Post) => (
        <div className="w-16 h-10 rounded overflow-hidden bg-surface-container-highest flex items-center justify-center">
          {row.coverImage ? (
            <img src={row.coverImage} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <FileText className="w-5 h-5 text-on-surface-variant" />
          )}
        </div>
      ),
    },
    { key: 'title', header: 'Judul', cell: (row: Post) => <span className="font-medium">{row.title}</span> },
    {
      key: 'category',
      header: 'Kategori',
      cell: (row: Post) => <Badge variant="secondary" size="sm">{row.category || '—'}</Badge>,
    },
    {
      key: 'publishedAt',
      header: 'Status',
      cell: (row: Post) =>
        row.publishedAt ? (
          <Badge variant="success" size="sm">Diterbitkan</Badge>
        ) : (
          <Badge variant="warning" size="sm">Draft</Badge>
        ),
    },
    {
      key: 'publishedAt',
      header: 'Tanggal',
      cell: (row: Post) =>
        row.publishedAt ? new Date(row.publishedAt).toLocaleDateString('id-ID') : <Muted>—</Muted>,
    },
  ]

  // Get unique posts for galeri postId select
  const postsForSelect = postsList.data ?? []

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Tabs
        tabs={[
          { id: 'berita', label: 'Berita', icon: <FileText className="w-4 h-4" /> },
          { id: 'galeri', label: 'Galeri', icon: <Image className="w-4 h-4" /> },
        ]}
        defaultTab="berita"
      >
        {(activeTab) => (
          <div>
            {/* BERITA TAB */}
            {activeTab === 'berita' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Typography variant="h3">Kelola Berita</Typography>
                  <Button
                    onClick={() => {
                      setEditingPost(null)
                      setBeritaFormData({ title: '', slug: '', content: '', category: '', coverImage: '', publishedAt: '' })
                      setBeritaDialogOpen(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Tambah Berita
                  </Button>
                </div>

                {/* Berita Dialog */}
                <Dialog open={beritaDialogOpen} onClose={closeBeritaDialog} title={editingPost ? 'Edit Berita' : 'Tambah Berita'}>
                  <form onSubmit={handleBeritaSubmit} className="space-y-4 max-w-2xl">
                    <div>
                      <label className="label">Judul *</label>
                      <Input
                        value={beritaFormData.title}
                        onChange={(e) => setBeritaFormData({ ...beritaFormData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Slug *</label>
                        <Input
                          value={beritaFormData.slug}
                          onChange={(e) => setBeritaFormData({ ...beritaFormData, slug: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="label">Kategori</label>
                        <Input
                          value={beritaFormData.category}
                          onChange={(e) => setBeritaFormData({ ...beritaFormData, category: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label">Konten</label>
                      <Textarea
                        value={beritaFormData.content}
                        onChange={(e) => setBeritaFormData({ ...beritaFormData, content: e.target.value })}
                        rows={6}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Sampul URL</label>
                        <Input
                          value={beritaFormData.coverImage}
                          onChange={(e) => setBeritaFormData({ ...beritaFormData, coverImage: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="label">Tanggal Terbit</label>
                        <Input
                          type="datetime-local"
                          value={beritaFormData.publishedAt}
                          onChange={(e) => setBeritaFormData({ ...beritaFormData, publishedAt: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={closeBeritaDialog}>
                        Batal
                      </Button>
                      <Button type="submit">{editingPost ? 'Update' : 'Simpan'}</Button>
                    </div>
                  </form>
                </Dialog>

                {/* Berita Delete Confirm */}
                <AlertDialog
                  open={!!deletePostId}
                  onClose={() => setDeletePostId(null)}
                  onConfirm={handleBeritaDeleteConfirm}
                  title="Hapus Berita"
                  description="Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan."
                  confirmLabel="Hapus"
                  variant="destructive"
                />

                {/* Berita DataTable */}
                <Card>
                  <DataTable
                    data={postsList.data ?? []}
                    columns={beritaColumns}
                    actions={[
                      { icon: Edit, onClick: handleBeritaEdit, label: 'Edit' },
                      { icon: Trash2, onClick: (post) => setDeletePostId(post.id), label: 'Hapus', className: 'text-error' },
                    ]}
                    emptyMessage="Belum ada berita"
                  />
                </Card>
              </div>
            )}

            {/* GALERI TAB */}
            {activeTab === 'galeri' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Typography variant="h3">Kelola Galeri</Typography>
                  <Button
                    onClick={() => {
                      setEditingImage(null)
                      setGaleriFormData({ postId: '', imageUrl: '', caption: '', sortOrder: 0 })
                      setGaleriDialogOpen(true)
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" /> Upload Gambar
                  </Button>
                </div>

                {/* Galeri Dialog */}
                <Dialog open={galeriDialogOpen} onClose={closeGaleriDialog} title={editingImage ? 'Edit Gambar' : 'Upload Gambar'}>
                  <form onSubmit={handleGaleriSubmit} className="space-y-4 max-w-2xl">
                    <div>
                      <label className="label">Post (Album) *</label>
                      <Select value={galeriFormData.postId} onChange={(e) => setGaleriFormData({ ...galeriFormData, postId: e.target.value })}>
                        <option value="">Pilih Post</option>
                        {postsForSelect.map((post) => (
                          <option key={post.id} value={String(post.id)}>
                            {post.title}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className="label">URL Gambar *</label>
                      <Input
                        value={galeriFormData.imageUrl}
                        onChange={(e) => setGaleriFormData({ ...galeriFormData, imageUrl: e.target.value })}
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Caption</label>
                      <Textarea
                        value={galeriFormData.caption}
                        onChange={(e) => setGaleriFormData({ ...galeriFormData, caption: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="label">Urutan</label>
                      <Input
                        type="number"
                        value={galeriFormData.sortOrder}
                        onChange={(e) => setGaleriFormData({ ...galeriFormData, sortOrder: Number(e.target.value) })}
                        min={0}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={closeGaleriDialog}>
                        Batal
                      </Button>
                      <Button type="submit">{editingImage ? 'Update' : 'Upload'}</Button>
                    </div>
                  </form>
                </Dialog>

                {/* Galeri Delete Confirm */}
                <AlertDialog
                  open={!!deleteImageId}
                  onClose={() => setDeleteImageId(null)}
                  onConfirm={handleGaleriDeleteConfirm}
                  title="Hapus Gambar"
                  description="Apakah Anda yakin ingin menghapus gambar ini? Tindakan ini tidak dapat dibatalkan."
                  confirmLabel="Hapus"
                  variant="destructive"
                />

                {/* Galeri Grid */}
                <Card>
                  <CardContent className="p-0">
                    {imagesList && imagesList.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {imagesList.map((image: PostImage) => (
                          <Card key={image.id} variant="outlined" className="overflow-hidden h-full flex flex-col">
                            <div className="relative aspect-square overflow-hidden bg-surface-container-highest">
                              <img
                                src={image.imageUrl}
                                alt={image.caption || 'Galeri'}
                                className="w-full h-full object-cover transition-transform hover:scale-105"
                              />
                            </div>
                            <div className="p-3 flex-1 flex flex-col">
                              {image.caption && (
                                <Typography variant="small" className="font-medium line-clamp-2 text-on-surface">
                                  {image.caption}
                                </Typography>
                              )}
                              <Muted className="mt-1 line-clamp-1">Post ID: {image.postId}</Muted>
                              <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-outline-variant">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleGaleriEdit(image)}
                                  className="text-primary"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteImageId(image.id)}
                                  className="text-error"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-on-surface-variant">
                        <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Belum ada gambar di galeri</p>
                        <Button variant="outline" className="mt-4" onClick={() => setGaleriDialogOpen(true)}>
                          <Upload className="w-4 h-4 mr-2" /> Upload Gambar Pertama
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </Tabs>
    </div>
  )
}