import { useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { cn } from '../lib/utils'
import { Button, LinkButton } from './ui/Button'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stats', href: '#stats' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  const social = useMemo(() => portfolio.socials, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            'mt-4 rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur',
            'shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]',
          )}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <a href="#" className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold">
                {portfolio.name
                  .split(' ')
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join('')
                  .toUpperCase()}
              </span>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-zinc-50">{portfolio.name}</div>
                <div className="text-xs text-zinc-400">{portfolio.location}</div>
              </div>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-zinc-50"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex">
                {social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>

              <LinkButton href="#contact" variant="primary" className="hidden md:inline-flex">
                Let’s talk
              </LinkButton>

              <Button
                type="button"
                variant="secondary"
                className="md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </Button>
            </div>
          </div>

          {open ? (
            <div className="border-t border-white/10 px-4 py-4 md:hidden">
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
                  >
                    <s.icon className="size-4" />
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="mt-3">
                <LinkButton href="#contact" variant="primary" className="w-full">
                  Let’s talk
                </LinkButton>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

