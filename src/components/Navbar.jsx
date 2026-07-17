import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

const navLinks = [
  { href: '#home', label: 'Home', index: '01' },
  { href: '#about', label: 'About', index: '02' },
  { href: '#skills', label: 'Stack', index: '03' },
  { href: '#projects', label: 'Work', index: '04' },
  { href: '#experience', label: 'Experience', index: '05' },
  { href: '#contact', label: 'Contact', index: '06' },
]

export default function Navbar() {
  const { state, theme, toggleTheme } = usePortfolio()
  const settings = state.settings || { defaultTheme: 'dark', allowThemeToggle: true }
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec)
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(sec)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'color-mix(in srgb, var(--x-bg) 88%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--x-line-soft)' : '1px solid transparent',
        transition: 'background-color 400ms, border-color 400ms',
      }}
    >
      <div className="x-container">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span
              className="w-2 h-2 flex-shrink-0"
              style={{ background: 'var(--x-accent)' }}
            />
            <span
              className="font-grotesk font-bold text-[15px] tracking-tight"
              style={{ color: 'var(--x-text)', letterSpacing: '-0.02em' }}
            >
              MOHD&nbsp;MONISH
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(({ href, label, index }) => {
              const isActive = activeSection === href.replace('#', '')
              return (
                <a key={href} href={href} className={`x-nav-link ${isActive ? 'active' : ''}`}>
                  <span className="x-nav-index">{index}</span>
                  {label}
                </a>
              )
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {settings.allowThemeToggle && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center transition-colors duration-200"
                style={{ border: '1px solid var(--x-line)', color: 'var(--x-muted)', borderRadius: '2px' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--x-accent)'; e.currentTarget.style.borderColor = 'var(--x-accent-line)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--x-muted)'; e.currentTarget.style.borderColor = 'var(--x-line)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}
            <a
              href={state.about.resumeUrl || '/Mohd_Monish.pdf'}
              target="_blank"
              rel="noreferrer"
              className="x-btn-ghost !py-2 !px-4"
            >
              Resume
              <ArrowUpRight size={12} className="x-link-arrow" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            style={{ border: '1px solid var(--x-line)', color: 'var(--x-text)', borderRadius: '2px' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'var(--x-bg)',
              borderBottom: '1px solid var(--x-line-soft)',
            }}
          >
            <div className="x-container py-5 flex flex-col">
              {navLinks.map(({ href, label, index }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-baseline gap-4 py-3.5"
                  style={{ borderBottom: '1px solid var(--x-line-soft)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-mono text-[10px]" style={{ color: 'var(--x-accent)' }}>{index}</span>
                  <span className="font-grotesk font-semibold text-2xl" style={{ color: 'var(--x-text)', letterSpacing: '-0.02em' }}>
                    {label}
                  </span>
                </motion.a>
              ))}
              <div className="flex items-center gap-3 pt-5">
                <a
                  href={state.about.resumeUrl || '/Mohd_Monish.pdf'}
                  target="_blank"
                  rel="noreferrer"
                  className="x-btn flex-1"
                >
                  Resume
                  <ArrowUpRight size={12} />
                </a>
                {settings.allowThemeToggle && (
                  <button
                    onClick={toggleTheme}
                    className="x-btn-ghost !px-4"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
