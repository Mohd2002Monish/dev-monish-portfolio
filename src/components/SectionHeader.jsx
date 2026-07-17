import React from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function SectionHeader({ index, label, title }) {
  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease }}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <div className="x-label mb-4">
            <span className="x-label-index">{index}</span>
            <span style={{ color: 'var(--x-faint)' }}>/</span>
            {label}
          </div>
          <h2 className="x-h2">{title}</h2>
        </div>
        <span className="x-ghost-index hidden lg:block">{index}</span>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="x-hairline mt-10"
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}
