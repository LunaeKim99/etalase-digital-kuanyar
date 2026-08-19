import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, id, ...props }, ref) => (
    <div>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={cn(
          'input',
          error && 'border-b-error border-b-2 bg-error/5',
          className
        )}
        {...props}
      />
      {error && <p id={id ? `${id}-error` : undefined} className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
)

Input.displayName = 'Input'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('label', className)} {...props} />
  )
)

Label.displayName = 'Label'