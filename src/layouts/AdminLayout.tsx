import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Package,
  MapPin,
  Music,
  Calendar,
  Image,
  FileText,
  Menu,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'UMKM', href: '/admin/umkm', icon: Store },
  { label: 'Produk', href: '/admin/produk', icon: Package },
  { label: 'Wisata', href: '/admin/wisata', icon: MapPin },
  { label: 'Budaya', href: '/admin/budaya', icon: Music },
  { label: 'Event', href: '/admin/event', icon: Calendar },
  { label: 'Galeri', href: '/admin/galeri', icon: Image },
  { label: 'Artikel', href: '/admin/artikel', icon: FileText },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-background border-r border-border transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-heading font-bold text-xl text-primary">Desa Kuanyar - Admin</span>
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
            <X className="w-5 h-5" />
            Keluar
          </button>
        </nav>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading font-bold text-xl text-primary">Dashboard Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">
              {user.name} ({user.role})
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
