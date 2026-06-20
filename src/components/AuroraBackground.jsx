import React, { useEffect, useRef } from 'react'

const BLOBS = [
  {
    xFactor: 0.25,
    yFactor: 0.35,
    baseRadius: 0.45,
    color: 'rgba(147, 51, 234, 0.08)', // Purple
    speedX: 0.0003,
    speedY: 0.0004,
    phaseX: 0,
    phaseY: Math.PI / 4,
    scrollFactor: -0.15
  },
  {
    xFactor: 0.75,
    yFactor: 0.25,
    baseRadius: 0.5,
    color: 'rgba(6, 182, 212, 0.07)', // Cyan
    speedX: 0.0002,
    speedY: 0.0003,
    phaseX: Math.PI / 2,
    phaseY: 0,
    scrollFactor: -0.08
  },
  {
    xFactor: 0.3,
    yFactor: 0.75,
    baseRadius: 0.55,
    color: 'rgba(217, 70, 239, 0.06)', // Fuchsia
    speedX: 0.0004,
    speedY: 0.0002,
    phaseX: Math.PI,
    phaseY: Math.PI / 3,
    scrollFactor: -0.2
  },
  {
    xFactor: 0.8,
    yFactor: 0.8,
    baseRadius: 0.4,
    color: 'rgba(79, 70, 229, 0.05)', // Indigo
    speedX: 0.00015,
    speedY: 0.00025,
    phaseX: Math.PI / 6,
    phaseY: Math.PI / 2,
    scrollFactor: -0.12
  }
]

export default function AuroraBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = null
    let time = 0
    let scrollY = 0

    // Mouse tracking with inertia
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0
    }

    const resize = () => {
      canvas.width = window.innerWidth * 0.8 // Downscale canvas size for graphics performance, CSS blur handles scaling
      canvas.height = window.innerHeight * 0.8
    }

    const onScroll = () => {
      scrollY = window.scrollY
    }

    const onMouseMove = (e) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      mouse.targetX = (e.clientX / window.innerWidth) - 0.5
      mouse.targetY = (e.clientY / window.innerHeight) - 0.5
    }

    const draw = () => {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      time += 0.16

      // Lerp mouse position for smooth lag effect
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05

      BLOBS.forEach((blob) => {
        // Compute base position with time-based organic drift
        const dx = Math.sin(time * blob.speedX + blob.phaseX) * 0.1
        const dy = Math.cos(time * blob.speedY + blob.phaseY) * 0.1

        // Parallax scroll effect
        const scrollOffset = scrollY * blob.scrollFactor

        // Interactive mouse push
        const mouseOffsetX = mouse.currentX * 120
        const mouseOffsetY = mouse.currentY * 120

        // Calculate absolute pixel position
        const cx = (blob.xFactor + dx) * w + mouseOffsetX
        const cy = (blob.yFactor + dy) * h + scrollOffset + mouseOffsetY

        // Calculate size based on viewport
        const radius = blob.baseRadius * Math.min(w, h)

        // Draw soft radial gradient blob
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: '-10%',
        width: '120%',
        height: '120%',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(80px) saturate(1.4)',
        opacity: 0.85,
        backgroundColor: 'transparent'
      }}
    />
  )
}
