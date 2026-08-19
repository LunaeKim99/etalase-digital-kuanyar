import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts, useCategories } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight, Image as ImageIcon, Calendar } from 'lucide-react'

export default function BeritaGaleri() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const { data: posts, isLoading } = usePosts(search || undefined, category || undefined)
  const { data: categories } = useCategories()

  return (
    <>
      <Section className="pt-24 pb-12 bg-gradient-to-br from-primary-container via-background to-surface-container-low">
        <Container>
          <div className="max-w-3xl">
            <Typography variant="h1" className="mb-4">
              Berita & Galeri
            </Typography>
            <Text className="text-lg text-on-surface-variant mb-8">
              Informasi terkini dan dokumentasi kegiatan Desa Kuanyar
            </Text>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <Input
                placeholder="Cari berita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !category ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(category === cat.name ? '' : cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat.name ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-surface-container" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-surface-container rounded w-1/3" />
                    <div className="h-6 bg-surface-container rounded w-3/4" />
                    <div className="h-4 bg-surface-container rounded w-full" />
                    <div className="h-4 bg-surface-container rounded w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/berita-galeri/${post.slug}`}>
                  <Card variant="filled" className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-container flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-on-surface-variant" />
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-3 left-3 bg-primary text-on-primary text-xs font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <Typography variant="h5" className="mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </Typography>
                      <Text className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                        {post.content}
                      </Text>
                      <div className="flex items-center justify-between text-sm text-on-surface-variant">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString('id-ID')}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Baca <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container-low rounded-2xl">
              <ImageIcon className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <Typography variant="h4" className="mb-2">Belum Ada Postingan</Typography>
              <Muted>Tidak ada berita atau galeri yang ditemukan</Muted>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}