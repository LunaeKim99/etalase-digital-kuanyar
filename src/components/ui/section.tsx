import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gray' | 'primary'
  spacing?: 'sm' | 'md'
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', spacing = 'md', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-background',
      gray: 'bg-surface-container-low',
      primary: 'bg-primary-container text-on-primary-container',
    }

    const spacingClasses = {
      sm: 'section-sm',
      md: 'section',
    }

    return (
      <section
        ref={ref}
        className={cn(variantClasses[variant], spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'