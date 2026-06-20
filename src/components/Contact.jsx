import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, CheckCircle, MessageSquare, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'

export default function Contact() {
  const { state } = usePortfolio()
  const { about } = state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

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
    { href: about.github, icon: GithubIcon, label: 'GitHub', color: '#c084fc' },
    { href: about.linkedin, icon: LinkedinIcon, label: 'LinkedIn', color: '#22d3ee' },
    { href: about.instagram, icon: InstagramIcon, label: 'Instagram', color: '#f0abfc' },
    { href: about.facebook, icon: FacebookIcon, label: 'Facebook', color: '#60a5fa' },
  ]

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.07) 0%, transparent 55%)' }}
      />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="neon-tag mb-4 mx-auto w-fit">
            <Sparkles size={12} />
            Let's Connect
          </div>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-divider"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Left: Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* CTA card with gradient border */}
            <div
              className="glass-card p-7"
              style={{ border: '1px solid rgba(147,51,234,0.25)', boxShadow: '0 0 30px rgba(147,51,234,0.07)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'linear-gradient(135deg, #9333ea, #06b6d4)', boxShadow: '0 0 20px rgba(147,51,234,0.4)' }}
              >
                <MessageSquare size={20} className="text-white" />
              </div>
              <h3
                className="text-2xl font-black text-white mb-3"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Let's Chat! 🚀
              </h3>
              <p className="text-gray-400 leading-relaxed mb-5 text-sm">
                I'm always open to discussing new projects, creative ideas, or opportunities. Don't be a stranger!
              </p>
              <a
                href={`mailto:${about.email}`}
                className="flex items-center gap-3 group w-fit"
              >
                <Mail
                  size={16}
                  style={{ color: '#22d3ee' }}
                  className="group-hover:scale-110 transition-transform"
                />
                <span
                  className="font-medium text-sm transition-colors"
                  style={{ color: '#22d3ee' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#67e8f9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#22d3ee'}
                >
                  {about.email}
                </span>
              </a>
            </div>

            {/* Social links */}
            <div className="glass-card p-5">
              <p className="text-gray-500 text-xs font-medium mb-4 uppercase tracking-widest">Find Me On</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ href, icon: Icon, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    whileHover={{ y: -3, scale: 1.03, borderColor: `${color}50`, backgroundColor: `${color}08` }}
                  >
                    <Icon size={16} style={{ color }} />
                    <span className="text-gray-400 text-sm font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Animated gradient border wrapper */}
            <div
              className="p-[1.5px] rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(147,51,234,0.5), rgba(6,182,212,0.5), rgba(217,70,239,0.3))',
                boxShadow: '0 0 40px rgba(147,51,234,0.12)',
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 flex flex-col gap-5"
                style={{ background: '#080d1a' }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={56} style={{ color: '#4ade80' }} />
                    </motion.div>
                    <h4 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Message Sent! 🎉
                    </h4>
                    <p className="text-gray-400 text-sm">Your email client opened. Thanks for reaching out!</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-widest" htmlFor="contact-name">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="John Doe"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-widest" htmlFor="contact-email">
                          Your Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="john@example.com"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-widest" htmlFor="contact-message">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        required
                        rows={5}
                        placeholder="Tell me about your project or just say hello..."
                        className="form-input resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="btn-primary flex items-center justify-center gap-2 py-4 text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Send size={16} />
                      Send Message
                    </motion.button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
