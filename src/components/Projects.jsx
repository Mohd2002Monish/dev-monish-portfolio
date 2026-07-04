import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'
import FormattedDescription from './FormattedDescription'
import LivePreviewModal from './LivePreviewModal'

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
  const rotateX = useTransform(y, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} group`}
      style={{ width: '100%', height: '100%' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects() {
  const { state } = usePortfolio()
  const { projects } = state
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewTitle, setPreviewTitle] = useState('')

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleLiveClick = (e, project) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      e.preventDefault()
      setPreviewUrl(project.liveUrl)
      setPreviewTitle(project.title)
    }
  }

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
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <div className="neon-tag mb-4 mx-auto w-fit">Portfolio</div>
          <h2 className="section-title">Things I've Built</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
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
                  onMouseMove={handleMouseMove}
                  className="project-card spotlight-card flex flex-col h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '16/9', background: 'var(--admin-card-bg)' }}
                  >
                    <ProjectImage src={project.image} title={project.title} />

                    {/* Gradient shine on image */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.2) 0%, transparent 60%)' }}
                    />



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

                    {/* Footer buttons */}
                    <div
                      className="flex gap-3 pt-4 mt-auto"
                      style={{ borderTop: '1px solid var(--nav-border)' }}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => handleLiveClick(e, project)}
                          className="btn-primary flex items-center justify-center gap-1.5 text-xs py-2 px-4 flex-1"
                        >
                          <ExternalLink size={12} />
                          <span>Live</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-outline flex items-center justify-center gap-1.5 text-xs py-2 px-4 flex-1"
                        >
                          <GithubIcon size={12} />
                          <span>Code</span>
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
