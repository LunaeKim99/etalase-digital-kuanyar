import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Profil', href: '/profil' },
  { label: 'Potensi', href: '/potensi', hasDropdown: true },
  { label: 'UMKM', href: '/umkm' },
  { label: 'Produk', href: '/produk' },
  { label: 'Wisata', href: '/wisata' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
]

const potensiSubItems = [
  { label: 'UMKM', href: '/potensi/umkm' },
  { label: 'Pertanian', href: '/potensi/pertanian' },
  { label: 'Perkebunan', href: '/potensi/perkebunan' },
  { label: 'Peternakan', href: '/potensi/peternakan' },
  { label: 'Perikanan', href: '/potensi/perikanan' },
  { label: 'Kerajinan', href: '/potensi/kerajinan' },
  { label: 'Wisata', href: '/potensi/wisata' },
  { label: 'Budaya', href: '/potensi/budaya' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPotensiOpen, setIsPotensiOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsPotensiOpen(false)
  }, [location.pathname])

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/')

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 text-text font-heading font-bold text-xl" aria-label="Etalase Digital Desa Kuanyar - Home">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="hidden sm:block">Desa Kuanyar</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={isActive}
                onToggle={() => setIsPotensiOpen(!isPotensiOpen)}
                isOpen={isPotensiOpen}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/login">Admin</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/kontak">Hubungi Kami</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-text hover:bg-surface transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border bg-background',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-1">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                isActive={isActive}
                isPotensiOpen={isPotensiOpen}
                onPotensiToggle={() => setIsPotensiOpen(!isPotensiOpen)}
              />
            ))}
            <hr className="border-border my-2" />
            <div className="px-4 pt-2 space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/login">Masuk Admin</Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link to="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>

        {isPotensiOpen && !isMobileMenuOpen && (
          <div
            className="absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg md:hidden"
            role="menu"
          >
            <div className="container py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {potensiSubItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  to={subItem.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(subItem.href)
                      ? 'bg-primary text-white'
                      : 'text-text hover:bg-surface hover:text-primary'
                  )}
                  role="menuitem"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavItem({ item, isActive, onToggle, isOpen }: {
  item: typeof navItems[0]
  isActive: (href: string) => boolean
  onToggle: () => void
  isOpen: boolean
}) {
  if (item.hasDropdown) {
    return (
      <div className="relative group">
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'text-primary bg-primary-light'
              : 'text-text hover:text-primary hover:bg-surface'
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {item.label}
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </button>
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50 animate-slide-down">
            {potensiSubItems.map((subItem) => (
              <Link
                key={subItem.href}
                to={subItem.href}
                className={cn(
                  'block px-4 py-2 text-sm transition-colors',
                  isActive(subItem.href)
                    ? 'bg-primary text-white'
                    : 'text-text hover:bg-surface hover:text-primary'
                )}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      to={item.href}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive(item.href)
          ? 'text-primary bg-primary-light'
          : 'text-text hover:text-primary hover:bg-surface'
      )}
    >
      {item.label}
    </Link>
  )
}

function MobileNavItem({ item, isActive, isPotensiOpen, onPotensiToggle }: {
  item: typeof navItems[0]
  isActive: (href: string) => boolean
  isPotensiOpen: boolean
  onPotensiToggle: () => void
}) {
  if (item.hasDropdown) {
    return (
      <div>
        <button
          onClick={onPotensiToggle}
          className={cn(
            'w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors',
            isActive(item.href)
              ? 'text-primary bg-primary-light'
              : 'text-text'
          )}
          aria-expanded={isPotensiOpen}
        >
          {item.label}
          <ChevronDown className={cn('w-5 h-5 transition-transform', isPotensiOpen && 'rotate-180')} />
        </button>
        {isPotensiOpen && (
          <div className="pl-4 mt-2 space-y-1 border-l-2 border-primary-light">
            {potensiSubItems.map((subItem) => (
              <Link
                key={subItem.href}
                to={subItem.href}
                className={cn(
                  'block px-3 py-2 text-sm font-medium transition-colors',
                  isActive(subItem.href)
                    ? 'text-primary font-semibold'
                    : 'text-text-muted hover:text-text'
                )}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      to={item.href}
      className={cn(
        'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
        isActive(item.href)
          ? 'text-primary bg-primary-light'
          : 'text-text hover:bg-surface'
      )}
    >
      {item.label}
    </Link>
  )
}