import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Typography, Text } from '@/components/ui/typography'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-9xl font-bold text-primary/20 leading-none mb-4">404</div>
          <Typography variant="h1" className="mb-4">
            Halaman Tidak Ditemukan
          </Typography>
          <Text className="text-text-muted mb-8 text-lg">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </Text>
          <Button asChild size="lg">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" /> Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}