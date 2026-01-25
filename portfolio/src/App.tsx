import { useMemo, useState } from 'react'
import { ArrowRight, Copy, ExternalLink, Github, GraduationCap, MapPin } from 'lucide-react'
import { FadeIn } from './components/FadeIn'
import { Navbar } from './components/Navbar'
import { SectionHeading } from './components/SectionHeading'
import { Contact } from './components/Contact'
import { portfolio } from './data/portfolio'
import { cn } from './lib/utils'
import { Card } from './components/ui/Card'
import { Chip } from './components/ui/Chip'
import { Button, LinkButton } from './components/ui/Button'

function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('scroll-mt-28 py-12 md:py-16', className)}>
      {children}
    </section>
  )
}

export default function App() {
  const [copied, setCopied] = useState(false)
  const data = useMemo(() => portfolio, [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(data.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Best-effort fallback: open email client
      window.location.href = `mailto:${data.email}`
    }
  }

  return (
    <div className="min-h-screen bg-grid">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-50 focus:ring-2 focus:ring-indigo-400/60"
      >
        Skip to content
      </a>

      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-120px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute left-[-140px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <Navbar />

      <main id="content" className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        <Section id="home" className="pt-10 md:pt-14">
          <div className="grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <FadeIn>
                <div className="flex flex-wrap items-center gap-2">
                  {data.badges.map((b) => (
                    <Chip key={b.label} className="gap-2">
                      <b.icon className="size-3.5" />
                      {b.label}
                    </Chip>
                  ))}
                </div>

                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
                  {data.name}
                </h1>
                <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-300 md:text-lg">
                  {data.headline}
                </p>
                <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-400 md:text-base">
                  {data.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <LinkButton href={data.cta.primary.href} variant="primary">
                    {data.cta.primary.label} <ArrowRight className="size-4" />
                  </LinkButton>
                  <LinkButton href={data.cta.secondary.href} variant="secondary">
                    {data.cta.secondary.label}
                  </LinkButton>
                  <div className="ml-0 flex items-center gap-2 md:ml-2">
                    {data.socials.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                        aria-label={s.label}
                        title={s.label}
                      >
                        <s.icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="size-4" />
                  {data.location}
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-5">
              <FadeIn delay={0.05}>
                <Card className="p-5">
                  <div className="text-sm font-semibold text-zinc-50">Quick info</div>
                  <div className="mt-3 grid gap-3">
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <div className="min-w-0">
                        <div className="text-xs text-zinc-400">Email</div>
                        <div className="truncate text-sm text-zinc-100">{data.email}</div>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={copyEmail}>
                        <Copy className="size-4" />
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                      <div className="text-xs text-zinc-400">Certifications</div>
                      <ul className="mt-2 grid gap-1 text-sm text-zinc-200">
                        {data.certifications.map((c) => (
                          <li key={c} className="truncate">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                      <div className="text-xs text-zinc-400">Currently learning</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {['AI', 'Data Science', 'Cybersecurity', 'Software Architecture'].map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </Section>

        <Section id="about">
          <FadeIn>
            <SectionHeading title="About" subtitle="A quick snapshot of what I do and what I'm optimizing for." />
            <div className="grid gap-4 md:grid-cols-12">
              <Card className="p-6 md:col-span-7">
                <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-strong:text-zinc-50">
                  {data.about.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Card>
              <Card className="p-6 md:col-span-5">
                <div className="text-sm font-semibold text-zinc-50">What you can expect</div>
                <ul className="mt-3 grid gap-2 text-sm text-zinc-300">
                  <li>Clean, reliable solutions with practical documentation.</li>
                  <li>Comfort with networking, VoIP, and Linux-based systems.</li>
                  <li>Automation-first mindset (less manual work, fewer errors).</li>
                </ul>
              </Card>
            </div>
          </FadeIn>
        </Section>

        <Section id="projects">
          <FadeIn>
            <SectionHeading
              title="Projects & University Work"
              subtitle="Academic and personal projects showcasing my skills and learning journey."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((p, idx) => (
                <Card
                  key={p.title}
                  className={cn(
                    'group relative p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:scale-[1.02]',
                    p.featured && 'ring-1 ring-indigo-500/25',
                  )}
                >
                  {p.badge && (
                    <div className="absolute -top-2 right-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300">
                        <GraduationCap className="size-3" />
                        {p.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className={cn(p.badge && 'mt-2')}>
                      <div className="text-base font-semibold text-zinc-50">{p.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>
                    </div>
                    <div className={cn('shrink-0 text-xs text-zinc-500', p.badge && 'mt-2')}>
                      #{String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
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
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                        >
                          <ExternalLink className="size-4" />
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          </FadeIn>
        </Section>

        <Section id="stats">
          <FadeIn>
            <SectionHeading title="Stats" subtitle="Quick metrics and focus areas (customizable)." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.stats.map((s) => (
                <Card key={s.label} className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-zinc-400">{s.label}</div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">{s.value}</div>
                      {s.hint ? <div className="mt-1 text-xs text-zinc-500">{s.hint}</div> : null}
                    </div>
                    <div className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200">
                      <s.icon className="size-4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </FadeIn>
        </Section>

        <Section id="skills">
          <FadeIn>
            <SectionHeading title="Skills" subtitle="Tools and technologies I use day-to-day." />
            <div className="grid gap-4 md:grid-cols-2">
              {data.skills.map((g) => (
                <Card key={g.label} className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200">
                      <g.icon className="size-4" />
                    </div>
                    <div className="text-sm font-semibold text-zinc-50">{g.label}</div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <Chip key={it}>{it}</Chip>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </FadeIn>
        </Section>

        <Section id="contact">
          <FadeIn>
            <SectionHeading
              title="Get In Touch"
              subtitle="Have a project in mind or want to collaborate? Let's talk."
            />
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <Contact />
              </div>

              <Card className="p-6 md:col-span-5">
                <div className="text-sm font-semibold text-zinc-50">Quick Contact</div>
                <p className="mt-2 text-sm text-zinc-400">
                  Prefer a quick message? Use email or connect with me on social media.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <LinkButton href={`mailto:${data.email}`} variant="primary">
                    Email me <ArrowRight className="size-4" />
                  </LinkButton>
                  <Button type="button" variant="secondary" onClick={copyEmail}>
                    <Copy className="size-4" />
                    {copied ? 'Copied' : 'Copy email'}
                  </Button>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold text-zinc-50">Links</div>
                  <div className="mt-3 grid gap-2">
                    <a
                      href={data.socials.find((s) => s.label === 'GitHub')?.href ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-200 hover:bg-white/10"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Github className="size-4" /> GitHub
                      </span>
                      <ExternalLink className="size-4 text-zinc-500" />
                    </a>
                    {data.socials
                      .filter((s) => s.label !== 'GitHub')
                      .map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-200 hover:bg-white/10"
                        >
                          <span className="inline-flex items-center gap-2">
                            <s.icon className="size-4" /> {s.label}
                          </span>
                          <ExternalLink className="size-4 text-zinc-500" />
                        </a>
                      ))}
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </Section>

        <footer className="mt-8 border-t border-white/10 pt-8 text-sm text-zinc-500">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              © {new Date().getFullYear()} {data.name}. Built with React + Tailwind.
            </div>
            <a href="#home" className="text-zinc-400 hover:text-zinc-200">
              Back to top
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
