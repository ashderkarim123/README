import { GraduationCap, Sparkles } from 'lucide-react'
import type { ComponentType } from 'react'
import { portfolio } from '../data/portfolio'
import { cn } from '../lib/utils'
import { SectionHeading } from './SectionHeading'
import { Card } from './ui/Card'
import { Chip } from './ui/Chip'

type DisplayProject = {
  title: string
  description: string
  tags: string[]
  badge?: string
  icon?: ComponentType<{ className?: string }>
}

const extraProjects: DisplayProject[] = [
  {
    title: 'Pantry Plus – Smart Kitchen Pantry Application',
    description:
      'A smart kitchen pantry management application developed as a university project. Helps users manage pantry items, track expiry dates, and reduce food waste. Includes AI-powered features for smart suggestions and insights.',
    tags: ['React.js', 'Tailwind CSS', 'AI-powered features'],
    badge: 'University Project',
    icon: Sparkles,
  },
]

export function Projects() {
  const projects: DisplayProject[] = [
    ...extraProjects,
    ...portfolio.projects.map((p) => ({
      title: p.title,
      description: p.description,
      tags: p.tags,
    })),
  ]

  return (
    <div>
      <SectionHeading title="Projects & University Work" subtitle="A selection of academic and personal work." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const Icon = p.icon
          return (
            <Card
              key={p.title}
              className={cn(
                'group p-6 transition',
                'hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-base font-semibold text-zinc-50">{p.title}</div>
                    {p.badge ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-200">
                        <GraduationCap className="size-3.5" />
                        {p.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>
                </div>

                {Icon ? (
                  <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-200 transition group-hover:bg-white/10">
                    <Icon className="size-4" />
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

