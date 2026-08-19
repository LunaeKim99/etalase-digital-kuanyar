import { useState } from 'react'
import { useVillageProfile } from '@/services/api'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Typography, Text, Muted } from '@/components/ui/typography'
import { PageHero } from '@/components/sections/PageHero'
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
      <PageHero
        title="Hubungi Kami"
        subtitle="Hubungi pemerintah desa atau sampaikan pertanyaan Anda tentang UMKM dan layanan desa"
      />

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
              <Card variant="filled" className="p-5 sm:p-8">
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
                      <label htmlFor="contact-name" className="label">Nama</label>
                      <Input
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Nama lengkap Anda"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="label">Email</label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="email@contoh.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="label">Pesan</label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Tulis pesan Anda di sini..."
                        className="input resize-y"
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