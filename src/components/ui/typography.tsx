import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted'

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl leading-[2.75rem] font-heading font-normal tracking-tight text-on-surface', // display-small: 36px/44px
  h2: 'text-3xl leading-10 font-heading font-normal text-on-surface', // headline-large: 32px/40px
  h3: 'text-[1.75rem] leading-9 font-heading font-normal text-on-surface', // headline-medium: 28px/36px
  h4: 'text-2xl leading-8 font-heading font-normal text-on-surface', // headline-small: 24px/32px
  h5: 'text-[1.375rem] leading-7 font-heading font-medium text-on-surface', // title-large: 22px/28px
  h6: 'text-base leading-6 font-heading font-medium text-on-surface tracking-wide', // title-medium: 16px/24px
  p: 'text-base leading-relaxed text-on-surface', // body-large: 16px/24px
  lead: 'text-xl leading-relaxed text-on-surface-variant', // body-large + muted
  large: 'text-base font-medium text-on-surface', // title-medium (no heading font)
  small: 'text-xs leading-4 text-on-surface-variant', // body-small: 12px/16px
  muted: 'text-xs leading-4 text-on-surface-variant', // body-small
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
    <p className={cn('text-base leading-relaxed text-on-surface', balance && 'text-balance', className)} {...props}>
      {children}
    </p>
  )
}

export function Muted({ className, children, balance, ...props }: TextProps) {
  return (
    <p className={cn('text-xs leading-4 text-on-surface-variant', balance && 'text-balance', className)} {...props}>
      {children}
    </p>
  )
}

export function Lead({ className, children, balance, ...props }: TextProps) {
  return (
    <p className={cn('text-xl leading-relaxed text-on-surface-variant', balance && 'text-balance', className)} {...props}>
      {children}
    </p>
  )
}
