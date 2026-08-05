import { ChevronRight, Landmark } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography, Text, Muted } from '@/components/ui/typography'
import StatCard from '@/components/cards/StatCard'
import ProfileTimeline from '@/components/sections/ProfileTimeline'
import OrganizationChart from '@/components/sections/OrganizationChart'
import MapPlaceholder from '@/components/sections/MapPlaceholder'
import {
  profilHero,
  history,
  visionMission,
  geography,
  demographyStats,
  organization,
  mapData,
  timeline,
} from '@/data/profilData'

function Profil() {
  return (
    <>
      <Section variant="primary" className="pt-16 md:pt-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <Typography variant="h1" className="text-white mb-4">
              {profilHero.title}
            </Typography>
            <Muted className="text-white/80 text-lg">{profilHero.subtitle}</Muted>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Typography variant="h2" className="mb-6">
                {history.title}
              </Typography>
              <Text className="max-w-none">{history.content}</Text>
            </div>
            <div className="aspect-video rounded-xl bg-surface border border-dashed border-border flex items-center justify-center text-text-muted">
              Ilustrasi Sejarah
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="p-6 bg-primary-light border-primary-light">
              <Typography variant="h4" className="mb-4">
                Visi
              </Typography>
              <Typography variant="p" className="italic">
                {visionMission.vision}
              </Typography>
            </Card>
            <Card className="p-6">
              <Typography variant="h4" className="mb-4">
                Misi
              </Typography>
              <ol className="space-y-3">
                {visionMission.mission.map((mission) => (
                  <li key={mission} className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{mission}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Typography variant="h3" className="mb-6">
                {geography.title}
              </Typography>
              <dl className="divide-y divide-border border border-border rounded-xl">
                {geography.items.map((item) => (
                  <div key={item.label} className="p-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <dt className="font-semibold text-sm text-text-muted sm:w-40 shrink-0">
                      {item.label}
                    </dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <Typography variant="h3" className="mb-6">
                Demografi
              </Typography>
              <div className="grid sm:grid-cols-2 gap-4">
                {demographyStats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="text-center mb-12">
            Struktur Organisasi
          </Typography>
          <OrganizationChart head={organization.head} staff={organization.staff} />
        </Container>
      </Section>

      <Section className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="text-center mb-12">
            Peta Desa
          </Typography>
          <MapPlaceholder title={mapData.title} description={mapData.description} />
        </Container>
      </Section>

      <Section variant="gray" className="animate-slide-up">
        <Container>
          <Typography variant="h2" className="text-center mb-12">
            Timeline Perkembangan
          </Typography>
          <div className="max-w-3xl mx-auto">
            <ProfileTimeline events={timeline} />
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Profil
