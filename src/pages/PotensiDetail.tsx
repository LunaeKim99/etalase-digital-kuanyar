import { Navigate, useParams, Link } from 'react-router-dom'
import { getItemById } from '@/data/potensiData'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PotensiDetail() {
  const { id } = useParams<{ id: string }>()
  const item = id ? getItemById(id) : undefined

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
