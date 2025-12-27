import * as React from 'react'
import { cn } from '../../lib/utils'

export type ChipProps = React.HTMLAttributes<HTMLSpanElement>

export function Chip({ className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200',
        className,
      )}
      {...props}
    />
  )
}

