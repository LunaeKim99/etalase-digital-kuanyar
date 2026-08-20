<<<<<<< HEAD
import { Navigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItemById, type PotensiItem } from '@/data/potensiData'
=======
import { useParams, Link } from 'react-router-dom'
import { usePotensiItem } from '@/services/api'
>>>>>>> feat/admin-functionality
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { ArrowLeft, Search } from 'lucide-react'

export default function PotensiDetail() {
  const { id } = useParams<{ id: string }>()
<<<<<<< HEAD
  const numId = id ? Number(id) : NaN
  const [item, setItem] = useState<PotensiItem | undefined>(undefined)
  const [loading, setLoading] = useState(!Number.isNaN(numId))

  useEffect(() => {
    if (Number.isNaN(numId)) {
      setLoading(false)
      return
    }
    let cancelled = false
    getItemById(numId)
      .then((result) => {
        if (!cancelled) {
          setItem(result)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [numId])

  if (loading) return null
=======
  const itemId = id ? parseInt(id, 10) : NaN
>>>>>>> feat/admin-functionality

  const { data: item, isLoading, error, refetch } = usePotensiItem(itemId)

  if (isLoading) {
    return (
      <Section className="pt-24 pb-16">
        <Container>
          <LoadingSkeleton count={1} variant="card" />
        </Container>
      </Section>
    )
  }

  if (error || !item) {
    return (
      <Section className="pt-24 pb-16">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <Card variant="filled" className="p-8 text-center">
              <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
              <Typography variant="h3" className="mb-2">Potensi Tidak Ditemukan</Typography>
              <Muted className="mb-6">
                Item potensi yang Anda cari tidak tersedia.
              </Muted>
              <Button variant="outline" onClick={() => refetch()} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Coba Lagi
              </Button>
              <Button variant="outline" asChild className="mt-2 gap-2">
                <Link to="/potensi">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Potensi Desa
                </Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>
    )
  }

  // Redirect to main potensi page with modal open (handled by Potensi page)
  return (
    <Section className="pt-24 pb-16">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <Card variant="filled" className="p-8 text-center">
            <Typography variant="h3" className="mb-2">Detail Potensi</Typography>
            <Muted className="mb-6">
              Silakan buka halaman Potensi Desa untuk melihat detail lengkap.
            </Muted>
            <Button variant="outline" asChild>
              <Link to="/potensi">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Potensi Desa
              </Link>
            </Button>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
