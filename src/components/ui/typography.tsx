import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted'

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-heading font-bold',
  h2: 'text-3xl font-heading font-bold',
  h3: 'text-2xl font-heading font-bold',
  h4: 'text-xl font-heading font-bold',
  h5: 'text-lg font-heading font-bold',
  h6: 'text-base font-heading font-bold',
  p: 'text-base leading-relaxed',
  lead: 'text-xl leading-relaxed text-text-muted',
  large: 'text-lg font-medium',
  small: 'text-sm text-text-muted',
  muted: 'text-sm text-text-muted',
}

const defaultElements: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
}

type TypographyProps = HTMLAttributes<HTMLElement> & {
  variant?: TypographyVariant
}

export function Typography({ variant = 'p', className, children, ...props }: TypographyProps) {
  return createElement(
    defaultElements[variant],
    { className: cn(variantClasses[variant], className), ...props },
    children
  )
}

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  balance?: boolean
}

export function Text({ className, children, balance, ...props }: TextProps) {
  return (
    <p className={cn('text-base leading-relaxed', balance && 'text-balance', className)} {...props}>
      {children}
    </p>
  )
}

export function Muted({ className, children, balance, ...props }: TextProps) {
  return (
    <p className={cn('text-sm text-text-muted', balance && 'text-balance', className)} {...props}>
      {children}
    </p>
  )
}

export function Lead({ className, children, balance, ...props }: TextProps) {
  return (
    <p className={cn('text-xl leading-relaxed text-text-muted', balance && 'text-balance', className)} {...props}>
      {children}
    </p>
  )
}
