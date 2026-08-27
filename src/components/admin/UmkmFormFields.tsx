import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export interface UmkmFormData {
  ownerId: number
  name: string
  description: string
  address: string
  whatsapp: string
  logo: string
  status: 'pending' | 'approved' | 'rejected'
}

export const emptyUmkmForm: UmkmFormData = {
  ownerId: 2,
  name: '',
  description: '',
  address: '',
  whatsapp: '',
  logo: '',
  status: 'pending',
}

interface UmkmFormFieldsProps {
  formData: UmkmFormData
  setFormData: React.Dispatch<React.SetStateAction<UmkmFormData>>
}

export function UmkmFormFields({ formData, setFormData }: UmkmFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Pemilik ID *</label>
          <Input
            type="number"
            value={formData.ownerId}
            onChange={(e) => setFormData({ ...formData, ownerId: parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <label className="label">Status</label>
          <Select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as UmkmFormData['status'] })}
          >
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </Select>
        </div>
      </div>
      <div>
        <label className="label">Nama UMKM *</label>
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
          <label className="label">Alamat</label>
          <Input
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div>
          <label className="label">WhatsApp</label>
          <Input
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="628xxxxxxxxxx"
          />
        </div>
      </div>
      <div>
        <label className="label">Logo URL</label>
        <Input
          value={formData.logo}
          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          placeholder="https://..."
        />
      </div>
    </>
  )
}
