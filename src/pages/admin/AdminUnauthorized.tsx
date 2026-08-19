import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { ShieldOff } from 'lucide-react'

export default function AdminUnauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-4">
      <Card variant="elevated" className="p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error-container text-on-error-container mx-auto mb-4">
          <ShieldOff className="w-6 h-6" />
        </div>
        <Typography variant="h4" className="mb-2">Akses Ditolak</Typography>
        <p className="text-on-surface-variant text-sm mb-6">
          Akun Anda tidak memiliki izin untuk mengakses halaman admin.
        </p>
        <div className="flex flex-col gap-2">
          <Link to="/">
            <Button variant="filled" className="w-full">Kembali ke Beranda</Button>
          </Link>
          <Link to="/admin/login">
            <Button variant="text" className="w-full">Login dengan akun lain</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}