import React, { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'

export default function NumberTicker({ value, direction = "up", delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const target = parseInt(value, 10)
  const motionValue = useMotionValue(direction === "down" ? target : 0)
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
  })
  const displayValue = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(target)
      }, delay * 1000)
    }
  }, [isInView, target, motionValue, delay])

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest + (value.includes('+') ? '+' : '')
      }
    })
  }, [displayValue, value])

  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'Outfit, sans-serif',
        fontVariantNumeric: 'tabular-nums', // keeps numbers from shifting layout
      }}
    >
      {direction === "down" ? target : 0}
      {value.includes('+') ? '+' : ''}
    </span>
  )
}
