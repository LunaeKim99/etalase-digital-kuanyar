import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Package,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'UMKM', href: '/admin/umkm', icon: Store, roles: ['admin'] },
  { label: 'Produk', href: '/admin/produk', icon: Package, roles: ['admin'] },
  { label: 'Berita & Galeri', href: '/admin/berita-galeri', icon: FileText, roles: ['admin'] },
  { label: 'Profil Desa', href: '/admin/profil', icon: Settings, roles: ['admin'] },
]

const ownerNavItems = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: LayoutDashboard, roles: ['umkm_owner', 'admin'] },
  { label: 'UMKM Saya', href: '/owner/umkm', icon: Store, roles: ['umkm_owner', 'admin'] },
  { label: 'Produk', href: '/owner/produk', icon: Package, roles: ['umkm_owner', 'admin'] },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !token) {
      navigate('/admin/login')
    }
  }, [user, token, navigate])

  if (!user || !token) return null

  const isAdmin = user.role === 'admin'
  const navItems = isAdmin ? adminNavItems : ownerNavItems

  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-background border-r border-border transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-heading font-bold text-xl text-primary">
            {isAdmin ? 'Desa Kuanyar - Admin' : 'UMKM Dashboard'}
          </span>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mx-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-primary hover:bg-surface'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 mx-2 mt-8 rounded-lg text-sm font-medium text-text-muted hover:text-primary hover:bg-surface transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </nav>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading font-bold text-xl text-primary">
            {isAdmin ? 'Dashboard Admin' : 'Dashboard UMKM'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">
              {user.name} ({user.role === 'admin' ? 'Administrator' : 'Pemilik UMKM'})
            </span>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}