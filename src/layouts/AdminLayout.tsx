import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Package,
  FileText,
  Building2,
  Layout,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'
import { useAuth } from '@/contexts/AuthContext'

const navSections = [
  {
    label: 'ETALASE',
    items: [
      { to: '/admin/umkm', label: 'UMKM', icon: Store },
      { to: '/admin/produk', label: 'Produk', icon: Package },
    ],
  },
  {
    label: 'KONTEN',
    items: [
      { to: '/admin/berita-galeri', label: 'Berita & Galeri', icon: FileText },
    ],
  },
  {
    label: 'DESA',
    items: [
      { to: '/admin/profil', label: 'Profil Desa', icon: Building2 },
      { to: '/admin/tampilan', label: 'Tampilan Website', icon: Layout },
    ],
  },
  {
    label: 'SISTEM',
    items: [
      { to: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
    ],
  },
]

const pageTitleMap: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/umkm': 'UMKM',
  '/admin/produk': 'Produk',
  '/admin/berita-galeri': 'Berita & Galeri',
  '/admin/profil': 'Profil Desa',
  '/admin/tampilan': 'Tampilan Website',
  '/admin/pengaturan': 'Pengaturan',
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-16 border-b border-outline-variant">
        <span className="font-heading font-semibold text-base text-on-surface truncate">
          Desa Kuanyar
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

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        <NavLink
          to="/admin/dashboard"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            cn(
              'mb-2 flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            )
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </NavLink>

        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-outline-variant">
        <button
          onClick={handleLogout}
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-surface-container-low z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Admin navigation drawer"
      >
        {sidebarContent}
      </aside>

      <aside
        className="hidden md:flex md:flex-col md:w-72 md:fixed md:top-0 md:left-0 md:h-screen bg-surface-container-low border-r border-outline-variant"
        aria-label="Admin navigation"
      >
        {sidebarContent}
      </aside>

      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-outline-variant bg-surface px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-high md:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <h1 className="flex-1 truncate text-lg font-semibold text-on-surface">
            {pageTitleMap[location.pathname] || 'Dashboard'}
          </h1>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Button variant="ghost" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Lihat Website</span>
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
