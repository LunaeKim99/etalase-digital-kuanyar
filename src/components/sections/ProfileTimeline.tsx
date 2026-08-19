import { Card } from '@/components/ui/card'
import { Muted, Typography } from '@/components/ui/typography'

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
}

interface ProfileTimelineProps {
  events: TimelineEvent[]
}

export default function ProfileTimeline({ events }: ProfileTimelineProps) {
  return (
    <div className="relative py-4">
      {events.map((event, index) => (
        <div key={event.id} className="mb-6 last:mb-0">
          <Card variant="filled" className="p-6 animate-fade-in">
            <div className="flex gap-4">
              <span className="badge shrink-0 inline-flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-1.5" />
                {event.year}
              </span>
              <div>
                <Typography variant="h5" className="mb-1">
                  {event.title}
                </Typography>
                <Muted>{event.description}</Muted>
              </div>
            </div>
          </Card>
          {index < events.length - 1 && (
            <div className="mx-auto w-0.5 h-6 bg-outline-variant" />
          )}
        </div>
      ))}
    </div>
  )
}
