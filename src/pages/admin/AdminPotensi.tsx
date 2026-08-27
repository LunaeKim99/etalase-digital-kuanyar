import { Link } from 'react-router-dom'

export default function AdminPotensi() {
  return (
    <div>
      <Link to="/admin/potensi/umkm">UMKM</Link>
      <Link to="/admin/potensi/pertanian">Pertanian</Link>
    </div>
  )
}
