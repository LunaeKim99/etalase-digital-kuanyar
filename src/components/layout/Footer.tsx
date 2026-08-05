import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const navLinks = [
  { label: 'Profil', href: '/profil' },
  { label: 'UMKM', href: '/umkm' },
  { label: 'Produk', href: '/produk' },
  { label: 'Wisata', href: '/wisata' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
]

const potensiLinks = [
  { label: 'UMKM', href: '/potensi/umkm' },
  { label: 'Pertanian', href: '/potensi/pertanian' },
  { label: 'Perkebunan', href: '/potensi/perkebunan' },
  { label: 'Peternakan', href: '/potensi/peternakan' },
  { label: 'Kerajinan', href: '/potensi/kerajinan' },
  { label: 'Wisata', href: '/potensi/wisata' },
]

const contactInfo = [
  { icon: MapPin, text: 'Desa Kuanyar, Kec. Mayong, Kab. Jepara, Jawa Tengah' },
  { icon: Phone, text: '+62 812-3456-7890' },
  { icon: Mail, text: 'info@kuanyar.desa.id' },
  { icon: Clock, text: 'Senin - Sabtu, 08.00 - 16.00 WIB' },
]

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2v8a1 1 0 001 1h2m-5-9l2-2v8a1 1 0 001 1h2m-5-9l2-2v8a1 1 0 001 1h2m-5-9l2-2v8a1 1 0 001 1h2"
                />
              </svg>
              <span className="font-bold text-lg text-text">Desa Kuanyar</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Etalase digital desa untuk memajukan potensi lokal, UMKM, produk, dan wisata
              desa ke seluruh Indonesia.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text mb-4">Menu</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-text mb-4">Potensi</h3>
            <ul className="space-y-2">
              {potensiLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-text mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-text-muted">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-text-muted text-sm">
            © {new Date().getFullYear()} Desa Kuanyar. Hak cipta dilindungi.
          </span>
          <span className="text-text-muted text-sm">
            Dibangun dengan cinta untuk warga Kuanyar
          </span>
        </div>
      </div>
    </footer>
  )
}
