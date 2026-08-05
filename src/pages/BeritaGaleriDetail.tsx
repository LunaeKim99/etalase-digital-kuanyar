import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePost } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'

export default function BeritaGaleriDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading } = usePost(slug || '')
  const [copied, setCopied] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Typography variant="h3" className="mb-2">Postingan Tidak Ditemukan</Typography>
          <Button asChild variant="outline">
            <Link to="/berita-galeri">Kembali ke Berita & Galeri</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      alert('Salin link gagal')
    }
  }

  return (
    <>
      <Section className="pt-16 pb-8">
        <Container>
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/berita-galeri">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
            </Link>
          </Button>

          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <Typography variant="h1" className="mb-4">
                {post.title}
              </Typography>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                {post.publishedAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString('id-ID')}
                  </span>
                )}
                {post.category && (
                  <span className="px-2 py-1 bg-surface rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                )}
                <button onClick={handleShare} className="p-1 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="sr-only">Bagikan</span>
                </button>
                {copied && <span className="text-green-600 text-xs">Tersalin!</span>}
              </div>
            </header>

            {post.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none text-text-muted">
              <Text className="whitespace-pre-line leading-relaxed">{post.content}</Text>
            </div>

            {post.images && post.images.length > 0 && (
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
                {post.images.map((img) => (
                  <div key={img.id} className="rounded-lg overflow-hidden group">
                    <img
                      src={img.imageUrl}
                      alt={img.caption || post.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    {img.caption && (
                      <Muted className="block text-xs p-2">{img.caption}</Muted>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        </Container>
      </Section>

      <Section className="py-16 bg-surface">
        <Container>
          <div className="text-center">
            <Typography variant="h3" className="mb-4">
              Nikmati Konten Lainnya?
            </Typography>
            <Button asChild>
              <Link to="/berita-galeri">Lihat Semua Berita</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}