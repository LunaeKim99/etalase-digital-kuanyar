import { useState, useEffect, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Users, Image, Sparkles, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'

const navItems = [
  { label: 'Beranda', href: '/', icon: Home },
  { label: 'Profil Desa', href: '/profil', icon: Users },
  { label: 'Berita & Galeri', href: '/berita-galeri', icon: Image },
  { label: 'Potensi Desa', href: '/potensi', icon: Sparkles },
  { label: 'Kontak', href: '/kontak', icon: Phone },
]

export const Navbar = memo(function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/')

  return (
    <>
      {/* Top App Bar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-shadow duration-300',
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-outline-variant'
            : 'bg-surface'
        )}
      >
        <nav className="container" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-on-surface font-heading font-semibold text-lg" aria-label="Desa Kuanyar - Home">
              <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="hidden sm:block">Desa Kuanyar</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onMouseEnter={() => prefetchRoute(item.href)}
                  onFocus={() => prefetchRoute(item.href)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-on-surface/8 hover:text-on-surface'
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side: theme toggle + mobile menu */}
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              <button
                className="md:hidden p-2 rounded-full text-on-surface hover:bg-on-surface/8 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu (slide-down drawer) */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden fixed top-16 left-0 right-0 z-40 bg-surface border-b border-outline-variant overflow-hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <nav className="container py-2" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                onMouseEnter={() => prefetchRoute(item.href)}
                onFocus={() => prefetchRoute(item.href)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface hover:bg-on-surface/8'
                )}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
})
