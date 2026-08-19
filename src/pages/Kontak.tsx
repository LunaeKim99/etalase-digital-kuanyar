import { useState } from 'react'
import { useVillageProfile } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Kontak() {
  const { data: profile } = useVillageProfile()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contactItems = [
    { icon: MapPin, label: 'Alamat', value: 'Desa Kuanyar, Kec. Mayong, Kab. Jepara, Jawa Tengah' },
    { icon: Phone, label: 'Telepon', value: '+62 812-3456-7890' },
    { icon: Mail, label: 'Email', value: profile?.contactInfo || 'info@kuanyar.desa.id' },
    { icon: Clock, label: 'Jam Kerja', value: 'Senin - Sabtu, 08.00 - 16.00 WIB' },
  ]

  return (
    <>
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 bg-hero-gradient text-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="max-w-3xl">
            <Typography variant="h1" className="mb-4 text-white">
              Hubungi Kami
            </Typography>
            <p className="text-lg text-white/85">
              Hubungi pemerintah desa atau sampaikan pertanyaan Anda tentang UMKM dan layanan desa
            </p>
          </div>
        </Container>
      </section>

      <Section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Typography variant="h3" className="mb-6">Informasi Kontak</Typography>
              <div className="space-y-4">
                {contactItems.map((item, i) => (
                  <Card key={i} variant="filled" className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-container text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <Typography variant="h6" className="mb-1">{item.label}</Typography>
                      <Text className="text-on-surface-variant text-sm">{item.value}</Text>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-6">Kirim Pesan</Typography>
              <Card variant="filled" className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary-container text-primary flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <Typography variant="h4" className="mb-2">Pesan Terkirim</Typography>
                    <Muted>Terima kasih! Pesan Anda telah kami terima.</Muted>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-on-surface-variant">Nama</label>
                      <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Nama lengkap Anda"
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-on-surface-variant">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="email@contoh.com"
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-on-surface-variant">Pesan</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Tulis pesan Anda di sini..."
                        className="w-full px-3 py-2 border border-border rounded-lg resize-y"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" /> Kirim Pesan
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}