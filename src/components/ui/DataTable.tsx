import type { ReactNode, ComponentType } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export interface Column<T> {
  key: string
  header: string
  cell?: (row: T) => ReactNode
}

export interface Action<T> {
  icon: ComponentType<{ className?: string }>
  label: string
  onClick: (row: T) => void
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  emptyMessage?: string
  loading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  actions,
  emptyMessage = 'Tidak ada data',
  loading,
  error,
  onRetry,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="py-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="h-4 bg-surface-container-highest rounded flex-1" />
            <div className="h-4 bg-surface-container-highest rounded w-24" />
            <div className="h-4 bg-surface-container-highest rounded w-16" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-8 h-8 text-error mx-auto mb-3" />
        <p className="text-error mb-4">Gagal memuat data</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Coba lagi
          </Button>
        )}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-on-surface-variant">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-container-highest border-b border-outline-variant">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-on-surface text-sm">
                {col.header}
              </th>
            ))}
            {actions && <th className="w-24 text-center">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-top">
                  {col.cell ? col.cell(row) : (row as any)[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action.onClick(row)}
                        title={action.label}
                        className={cn('p-1 rounded hover:bg-surface-container-low transition-colors', action.className)}
                      >
                        <action.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}