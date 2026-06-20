import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons'
import heroBg from '../assets/hero-bg.png'

const codeBubbles = [
  { text: 'const dev = "Monish" 🚀', top: '18%', left: '5%', delay: 0.2, duration: 7 },
  { text: 'npm run dev ✨', top: '72%', left: '3%', delay: 1.5, duration: 9 },
  { text: 'git push -u origin main', top: '28%', right: '4%', delay: 0.8, duration: 8 },
  { text: '// TODO: Ship it 🔥', top: '65%', right: '3%', delay: 2, duration: 6 },
]

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Base Dark Background with subtle minimal ambient glows ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 25%, rgba(147,51,234,0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 75%, rgba(6,182,212,0.05) 0%, transparent 60%), #05080f',
        }}
      />

      {/* ── Generated Premium Abstract BG Image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-screen"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      {/* ── Soft, Minimal floating orbs (lowered opacity for elegance) ── */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="orb orb-1 opacity-5" style={{ filter: 'blur(120px)' }} />
        <div className="orb orb-2 opacity-5" style={{ filter: 'blur(120px)' }} />
      </motion.div>

      {/* ── Subtle Dot grid overlay ── */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* ── Floating code bubbles ── */}
      {codeBubbles.map((b, i) => (
        <motion.div
          key={i}
          className="code-bubble hidden lg:block"
          style={{ top: b.top, left: b.left, right: b.right }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { delay: b.delay + 0.5, duration: 0.6 },
            y: { delay: b.delay, duration: b.duration, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {b.text}
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16"
      >
        <div className="flex flex-col items-center text-center gap-7">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(147,51,234,0.12)',
              border: '1px solid rgba(147,51,234,0.35)',
              color: '#c084fc',
              boxShadow: '0 0 20px rgba(147,51,234,0.2)',
            }}
          >
            <Sparkles size={13} className="text-fuchsia-400" />
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-black leading-none tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              <span className="block text-white">Hi, I'm</span>
              <span
                className="block"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f0abfc 0%, #a855f7 35%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.4))',
                }}
              >
                Mohd Monish
              </span>
            </h1>
          </motion.div>

          {/* Typed role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-gray-300"
          >
            <span className="text-gray-500">{'<'}</span>
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2200,
                'MERN Stack Expert',
                2200,
                'React Enthusiast',
                2200,
                'Open Source Builder',
                2200,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{
                backgroundImage: 'linear-gradient(90deg, #c084fc, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                minWidth: '260px',
                display: 'inline-block',
              }}
            />
            <span className="text-gray-500">{'/>'}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            Crafting beautiful, fast web experiences with modern tech.
            If you need a killer website,{' '}
            <a
              href="mailto:mohd2002monish@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline underline-offset-4 decoration-cyan-400/30"
            >
              let's talk
            </a>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap justify-center gap-4 mt-2"
          >
            <motion.a
              href="#projects"
              className="btn-primary text-base px-8 py-3.5 flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <ArrowDown size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-outline text-base px-8 py-3.5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4 mt-3"
          >
            {[
              { href: 'https://github.com/Mohd2002Monish', icon: GithubIcon, label: 'GitHub', color: '#c084fc' },
              { href: 'https://www.linkedin.com/in/mohd2002monish/', icon: LinkedinIcon, label: 'LinkedIn', color: '#22d3ee' },
              { href: 'https://www.instagram.com/mohdmonish__/', icon: InstagramIcon, label: 'Instagram', color: '#f0abfc' },
              { href: 'mailto:mohd2002monish@gmail.com', icon: Mail, label: 'Email', color: '#c084fc' },
            ].map(({ href, icon: Icon, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-gray-400 transition-all duration-200"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ '--hover-color': color }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}60`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.boxShadow = `0 0 20px ${color}40`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.color = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap justify-center gap-10 mt-6 pt-8 w-full max-w-md"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {[
              { value: '3+', label: 'Years Exp.' },
              { value: '10+', label: 'Projects' },
              { value: 'MERN', label: 'Stack' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + i * 0.1, duration: 0.5 }}
              >
                <div className="stat-number">{value}</div>
                <div className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors group"
          >
            <span className="text-xs tracking-[0.3em] uppercase font-medium">Scroll</span>
            <div
              className="w-6 h-10 rounded-full flex items-start justify-center pt-2 group-hover:border-violet-500/50 transition-colors"
              style={{ border: '1.5px solid rgba(255,255,255,0.12)' }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-violet-400"
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              />
            </div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
