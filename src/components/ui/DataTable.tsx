import type { ReactNode, ComponentType } from 'react'
import { cn } from '@/lib/utils'

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
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  actions,
  emptyMessage = 'Tidak ada data',
}: DataTableProps<T>) {
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