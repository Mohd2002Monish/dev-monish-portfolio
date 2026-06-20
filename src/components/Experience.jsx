import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, ArrowUpRight } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import FormattedDescription from './FormattedDescription'

export default function Experience() {
  const { state } = usePortfolio()
  const experiences = [...state.experiences].sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 10% 50%, rgba(147,51,234,0.07) 0%, transparent 55%)' }}
      />
      <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="neon-tag mb-4 mx-auto w-fit">Experience</div>
          <h2 className="section-title">My Journey</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-divider"
        />

        <div className="max-w-3xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              display: 'none',
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="timeline-item"
            >
              {/* Animated glowing dot */}
              <motion.div
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.4 }}
              />

              {/* Card */}
              <motion.div
                whileHover={{ x: 6, borderColor: 'rgba(147,51,234,0.4)' }}
                className="glass-card p-6 ml-4 group transition-all duration-300"
              >
                {/* Year + Duration row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: 'rgba(147,51,234,0.12)',
                      border: '1px solid rgba(147,51,234,0.3)',
                      color: '#c084fc',
                    }}
                  >
                    <Calendar size={10} />
                    {exp.year}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(6,182,212,0.1)',
                      border: '1px solid rgba(6,182,212,0.25)',
                      color: '#22d3ee',
                    }}
                  >
                    {exp.duration}
                  </span>
                </div>

                {/* Role */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className="text-xl font-black text-white group-hover:text-violet-300 transition-colors"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {exp.role}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-600 group-hover:text-violet-400 transition-colors mt-1 flex-shrink-0"
                  />
                </div>

                {/* Company */}
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={13} style={{ color: '#c084fc' }} />
                  <span className="font-semibold text-sm" style={{ color: '#c084fc' }}>{exp.company}</span>
                </div>

                <FormattedDescription text={exp.description} className="text-gray-400 text-sm leading-relaxed" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
