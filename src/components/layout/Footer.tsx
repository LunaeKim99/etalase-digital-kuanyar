import { memo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Desa', href: '/profil' },
  { label: 'Berita & Galeri', href: '/berita-galeri' },
  { label: 'Potensi Desa', href: '/potensi' },
  { label: 'Kontak', href: '/kontak' },
]

const contactInfo = [
  { icon: MapPin, text: 'Desa Kuanyar, Kec. Mayong, Kab. Jepara, Jawa Tengah' },
  { icon: Phone, text: '+62 812-3456-7890' },
  { icon: Mail, text: 'info@kuanyar.desa.id' },
  { icon: Clock, text: 'Senin - Sabtu, 08.00 - 16.00 WIB' },
]

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <span className="font-bold text-lg text-on-surface">Ruang Digital Potensi dan Karya Desa Kuanyar</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Ruang digital untuk memajukan potensi, karya, produk, dan wisata
              desa ke seluruh Indonesia.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-4">Menu</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-on-surface-variant hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-4">Potensi Desa</h3>
            <p className="text-on-surface-variant text-sm">
              Dukung potensi lokal Desa Kuanyar — konveksi, UMKM makanan, dan pertanian.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-on-surface-variant">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-outline-variant py-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} Desa Kuanyar. Hak cipta dilindungi.
          </span>
          <span className="text-on-surface-variant text-sm">
            Dibangun dengan cinta untuk warga Kuanyar
          </span>
        </div>
      </div>
    </footer>
  )
})
