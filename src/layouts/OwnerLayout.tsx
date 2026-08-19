import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Store, Package, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

const ownerNavItems = [
  { label: 'Dashboard', href: '/owner/dashboard', icon: LayoutDashboard },
  { label: 'UMKM Saya', href: '/owner/umkm', icon: Store },
  { label: 'Produk', href: '/owner/produk', icon: Package },
]

export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/owner/login')
  }

  const drawerContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-16 border-b border-outline-variant">
        <span className="font-heading font-semibold text-base text-on-surface truncate">
          UMKM Dashboard
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

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto" aria-label="Owner navigation">
        {ownerNavItems.map((item) => {
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
        aria-label="Owner navigation drawer"
      >
        {drawerContent}
      </aside>

      <aside
        className="hidden md:flex md:flex-col md:w-72 md:fixed md:top-0 md:left-0 md:h-screen bg-surface-container-low border-r border-outline-variant"
        aria-label="Owner navigation"
      >
        {drawerContent}
      </aside>

      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
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
              Dashboard UMKM
            </h1>
          </div>
          <span className="hidden sm:inline text-sm text-on-surface-variant">
            {user?.name}
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}