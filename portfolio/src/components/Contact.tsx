import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { cn } from '../lib/utils'
import { SectionHeading } from './SectionHeading'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

type ContactFormValues = {
  fullName: string
  email: string
  subject: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

type StatusMessage = {
  type: 'success' | 'error'
  message: string
}

const initialValues: ContactFormValues = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.'
  }

  return errors
}

export function Contact({ email }: { email?: string }) {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)

    if (status?.type === 'error') {
      setStatus(null)
    }

    if (errors[name as keyof ContactFormValues]) {
      const nextErrors = validate(nextValues)
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name as keyof ContactFormValues] }))
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = event.target
    const nextErrors = validate(values)
    setErrors((prev) => ({ ...prev, [name]: nextErrors[name as keyof ContactFormValues] }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setStatus({ type: 'success', message: 'Thanks for reaching out! I will respond within 24-48 hours.' })
      setValues(initialValues)
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClassName = (hasError: boolean) =>
    cn(
      'w-full rounded-xl border bg-white/5 px-3 py-2 text-sm text-zinc-100 shadow-sm transition',
      'placeholder:text-zinc-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70',
      hasError
        ? 'border-rose-500/60 focus:border-rose-400/60 focus:ring-rose-500/30'
        : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-400/30',
    )

  return (
    <div>
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Let's talk."
      />
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="p-6 md:col-span-7">
          <div className="text-sm font-semibold text-zinc-50">Send a message</div>
          <p className="mt-2 text-sm text-zinc-400">
            Share a few details about your project or idea, and I'll follow up soon.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-zinc-200">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClassName(Boolean(errors.fullName))}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.fullName ? (
                  <p id="fullName-error" className="mt-1 text-xs text-rose-300">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClassName(Boolean(errors.email))}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-1 text-xs text-rose-300">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium text-zinc-200">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                autoComplete="off"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName(false)}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-zinc-200">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName(Boolean(errors.message))}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                disabled={isSubmitting}
              />
              {errors.message ? (
                <p id="message-error" className="mt-1 text-xs text-rose-300">
                  {errors.message}
                </p>
              ) : null}
            </div>

            {status ? (
              <div
                className={cn(
                  'rounded-xl border px-4 py-3 text-sm',
                  status.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
                    : 'border-rose-500/30 bg-rose-500/10 text-rose-100',
                )}
                role={status.type === 'success' ? 'status' : 'alert'}
                aria-live={status.type === 'success' ? 'polite' : 'assertive'}
              >
                {status.message}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              <span className="text-xs text-zinc-500">Response time: 24-48 hours on weekdays.</span>
            </div>
          </form>
        </Card>

        <Card className="p-6 md:col-span-5">
          <div className="text-sm font-semibold text-zinc-50">What to include</div>
          <p className="mt-2 text-sm text-zinc-400">The more context you share, the faster I can help.</p>
          <ul className="mt-4 grid gap-3 text-sm text-zinc-300">
            <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              Brief project overview and goals
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              Target timeline or deadline
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              Links, references, or any design direction
            </li>
          </ul>
          {email ? (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-300">
              Prefer email?{' '}
              <a href={`mailto:${email}`} className="font-medium text-zinc-50 hover:text-white">
                {email}
              </a>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}
