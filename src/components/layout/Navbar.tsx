import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'
import { Button } from '@/components/ui/button'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'

const navItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil' },
  { label: 'Berita & Galeri', href: '/berita-galeri' },
  { label: 'UMKM', href: '/umkm' },
  { label: 'Kontak', href: '/kontak' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
          <Link to="/" className="flex items-center gap-2 text-text font-heading font-bold text-xl" aria-label="Desa Kuanyar - Home">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="hidden sm:block">Desa Kuanyar</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onMouseEnter={() => prefetchRoute(item.href)}
                onFocus={() => prefetchRoute(item.href)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary bg-primary-light'
                    : 'text-text hover:text-primary hover:bg-surface'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <DarkModeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/login">Admin</Link>
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
              <Link
                key={item.href}
                to={item.href}
                onMouseEnter={() => prefetchRoute(item.href)}
                onFocus={() => prefetchRoute(item.href)}
                className={cn(
                  'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary bg-primary-light'
                    : 'text-text hover:bg-surface'
                )}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-border my-2" />
            <div className="px-4 pt-2 space-y-2">
              <DarkModeToggle />
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/admin/login">Masuk Admin</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
