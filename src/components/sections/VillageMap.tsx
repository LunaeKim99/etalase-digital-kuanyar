import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Typography, Muted } from '@/components/ui/typography'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const CENTER: [number, number] = [-6.752317320870769, 110.73665112293429]

interface VillageMapProps {
  villageName?: string
  contactInfo?: string
}

export default function VillageMap({
  contactInfo = 'Desa Kuanyar, Kec. Mayong, Kab. Jepara, Jawa Tengah',
}: VillageMapProps) {
  return (
    <MapContainer
      center={CENTER}
      zoom={16}
      scrollWheelZoom={false}
      className="h-96 w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={CENTER}>
        <Popup>
          <div className="text-center p-1">
            <Typography variant="h6" className="text-on-surface mb-1">Balai Desa Kuanyar</Typography>
            <Muted className="text-xs text-on-surface-variant">{contactInfo}</Muted>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
