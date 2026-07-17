import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import FormattedDescription from './FormattedDescription'
import LivePreviewModal from './LivePreviewModal'
import SectionHeader from './SectionHeader'

const ease = [0.16, 1, 0.3, 1]

function ProjectImage({ src, title }) {
  const [errored, setErrored] = useState(false)
  if (errored || !src) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3"
        style={{ background: 'var(--x-surface-2)' }}
      >
        <span
          className="font-grotesk font-bold text-6xl"
          style={{ color: 'transparent', WebkitTextStroke: '1px var(--x-faint)' }}
        >
          {title?.charAt(0) || '?'}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--x-faint)' }}>
          {title}
        </span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      className="x-project-img w-full h-full object-cover"
      onError={() => setErrored(true)}
    />
  )
}

/* Subtle 3D tilt — max 3 degrees, spring-smoothed */
function TiltFrame({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ['3deg', '-3deg']), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ['-3deg', '3deg']), { stiffness: 200, damping: 25 })

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: '1200px' }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}

function ProjectRow({ project, index, flipped, onLiveClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* Image */}
      <div className={`lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`}>
        <TiltFrame>
          <div
            className="x-project-frame relative overflow-hidden"
            style={{ border: '1px solid var(--x-line)', borderRadius: '3px', aspectRatio: '16/10', background: 'var(--x-surface)' }}
          >
            <ProjectImage src={project.image} title={project.title} />
            {/* Mono corner tag */}
            <span
              className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.16em] px-2 py-1"
              style={{ background: 'var(--x-bg)', color: 'var(--x-muted)', border: '1px solid var(--x-line-soft)' }}
            >
              PRJ—{String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </TiltFrame>
      </div>

      {/* Content */}
      <div className={`lg:col-span-5 ${flipped ? 'lg:order-1' : ''}`}>
        <span className="font-mono text-xs" style={{ color: 'var(--x-accent)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className="font-grotesk font-bold mt-2 mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', letterSpacing: '-0.02em', color: 'var(--x-text)', lineHeight: 1.1 }}
        >
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map(tech => (
            <span key={tech} className="x-chip">{tech}</span>
          ))}
        </div>

        <FormattedDescription text={project.description} className="x-body text-sm mb-7" />

        <div className="flex items-center gap-7">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => onLiveClick(e, project)}
              className="x-link"
            >
              Live Site
              <ArrowUpRight size={12} className="x-link-arrow" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="x-link">
              Source
              <ArrowUpRight size={12} className="x-link-arrow" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { state } = usePortfolio()
  const { projects } = state
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewTitle, setPreviewTitle] = useState('')

  const handleLiveClick = (e, project) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      e.preventDefault()
      setPreviewUrl(project.liveUrl)
      setPreviewTitle(project.title)
    }
  }

  return (
    <section id="projects" className="x-section">
      <div className="x-container">
        <SectionHeader index="04" label="Selected Work" title="Things I've built" />

        <div className="flex flex-col gap-24">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              flipped={i % 2 === 1}
              onLiveClick={handleLiveClick}
            />
          ))}
        </div>
      </div>

      {previewUrl && (
        <LivePreviewModal
          url={previewUrl}
          title={previewTitle}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </section>
  )
}
