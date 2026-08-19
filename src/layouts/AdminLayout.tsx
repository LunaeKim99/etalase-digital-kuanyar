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

  const drawerContent = (
    <div className="flex flex-col h-full">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-outline-variant">
        <span className="font-heading font-semibold text-base text-on-surface truncate">
          {isAdmin ? 'Desa Kuanyar' : 'UMKM Dashboard'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup drawer"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout at bottom */}
      <div className="p-2 border-t border-outline-variant">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-surface-container-lowest">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-surface-container-low z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Admin navigation drawer"
      >
        {drawerContent}
      </aside>

      {/* Desktop permanent drawer */}
      <aside
        className="hidden md:flex md:flex-col md:w-72 md:fixed md:top-0 md:left-0 md:h-screen bg-surface-container-low border-r border-outline-variant"
        aria-label="Admin navigation"
      >
        {drawerContent}
      </aside>

      {/* Main content area */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 h-16 bg-surface border-b border-outline-variant px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-heading font-semibold text-base md:text-lg text-on-surface truncate">
              {isAdmin ? 'Dashboard Admin' : 'Dashboard UMKM'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-on-surface-variant">
              {user.name} ({user.role === 'admin' ? 'Administrator' : 'Pemilik UMKM'})
            </span>
            <span className="sm:hidden text-sm text-on-surface-variant truncate max-w-[120px]">
              {user.name}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
