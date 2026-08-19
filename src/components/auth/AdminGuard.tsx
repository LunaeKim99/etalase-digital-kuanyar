import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

interface Props {
  children: ReactNode
}

export function AdminGuard({ children }: Props) {
  const { status, user } = useAuth()
  const location = useLocation()

  if (status === 'initializing') {
    return <LoadingSkeleton variant="card" count={1} />
  }

  if (status !== 'authenticated' || !user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/admin/unauthorized" replace />
  }

  return <>{children}</>
}
