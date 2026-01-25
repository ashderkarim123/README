import { useState } from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { SectionHeading } from './SectionHeading'
import { FadeIn } from './FadeIn'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus('error')
      return
    }

    // Mock submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section id="contact-form" className="scroll-mt-28 py-12 md:py-16">
      <FadeIn>
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Have a project in mind or want to collaborate? Let’s talk." 
        />
        
        <Card className="max-w-2xl mx-auto p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-zinc-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-y"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full md:w-auto"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </div>

            {status === 'success' && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {status === 'error' && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                Please fill in all required fields correctly.
              </div>
            )}
          </form>
        </Card>
      </FadeIn>
    </section>
  )
}
