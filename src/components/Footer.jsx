import React from 'react'
import { ArrowUp } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export default function Footer() {
  const { state } = usePortfolio()
  const { about } = state

  const links = [
    { href: about.github, label: 'GitHub' },
    { href: about.linkedin, label: 'LinkedIn' },
    { href: about.instagram, label: 'Instagram' },
    { href: `mailto:${about.email}`, label: 'Email' },
  ].filter(l => l.href)

  return (
    <footer style={{ borderTop: '1px solid var(--x-line-soft)' }}>
      <div className="x-container">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-10">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="w-2 h-2 flex-shrink-0" style={{ background: 'var(--x-accent)' }} />
            <span className="font-grotesk font-bold text-[15px]" style={{ color: 'var(--x-text)', letterSpacing: '-0.02em' }}>
              MOHD&nbsp;MONISH
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-6">
            {links.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200"
                style={{ color: 'var(--x-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--x-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--x-muted)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="x-hairline" />

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--x-faint)' }}>
            © {new Date().getFullYear()} — Designed & built by Mohd Monish
          </span>
          <a
            href="#home"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-200"
            style={{ color: 'var(--x-faint)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--x-accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--x-faint)')}
          >
            Back to top
            <ArrowUp size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
