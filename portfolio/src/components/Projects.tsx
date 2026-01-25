import { ExternalLink, GraduationCap } from 'lucide-react'
import { Card } from './ui/Card'
import { Chip } from './ui/Chip'
import { SectionHeading } from './SectionHeading'
import { FadeIn } from './FadeIn'
import { cn } from '../lib/utils'
import { portfolio } from '../data/portfolio'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 py-12 md:py-16">
      <FadeIn>
        <SectionHeading
          title="Projects & University Work"
          subtitle="A showcase of my academic and personal projects."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((p, idx) => {
            const isUniversityProject = p.tags.includes('University Project')
            
            return (
              <Card
                key={p.title}
                className={cn(
                  'group flex flex-col p-6 transition hover:border-white/15 hover:bg-white/[0.05]',
                  p.featured && 'ring-1 ring-indigo-500/25',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-base font-semibold text-zinc-50">{p.title}</div>
                      {isUniversityProject && (
                        <div title="University Project" className="text-indigo-400">
                          <GraduationCap className="size-4" />
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                      {p.description}
                    </p>
                  </div>
                  <div className="text-xs text-zinc-500 shrink-0">#{String(idx + 1).padStart(2, '0')}</div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip 
                        key={t} 
                        className={cn(
                          t === 'University Project' && "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                        )}
                      >
                        {t}
                      </Chip>
                    ))}
                  </div>

                  {p.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink className="size-4" />
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Card>
            )
          })}
        </div>
      </FadeIn>
    </section>
  )
}
