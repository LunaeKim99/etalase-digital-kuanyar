import { useState } from 'react'
import { Tabs } from '@/components/ui/tabs'
import { Input, Label } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Typography, Muted } from '@/components/ui/typography'
import { useAuth } from '@/contexts/AuthContext'
import { Settings, Palette, Shield, Mail, MessageSquare, Link2, User, Lock } from 'lucide-react'

const tabs = [
  { id: 'umum', label: 'Umum', icon: <Settings className="w-4 h-4" /> },
  { id: 'tampilan', label: 'Tampilan', icon: <Palette className="w-4 h-4" /> },
  { id: 'keamanan', label: 'Keamanan', icon: <Shield className="w-4 h-4" /> },
]

export default function AdminSettings() {
  const { user } = useAuth()

  // Umum form state
  const [websiteName, setWebsiteName] = useState('Etalase Digital Kuanyar')
  const [contactEmail, setContactEmail] = useState('admin@kuanyar.desa.id')
  const [whatsapp, setWhatsApp] = useState('+62 812-3456-7890')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')

  // Tampilan form state
  const [themeMode, setThemeMode] = useState<'terang' | 'gelap' | 'sistem'>('sistem')

  const handleSaveUmum = () => {
    // Placeholder for save action - no actual persistence
    console.log('Simpan pengaturan umum:', { websiteName, contactEmail, whatsapp, facebook, instagram })
    // In real implementation, this would call an API
  }

  const handleThemeChange = (value: string) => {
    setThemeMode(value as 'terang' | 'gelap' | 'sistem')
    // In real implementation, this would apply theme to document.documentElement
    console.log('Mode tema diubah:', value)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <Typography variant="h4">Pengaturan</Typography>
        <Muted className="mt-1">Kelola pengaturan website, tampilan, dan keamanan akun</Muted>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="umum">
        {(activeTab) => (
          <>
            {/* UMUM TAB */}
            {activeTab === 'umum' && (
              <Card variant="outlined">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Pengaturan Umum
                  </CardTitle>
                  <CardDescription>Informasi dasar website dan kontak</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="website-name">Nama Website</Label>
                      <Input
                        id="website-name"
                        value={websiteName}
                        onChange={(e) => setWebsiteName(e.target.value)}
                        placeholder="Nama website"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email Kontak</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Email kontak"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <Input
                        id="whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsApp(e.target.value)}
                        placeholder="+62 812-3456-7890"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <Input
                          id="facebook"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          placeholder="https://facebook.com/..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <Input
                          id="instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="https://instagram.com/..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-outline-variant">
                    <Button onClick={handleSaveUmum}>
                      <Lock className="mr-2 w-4 h-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* TAMPILAN TAB */}
            {activeTab === 'tampilan' && (
              <Card variant="outlined">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Pengaturan Tampilan
                  </CardTitle>
                  <CardDescription>Kontrol tema dan tampilan website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme-mode">Mode Tema</Label>
                    <Select
                      id="theme-mode"
                      value={themeMode}
                      onChange={(e) => handleThemeChange(e.target.value)}
                    >
                      <option value="terang">Terang</option>
                      <option value="gelap">Gelap</option>
                      <option value="sistem">Sistem (Ikuti preferensi OS)</option>
                    </Select>
                  </div>

                  <Muted>
                    Perubahan tema akan diterapkan ke seluruh website. Pilih "Sistem" untuk mengikuti
                    preferensi mode gelap/terang sistem operasi pengguna.
                  </Muted>
                </CardContent>
              </Card>
            )}

            {/* KEAMANAN TAB */}
            {activeTab === 'keamanan' && (
              <Card variant="outlined">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Keamanan Akun
                  </CardTitle>
                  <CardDescription>Informasi akun dan pengaturan keamanan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 px-4 bg-surface-container-high rounded-xl">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-on-surface-variant" />
                        <div>
                          <Muted>Email</Muted>
                          <Typography variant="large" className="mt-0.5">{user?.email ?? '-'}</Typography>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-3 px-4 bg-surface-container-high rounded-xl">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-on-surface-variant" />
                        <div>
                          <Muted>Peran</Muted>
                          <Typography variant="large" className="mt-0.5 capitalize">
                            {user?.role === 'admin' ? 'Administrator' : 'Pemilik UMKM'}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant">
                    <Button variant="outlined">
                      <Lock className="mr-2 w-4 h-4" />
                      Ubah Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Tabs>
    </div>
  )
}