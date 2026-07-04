import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'

const levelConfig = {
  Expert: { color: '#c084fc', glow: 'rgba(192,132,252,0.4)', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.3)', label: '★ Expert' },
  Advanced: { color: '#22d3ee', glow: 'rgba(34,211,238,0.4)', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)', label: '● Advanced' },
  Intermediate: { color: '#a3e635', glow: 'rgba(163,230,53,0.4)', bg: 'rgba(163,230,53,0.1)', border: 'rgba(163,230,53,0.3)', label: '◆ Intermediate' },
}

function SkillCard({ skill }) {
  const cfg = levelConfig[skill.level] || levelConfig.Intermediate

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      whileHover={{
        y: -8,
        scale: 1.06,
        boxShadow: `0 0 30px ${cfg.glow}, 0 10px 40px rgba(0,0,0,0.4)`,
        borderColor: cfg.border,
      }}
      transition={{ duration: 0.3 }}
      className="skill-card group"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Glowing bg on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at center, ${cfg.bg} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 w-14 h-14 flex items-center justify-center">
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-12 h-12 object-contain group-hover:scale-115 transition-transform duration-300"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div
          className="hidden w-12 h-12 rounded-xl items-center justify-center text-white font-black text-xl"
          style={{ background: `linear-gradient(135deg, ${cfg.color}30, ${cfg.color}10)`, fontFamily: 'Outfit, sans-serif' }}
        >
          {skill.name.charAt(0)}
        </div>
      </div>

      <span className="relative z-10 text-white font-semibold text-sm text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {skill.name}
      </span>

      {skill.level && (
        <span
          className="relative z-10 text-xs px-2.5 py-0.5 rounded-full font-semibold"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
        >
          {cfg.label}
        </span>
      )}
    </motion.div>
  )
}

export default function Skills() {
  const { state } = usePortfolio()
  const { skills } = state

  // Split into two rows for marquee
  const mid = Math.ceil(skills.length / 2)
  const row1 = skills.slice(0, mid)
  const row2 = skills.slice(mid)

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 60%, rgba(6,182,212,0.06) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 line-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <div className="neon-tag mb-4 mx-auto w-fit">Tech Stack</div>
          <h2 className="section-title">Skills & Technologies</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="section-divider"
        />

        {/* Standard grid (shows all cards with scroll animation) */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </motion.div>

        {/* Bottom level legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-5 mt-12"
        >
          {Object.entries(levelConfig).map(([level, cfg]) => (
            <div key={level} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.glow}` }} />
              <span className="text-gray-500 text-xs font-medium">{level}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
