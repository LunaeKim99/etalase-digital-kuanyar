import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Muted } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { useLogin } from '@/services/admin'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const { token, login: setAuth } = useAuth()
  const navigate = useNavigate()

  if (token) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login.mutateAsync({ username, password })
      if (login.data) {
        setAuth(login.data.token, login.data.data as { id: number; username: string; name: string; role: string })
        navigate('/admin/dashboard')
      }
    } catch { /* error handled by react-query */ }
  }

  return (
    <Section className="pt-28">
      <Container size="sm">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h2">Masuk Admin</Typography>
            <Muted className="mt-2">Masuk dengan akun administrator desa.</Muted>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>
            {login.isError && (
              <Muted className="text-error text-sm">Username atau password salah.</Muted>
            )}
            <Button type="submit" variant="primary" className="w-full" loading={login.isPending}>
              Masuk
            </Button>
          </form>
          <p className="text-center text-text-muted text-sm mt-6">
            <Link to="/" className="link">Kembali ke Beranda</Link>
          </p>
        </div>
      </Container>
    </Section>
  )
}