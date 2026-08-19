import { useState, useEffect, memo, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Users, Image, Sparkles, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'

function useDarkMode() {
  return useSyncExternalStore(
    (callback) => {
      const observer = new MutationObserver(callback)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      return () => observer.disconnect()
    },
    () => document.documentElement.classList.contains('dark'),
    () => false
  )
}

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
  const isDark = useDarkMode()
  const location = useLocation()

  const isFloating = isScrolled
  const floatingLight = isFloating && !isDark

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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isFloating
            ? floatingLight
              ? 'bg-gradient-to-b from-white/70 via-white/40 to-transparent backdrop-blur-sm'
              : 'bg-gradient-to-b from-scrim/30 via-scrim/15 to-transparent backdrop-blur-sm'
            : 'bg-surface shadow-sm border-b border-outline-variant'
        )}
      >
        <nav className="container" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className={cn(
              "flex items-center gap-2 font-heading font-semibold text-lg",
              isFloating ? (floatingLight ? 'text-on-surface' : 'text-white') : 'text-on-surface'
            )} aria-label="Desa Kuanyar - Home">
              <span className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                isFloating
                  ? floatingLight
                    ? 'bg-primary/15 text-primary'
                    : 'bg-white/20 text-white'
                  : 'text-primary'
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
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
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? floatingLight
                        ? 'bg-primary-container text-on-primary-container'
                        : isFloating
                          ? 'bg-white/15 text-white'
                          : 'bg-primary-container text-on-primary-container'
                      : isFloating
                        ? floatingLight
                          ? 'text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                        : 'text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={cn(
              "flex items-center gap-2",
              isFloating && !floatingLight && "[&_button]:text-white [&_button]:hover:bg-white/10"
            )}>
              <DarkModeToggle />
              <button
                className={cn(
                  "md:hidden p-2 rounded-full transition-colors",
                  isFloating
                    ? floatingLight
                      ? 'text-on-surface hover:bg-on-surface/5'
                      : 'text-white hover:bg-white/10'
                    : 'text-on-surface hover:bg-on-surface/5'
                )}
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

      <div
        id="mobile-menu"
        className={cn(
          'md:hidden fixed top-16 left-0 right-0 z-40 border-b border-outline-variant overflow-hidden transition-all duration-300 ease-in-out',
          isFloating
            ? floatingLight
              ? 'bg-white/70 backdrop-blur-md'
              : 'bg-gradient-to-b from-scrim/40 to-transparent backdrop-blur-md'
            : 'bg-surface',
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
                    : isFloating
                      ? floatingLight
                        ? 'text-on-surface hover:bg-on-surface/5'
                        : 'text-white hover:bg-white/10'
                      : 'text-on-surface hover:bg-on-surface/5'
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
