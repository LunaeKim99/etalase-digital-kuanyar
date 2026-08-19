import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Muted } from '@/components/ui/typography'

export interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit: (row: T) => void
  onDelete: (row: T) => void
  renderRowActions?: (row: T) => React.ReactNode
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  renderRowActions,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Muted>Tidak ada data.</Muted>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant">
      <table className="w-full bg-background text-sm">
        <thead className="bg-surface-container-highest border-b border-outline-variant">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 text-left font-medium text-sm text-on-surface">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-center font-medium text-sm text-on-surface">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors">
              {columns.map((col) => {
                const value =
                  typeof col.accessor === 'function'
                    ? col.accessor(row)
                    : (row[col.accessor] as unknown)
                return (
                  <td key={col.header} className="px-4 py-3 text-on-surface">
                    {value !== undefined && value !== null ? String(value) : '-'}
                  </td>
                )
              })}
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(row)} className="text-error hover:text-error">
                    Hapus
                  </Button>
                  {renderRowActions?.(row)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}