import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import SectionHeader from './SectionHeader'

const ease = [0.16, 1, 0.3, 1]

export default function Contact() {
  const { state } = usePortfolio()
  const { about } = state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `Portfolio Contact from ${form.name}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    window.open(`mailto:${about.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }, 4000)
  }

  const socials = [
    { href: about.github, label: 'GitHub' },
    { href: about.linkedin, label: 'LinkedIn' },
    { href: about.instagram, label: 'Instagram' },
    { href: about.facebook, label: 'Facebook' },
  ].filter(s => s.href)

  return (
    <section id="contact" className="x-section">
      <div className="x-container">
        <SectionHeader index="06" label="Contact" title="Let's build something" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          {/* Left: pitch + email + socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-5 flex flex-col"
          >
            <p className="x-body text-[15px] mb-10 max-w-sm">
              Have a project in mind, a role to fill, or just want to talk shop?
              My inbox is always open — I usually reply within a day.
            </p>

            <div className="x-label mb-3">
              <span className="x-label-index">→</span>
              Email
            </div>
            <a
              href={`mailto:${about.email}`}
              className="font-grotesk font-semibold break-all mb-12 transition-colors duration-200"
              style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)', letterSpacing: '-0.01em', color: 'var(--x-text)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--x-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--x-text)')}
            >
              {about.email}
            </a>

            <div className="x-label mb-4">
              <span className="x-label-index">→</span>
              Elsewhere
            </div>
            <div className="flex flex-col">
              {socials.map(({ href, label }, i) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-3.5"
                  style={{ borderBottom: i < socials.length - 1 ? '1px solid var(--x-line-soft)' : 'none' }}
                >
                  <span
                    className="font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200 group-hover:!text-[var(--x-accent)]"
                    style={{ color: 'var(--x-muted)' }}
                  >
                    {label}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--x-faint)' }}
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="lg:col-span-7"
          >
            <div
              className="p-7 md:p-10"
              style={{ border: '1px solid var(--x-line-soft)', borderRadius: '3px', background: 'var(--x-surface)' }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-4 py-14"
                >
                  <span
                    className="w-11 h-11 flex items-center justify-center"
                    style={{ border: '1px solid var(--x-accent-line)', color: 'var(--x-accent)', borderRadius: '2px' }}
                  >
                    <Check size={18} />
                  </span>
                  <h4 className="font-grotesk font-bold text-xl" style={{ color: 'var(--x-text)' }}>
                    Message ready
                  </h4>
                  <p className="x-body text-sm">Your email client just opened — hit send and I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="x-label !text-[10px] mb-1 block" htmlFor="contact-name">
                        01 — Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="x-input"
                      />
                    </div>
                    <div>
                      <label className="x-label !text-[10px] mb-1 block" htmlFor="contact-email">
                        02 — Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="x-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="x-label !text-[10px] mb-1 block" htmlFor="contact-message">
                      03 — Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project…"
                      className="x-input resize-none"
                    />
                  </div>
                  <button type="submit" className="x-btn self-start !px-10">
                    Send Message
                    <ArrowUpRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
