import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { PotensiContact } from '@/types/catalog'

export interface PertanianFormData {
  name: string
  description: string
  owner: string
  rtRw: string
  dusun: string
  yearFounded: number | null
  capacity: string
  contactWhatsapp: string
  contactInstagram: string
  contactTiktok: string
  contactMarketplace: string
}

export const emptyPertanianForm: PertanianFormData = {
  name: '',
  description: '',
  owner: '',
  rtRw: '',
  dusun: '',
  yearFounded: null,
  capacity: '',
  contactWhatsapp: '',
  contactInstagram: '',
  contactTiktok: '',
  contactMarketplace: '',
}

export function buildContactPayload(form: PertanianFormData): PotensiContact | null {
  if (!form.contactWhatsapp && !form.contactInstagram && !form.contactTiktok && !form.contactMarketplace) {
    return null
  }
  return {
    whatsapp: form.contactWhatsapp || undefined,
    instagram: form.contactInstagram || undefined,
    tiktok: form.contactTiktok || undefined,
    marketplace: form.contactMarketplace || undefined,
  }
}

interface PertanianFormFieldsProps {
  formData: PertanianFormData
  setFormData: React.Dispatch<React.SetStateAction<PertanianFormData>>
}

export function PertanianFormFields({ formData, setFormData }: PertanianFormFieldsProps) {
  return (
    <>
      <div>
        <label className="label">Nama *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="label">Deskripsi</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Pemilik / Pengelola</label>
          <Input
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
          />
        </div>
        <div>
          <label className="label">RT/RW</label>
          <Input
            value={formData.rtRw}
            onChange={(e) => setFormData({ ...formData, rtRw: e.target.value })}
            placeholder="RT 01/RW 01"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Dusun</label>
          <Input
            value={formData.dusun}
            onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Tahun Berdiri</label>
          <Input
            type="number"
            value={formData.yearFounded ?? ''}
            onChange={(e) =>
              setFormData({ ...formData, yearFounded: e.target.value ? parseInt(e.target.value) : null })
            }
          />
        </div>
      </div>

      <div>
        <label className="label">Kapasitas Produksi</label>
        <Input
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          placeholder="cth: 1000 pcs/bulan"
        />
      </div>

      <div className="border-t border-outline-variant pt-4">
        <p className="mb-3 font-semibold">Kontak (opsional)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">WhatsApp</label>
            <Input
              value={formData.contactWhatsapp}
              onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
              placeholder="628xxxxxxxxxx"
            />
          </div>
          <div>
            <label className="label">Instagram</label>
            <Input
              value={formData.contactInstagram}
              onChange={(e) => setFormData({ ...formData, contactInstagram: e.target.value })}
              placeholder="username"
            />
          </div>
          <div>
            <label className="label">TikTok</label>
            <Input
              value={formData.contactTiktok}
              onChange={(e) => setFormData({ ...formData, contactTiktok: e.target.value })}
              placeholder="username"
            />
          </div>
          <div>
            <label className="label">Marketplace</label>
            <Input
              value={formData.contactMarketplace}
              onChange={(e) => setFormData({ ...formData, contactMarketplace: e.target.value })}
            />
          </div>
        </div>
      </div>
    </>
  )
}
