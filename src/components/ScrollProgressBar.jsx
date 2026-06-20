import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  // Spring smoothing so the bar glides rather than jerks
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        originX: 0,          // scale from the left edge
        scaleX,
        background: 'linear-gradient(90deg, #9333ea, #06b6d4, #d946ef)',
        boxShadow: '0 0 10px rgba(147,51,234,0.7), 0 0 20px rgba(6,182,212,0.4)',
        zIndex: 9999,
        borderRadius: '0 2px 2px 0',
      }}
    />
  )
}
