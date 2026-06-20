import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'
import FormattedDescription from './FormattedDescription'

function ProjectImage({ src, title }) {
  const [errored, setErrored] = useState(false)
  if (errored || !src) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3"
        style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(6,182,212,0.1))' }}
      >
        <div
          className="text-5xl font-black opacity-30 select-none"
          style={{ fontFamily: 'Outfit, sans-serif', backgroundImage: 'linear-gradient(135deg, #c084fc, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          {title?.charAt(0) || '?'}
        </div>
        <span className="text-gray-600 text-xs font-medium">{title}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
      onError={() => setErrored(true)}
    />
  )
}

function TiltCard({ children, className }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects() {
  const { state } = usePortfolio()
  const { projects } = state

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(147,51,234,0.07) 0%, transparent 55%)' }}
      />
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="neon-tag mb-4 mx-auto w-fit">Portfolio</div>
          <h2 className="section-title">Things I've Built</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-divider"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <TiltCard className="h-full">
                <div
                  className="project-card group flex flex-col h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '16/9', background: '#080d1a' }}
                  >
                    <ProjectImage src={project.image} title={project.title} />

                    {/* Gradient shine on image */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.2) 0%, transparent 60%)' }}
                    />

                    {/* Hover overlay with CTA buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5 gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary flex items-center gap-1.5 text-xs py-2 px-4"
                        >
                          <ExternalLink size={12} />
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-outline flex items-center gap-1.5 text-xs py-2 px-4"
                        >
                          <GithubIcon size={12} />
                          Code
                        </a>
                      )}
                    </div>

                    {/* Neon corner accent */}
                    <div
                      className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: '#c084fc', boxShadow: '0 0 12px rgba(192,132,252,0.9)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col gap-3" style={{ transform: 'translateZ(20px)' }}>
                    <h3
                      className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {project.title}
                    </h3>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                          style={{
                            background: 'rgba(147,51,234,0.1)',
                            border: '1px solid rgba(147,51,234,0.2)',
                            color: '#c084fc',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <FormattedDescription text={project.description} className="text-gray-400 text-sm flex-1 leading-relaxed" />

                    {/* Footer links */}
                    <div
                      className="flex gap-4 pt-3"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                          style={{ color: '#22d3ee' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#67e8f9'}
                          onMouseLeave={e => e.currentTarget.style.color = '#22d3ee'}
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors font-medium"
                        >
                          <GithubIcon size={13} />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
