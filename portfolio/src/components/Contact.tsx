import { Mail, SendHorizontal } from 'lucide-react'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { portfolio } from '../data/portfolio'
import { cn } from '../lib/utils'
import { SectionHeading } from './SectionHeading'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

type ContactValues = {
  fullName: string
  email: string
  subject: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>

const initialValues: ContactValues = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
}

function isValidEmail(email: string) {
  // Pragmatic client-side validation; backend validation still required in real integrations.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

async function mockSubmit(values: ContactValues) {
  // Mock network latency
  await new Promise((r) => window.setTimeout(r, 900))

  // Optional deterministic failure path so error UI can be exercised.
  if (values.email.toLowerCase().includes('fail')) {
    throw new Error('Mock submission failed')
  }
}

function validate(values: ContactValues): ContactErrors {
  const next: ContactErrors = {}

  if (!values.fullName.trim()) next.fullName = 'Full name is required.'
  if (!values.email.trim()) next.email = 'Email address is required.'
  else if (!isValidEmail(values.email)) next.email = 'Please enter a valid email address.'
  if (!values.message.trim()) next.message = 'Message is required.'

  return next
}

export function Contact({ className }: { className?: string }) {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState<string | null>(null)

  const socials = useMemo(() => portfolio.socials, [])

  const isSubmitting = status === 'submitting'

  function update<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => {
      if (!e[key]) return e
      const next = { ...e }
      delete next[key]
      return next
    })
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setFeedback(null)
    setStatus('idle')

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      await mockSubmit(values)
      setStatus('success')
      setFeedback("Thanks — your message is ready to send. I’ll get back to you soon.")
      setValues(initialValues)
      setErrors({})
    } catch {
      setStatus('error')
      setFeedback('Something went wrong while sending. Please try again.')
    }
  }

  return (
    <div className={cn(className)}>
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Let’s talk."
      />

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="p-6 md:col-span-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-zinc-50">Send a message</div>
              <p className="mt-1 text-sm text-zinc-400">
                This form is mocked for now (no backend). It still validates inputs and shows submission feedback.
              </p>
            </div>
          </div>

          {feedback ? (
            <div
              className={cn(
                'mt-4 rounded-xl border px-4 py-3 text-sm',
                status === 'success' && 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100',
                status === 'error' && 'border-rose-500/25 bg-rose-500/10 text-rose-100',
              )}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </div>
          ) : null}

          <form className="mt-5 grid gap-4" onSubmit={onSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-zinc-300" htmlFor="fullName">
                  Full Name <span className="text-rose-300">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className={cn(
                    'mt-2 w-full rounded-xl border bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 shadow-sm outline-none',
                    'placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-400/20',
                    errors.fullName ? 'border-rose-500/40' : 'border-white/10',
                  )}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  disabled={isSubmitting}
                  required
                />
                {errors.fullName ? (
                  <p id="fullName-error" className="mt-1.5 text-xs text-rose-200">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300" htmlFor="email">
                  Email Address <span className="text-rose-300">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={cn(
                    'mt-2 w-full rounded-xl border bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 shadow-sm outline-none',
                    'placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-400/20',
                    errors.email ? 'border-rose-500/40' : 'border-white/10',
                  )}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSubmitting}
                  required
                />
                {errors.email ? (
                  <p id="email-error" className="mt-1.5 text-xs text-rose-200">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300" htmlFor="subject">
                Subject <span className="text-zinc-500">(optional)</span>
              </label>
              <input
                id="subject"
                name="subject"
                value={values.subject}
                onChange={(e) => update('subject', e.target.value)}
                className={cn(
                  'mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 shadow-sm outline-none',
                  'placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-400/20',
                )}
                placeholder="What’s this about?"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300" htmlFor="message">
                Message <span className="text-rose-300">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={(e) => update('message', e.target.value)}
                className={cn(
                  'mt-2 min-h-[140px] w-full resize-y rounded-xl border bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 shadow-sm outline-none',
                  'placeholder:text-zinc-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-400/20',
                  errors.message ? 'border-rose-500/40' : 'border-white/10',
                )}
                placeholder="Tell me a bit about your project, timeline, and goals."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.message ? (
                <p id="message-error" className="mt-1.5 text-xs text-rose-200">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-zinc-500">
                Tip: use an email containing <span className="font-medium text-zinc-400">fail</span> to preview the
                error state.
              </div>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                <SendHorizontal className="size-4" />
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6 md:col-span-5">
          <div className="text-sm font-semibold text-zinc-50">Direct contact</div>
          <p className="mt-2 text-sm text-zinc-400">
            Prefer email? Reach out directly and I’ll respond as soon as possible.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-zinc-400">Email</div>
                <a
                  href={`mailto:${portfolio.email}`}
                  className="mt-1 inline-flex items-center gap-2 truncate text-sm text-zinc-100 hover:text-zinc-50"
                >
                  <Mail className="size-4 text-zinc-400" />
                  {portfolio.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-zinc-300">Links</div>
            <div className="mt-2 grid gap-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-200 transition hover:border-white/15 hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <s.icon className="size-4" /> {s.label}
                  </span>
                  <span className="text-xs text-zinc-500">Open</span>
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

