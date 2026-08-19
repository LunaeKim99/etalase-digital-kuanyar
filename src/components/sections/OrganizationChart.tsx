import { Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Muted, Typography } from '@/components/ui/typography'

export interface OrgPerson {
  name: string
  position: string
  phone?: string
}

interface OrganizationChartProps {
  head: OrgPerson
  staff: OrgPerson[]
}

export default function OrganizationChart({ head, staff }: OrganizationChartProps) {
  return (
    <div>
      <Card variant="filled" className="p-6 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-3">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <Typography variant="h5" className="mb-1">
          {head.name}
        </Typography>
        <Muted className="mb-2">{head.position}</Muted>
        <span className="badge">Kepala Desa</span>
      </Card>
      <div className="h-8 w-0.5 mx-auto bg-outline-variant my-4" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((person) => (
          <Card variant="filled" key={person.name} className="p-4 text-center animate-fade-in">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <Typography variant="h6" className="mb-1">
              {person.name}
            </Typography>
            <Muted className="mb-1">{person.position}</Muted>
            {person.phone && <Muted>{person.phone}</Muted>}
          </Card>
        ))}
      </div>
    </div>
  )
}
