import React from 'react'
import { motion } from 'framer-motion'
import { Download, Zap, Cpu, Rocket, Brain, MapPin, Coffee, Code2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'

const bentoItems = [
  {
    id: 'role',
    cols: 2,
    rows: 1,
    content: ({ about }) => (
      <div className="flex flex-col justify-between h-full">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: 'linear-gradient(135deg, #9333ea, #06b6d4)', boxShadow: '0 0 20px rgba(147,51,234,0.4)' }}
        >
          <Code2 size={22} className="text-white" />
        </div>
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-1">Current Role</div>
          <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Full Stack MERN Developer
          </h3>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">{about.bio}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'avatar',
    cols: 1,
    rows: 2,
    content: () => (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div
          className="w-32 h-32 rounded-2xl p-[3px]"
          style={{ background: 'linear-gradient(135deg, #9333ea, #06b6d4)', boxShadow: '0 0 30px rgba(147,51,234,0.5)' }}
        >
          <div
            className="w-full h-full rounded-[14px] flex items-center justify-center"
            style={{ background: '#080d1a' }}
          >
            <span className="text-4xl font-black" style={{ backgroundImage: 'linear-gradient(135deg, #c084fc, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: 'Outfit, sans-serif' }}>
              MM
            </span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Mohd Monish</div>
          <div
            className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Open to work
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'stats',
    cols: 1,
    rows: 1,
    content: () => (
      <div className="flex flex-col justify-center h-full gap-4">
        {[
          { label: 'Projects Shipped', value: '10+', color: '#c084fc' },
          { label: 'Years Coding', value: '3+', color: '#22d3ee' },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">{s.label}</span>
            <span className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Outfit, sans-serif', textShadow: `0 0 20px ${s.color}60` }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'location',
    cols: 1,
    rows: 1,
    content: () => (
      <div className="flex flex-col justify-between h-full">
        <MapPin size={22} style={{ color: '#c084fc' }} />
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Based In</div>
          <div className="text-white font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>India 🇮🇳</div>
          <div className="text-gray-500 text-xs mt-1">Remote Friendly</div>
        </div>
      </div>
    ),
  },
  {
    id: 'fun',
    cols: 1,
    rows: 1,
    content: () => (
      <div className="flex flex-col justify-between h-full">
        <Coffee size={22} style={{ color: '#22d3ee' }} />
        <div>
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Fun Fact</div>
          <div className="text-white font-semibold text-sm leading-relaxed">
            I code better after midnight ☕ and debug best with lo-fi music 🎵
          </div>
        </div>
      </div>
    ),
  },
]

const superpowers = [
  { icon: Zap, label: 'Responsive', desc: 'Pixel-perfect across all devices', color: '#c084fc' },
  { icon: Cpu, label: 'Design', desc: 'Modern, beautiful interfaces', color: '#22d3ee' },
  { icon: Rocket, label: 'Fast', desc: 'Performance-first development', color: '#f0abfc' },
  { icon: Brain, label: 'Logical', desc: 'Clean, scalable code', color: '#a3e635' },
]

export default function About() {
  const { state } = usePortfolio()
  const { about } = state

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(147,51,234,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="neon-tag mb-4 mx-auto w-fit">About Me</div>
          <h2 className="section-title">The Dev Behind The Code</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-divider"
        />

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`bento-card ${item.id === 'role' ? 'lg:col-span-2' : ''} ${item.id === 'avatar' ? 'lg:row-span-2' : ''} min-h-[160px]`}
            >
              <item.content about={about} />
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <a href={about.github} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2 text-sm py-2.5">
            <GithubIcon size={15} />
            GitHub
          </a>
          <a href={about.linkedin} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 text-sm py-2.5">
            <LinkedinIcon size={15} />
            LinkedIn
          </a>
          <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 text-sm py-2.5">
            <Download size={15} />
            Resume
          </a>
        </motion.div>

        {/* Superpowers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {superpowers.map(({ icon: Icon, label, desc, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card p-6 text-center flex flex-col items-center gap-3 transition-all duration-300"
              style={{ '--glow-color': color }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={24} style={{ color }} />
              </motion.div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
