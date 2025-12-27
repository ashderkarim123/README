import { cn } from '../lib/utils'

export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn('mb-8 flex items-end justify-between gap-6', className)}>
      <div>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-400">{subtitle}</p>
        ) : null}
      </div>
    </div>
  )
}

