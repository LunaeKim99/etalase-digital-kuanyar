import { Navigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getItemById, type PotensiItem } from '@/data/potensiData'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PotensiDetail() {
  const { id } = useParams<{ id: string }>()
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

  if (item) {
    return <Navigate to="/potensi" replace />
  }

  return (
    <Section className="pt-24 pb-16">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <Card variant="filled" className="p-8 text-center">
            <Typography variant="h3" className="mb-2">Potensi Tidak Ditemukan</Typography>
            <Muted className="mb-6">
              Item potensi yang Anda cari tidak tersedia dalam data observasi.
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
