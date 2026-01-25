import type { Project } from '../data/portfolio'
import { cn } from '../lib/utils'
import { SectionHeading } from './SectionHeading'
import { Card } from './ui/Card'
import { Chip } from './ui/Chip'

type ProjectsProps = {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <div>
      <SectionHeading
        title="Projects & University Work"
        subtitle="A selection of academic and personal builds with modern stacks."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.title}
            className={cn(
              'group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]',
              project.featured && 'ring-1 ring-indigo-500/30',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-semibold text-zinc-50">{project.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>
              </div>
              {project.badge ? (
                <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-200">
                  {project.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
