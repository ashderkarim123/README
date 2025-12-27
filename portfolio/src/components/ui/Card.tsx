import * as React from 'react'
import { cn } from '../../lib/utils'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]',
        'backdrop-blur',
        className,
      )}
      {...props}
    />
  )
}

