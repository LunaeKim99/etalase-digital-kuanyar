import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

function NotFound() {
  return (
    <section className="py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="text-6xl md:text-8xl font-bold text-primary">404</p>
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-text">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mt-3 max-w-md text-text-muted">
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <Button asChild variant="primary" className="mt-8">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default NotFound
