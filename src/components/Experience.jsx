import React from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import FormattedDescription from './FormattedDescription'
import SectionHeader from './SectionHeader'

const ease = [0.16, 1, 0.3, 1]

export default function Experience() {
  const { state } = usePortfolio()
  const { experiences } = state

  return (
    <section id="experience" className="x-section" style={{ background: 'var(--x-surface)' }}>
      <div className="x-container">
        <SectionHeader index="05" label="Experience" title="Where I've worked" />

        <div style={{ border: '1px solid var(--x-line-soft)', borderRadius: '3px', background: 'var(--x-bg)' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.05, ease }}
              className="x-exp-row grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-9"
              style={{ borderBottom: i < experiences.length - 1 ? '1px solid var(--x-line-soft)' : 'none' }}
            >
              {/* Timeline meta */}
              <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-3 md:gap-2">
                <span className="font-mono text-xs font-medium" style={{ color: 'var(--x-accent)' }}>
                  {exp.year}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--x-faint)' }}>
                  {exp.duration}
                </span>
              </div>

              {/* Details */}
              <div className="md:col-span-9">
                <h3
                  className="font-grotesk font-bold text-lg md:text-xl mb-1"
                  style={{ color: 'var(--x-text)', letterSpacing: '-0.01em' }}
                >
                  {exp.role}
                </h3>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] mb-5" style={{ color: 'var(--x-muted)' }}>
                  {exp.company}
                </div>
                <FormattedDescription text={exp.description} className="x-body text-sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
