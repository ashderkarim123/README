import { useState, type FormEvent, type ChangeEvent } from 'react'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { cn } from '../lib/utils'

type FormData = {
  fullName: string
  email: string
  subject: string
  message: string
}

type FormErrors = {
  fullName?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate on blur
    const fieldErrors = validateForm(formData)
    if (fieldErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Validate all fields
    const formErrors = validateForm(formData)
    setErrors(formErrors)
    setTouched({ fullName: true, email: true, message: true })

    if (Object.keys(formErrors).length > 0) {
      return
    }

    setSubmitStatus('submitting')

    // Mock submission - simulates API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate success (in real implementation, this would be an API call)
      console.log('Form submitted:', formData)

      setSubmitStatus('success')
      setFormData({ fullName: '', email: '', subject: '', message: '' })
      setTouched({})

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const inputBaseClasses = cn(
    'w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-zinc-100',
    'placeholder:text-zinc-500',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  )

  const inputNormalClasses = 'border-white/10 hover:border-white/20'
  const inputErrorClasses = 'border-red-500/50 focus:ring-red-400/60'

  return (
    <Card className="p-6 md:p-8">
      {submitStatus === 'success' ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="inline-flex size-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <CheckCircle className="size-8" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-zinc-50">Message Sent!</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-zinc-200">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                disabled={submitStatus === 'submitting'}
                className={cn(
                  inputBaseClasses,
                  touched.fullName && errors.fullName ? inputErrorClasses : inputNormalClasses,
                )}
              />
              {touched.fullName && errors.fullName && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="size-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                disabled={submitStatus === 'submitting'}
                className={cn(
                  inputBaseClasses,
                  touched.email && errors.email ? inputErrorClasses : inputNormalClasses,
                )}
              />
              {touched.email && errors.email && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="size-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-zinc-200">
                Subject <span className="text-zinc-500">(optional)</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                disabled={submitStatus === 'submitting'}
                className={cn(inputBaseClasses, inputNormalClasses)}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-200">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell me about your project or idea..."
                rows={5}
                disabled={submitStatus === 'submitting'}
                className={cn(
                  inputBaseClasses,
                  'resize-none',
                  touched.message && errors.message ? inputErrorClasses : inputNormalClasses,
                )}
              />
              {touched.message && errors.message && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="size-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="size-4 shrink-0" />
                <span>Something went wrong. Please try again later.</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={submitStatus === 'submitting'}
              className="mt-2 w-full"
            >
              {submitStatus === 'submitting' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}
