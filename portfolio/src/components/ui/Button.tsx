import * as React from 'react'
import { cn } from '../../lib/utils'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60',
        'disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' ? 'h-9 px-3' : 'h-11 px-4',
        variant === 'primary' && 'border-indigo-500/40 bg-indigo-500 text-white hover:bg-indigo-400',
        variant === 'secondary' &&
          'border-white/10 bg-white/5 text-zinc-50 hover:bg-white/10 hover:border-white/15',
        variant === 'ghost' && 'border-transparent bg-transparent text-zinc-100 hover:bg-white/5',
        className,
      )}
      {...props}
    />
  )
}

export type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function LinkButton({
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60',
        size === 'sm' ? 'h-9 px-3' : 'h-11 px-4',
        variant === 'primary' && 'border-indigo-500/40 bg-indigo-500 text-white hover:bg-indigo-400',
        variant === 'secondary' &&
          'border-white/10 bg-white/5 text-zinc-50 hover:bg-white/10 hover:border-white/15',
        variant === 'ghost' && 'border-transparent bg-transparent text-zinc-100 hover:bg-white/5',
        className,
      )}
      {...props}
    />
  )
}

