import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLogin } from '@/services/admin'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import type { User } from '@/types/catalog'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()
  const mutation = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await mutation.mutateAsync({ email, password })
      const user: User = { id: res.user.id, name: res.user.name, email: res.user.email, role: res.user.role as 'admin' | 'umkm_owner' }
      login(res.token, user)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="font-heading font-bold text-xl text-on-surface">Desa Kuanyar</span>
          </div>
          <Typography variant="h4">Masuk ke Dashboard</Typography>
          <p className="text-on-surface-variant mt-2 text-sm">
            Masuk untuk mengelola konten dan UMKM desa
          </p>
        </div>

        <Card variant="elevated" className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                <Input
                  type="email"
                  placeholder="admin@kuanyar.desa.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Memproses...' : 'Masuk'}
            </Button>

            <p className="text-center text-sm text-on-surface-variant mt-4">
              Akun demo: admin@kuanyar.desa.id / admin123
            </p>
          </form>
        </Card>

        <div className="text-center mt-6 text-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
