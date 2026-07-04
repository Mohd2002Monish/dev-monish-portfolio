import React, { useEffect, useRef, useCallback } from 'react'

const PARTICLE_COUNT = 18
const COLORS = ['#c084fc', '#a855f7', '#22d3ee', '#e879f9', '#06b6d4']

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function CustomCursor() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const particles = useRef([])
  const rafRef = useRef(null)
  const isHovering = useRef(false)

  const spawnParticle = useCallback((x, y) => {
    particles.current.push({
      x,
      y,
      vx: rand(-1.8, 1.8),
      vy: rand(-2.5, 0.2),
      size: rand(3, 7),
      alpha: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      decay: rand(0.018, 0.035),
    })
    // Keep array from growing unbounded
    if (particles.current.length > 120) {
      particles.current.splice(0, particles.current.length - 120)
    }
  }, [])

  useEffect(() => {
    // Only enable on pointer-fine devices (no touch)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    const cursor = cursorRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let lastX = -200
    let lastY = -200
    let spawnThrottle = 0

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }

      // Spawn particles based on distance moved (not every frame)
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      spawnThrottle += dist
      if (spawnThrottle > 6) {
        spawnParticle(e.clientX, e.clientY)
        spawnThrottle = 0
      }
      lastX = e.clientX
      lastY = e.clientY
    }

    const onEnter = () => {
      isHovering.current = true
      cursor.classList.add('cursor-interactive')
    }
    const onLeave = () => {
      isHovering.current = false
      cursor.classList.remove('cursor-interactive')
    }

    const bindInteractives = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindInteractives()
    // Re-bind after any dynamic renders
    const observer = new MutationObserver(bindInteractives)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)

    // Animation loop
    const animate = () => {
      // Hardware-accelerated smooth cursor translation
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.alpha > 0.01)

      for (const p of particles.current) {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.beginPath()

        // Draw as a glowing sparkle diamond
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(Math.PI / 4)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.size * 3
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()

        ctx.restore()

        // Physics
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.07 // slight gravity
        p.size *= 0.97
        p.alpha -= p.decay
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [spawnParticle])

  // Don't render on touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />

      {/* Custom SVG crosshair cursor */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-svg"
        >
          {/* Outer rotating ring */}
          <circle
            cx="16"
            cy="16"
            r="13"
            stroke="rgba(192,132,252,0.35)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          {/* Inner ring */}
          <circle
            cx="16"
            cy="16"
            r="5"
            stroke="#c084fc"
            strokeWidth="1.5"
            fill="rgba(192,132,252,0.1)"
          />
          {/* Crosshair arms */}
          <line x1="16" y1="2"  x2="16" y2="9"  stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="23" x2="16" y2="30" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2"  y1="16" x2="9"  y2="16" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="23" y1="16" x2="30" y2="16" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
          {/* Center dot */}
          <circle cx="16" cy="16" r="2" fill="#c084fc" />
        </svg>
      </div>

      <style>{`
        * { cursor: none !important; }

        #custom-cursor .cursor-svg {
          filter: drop-shadow(0 0 6px rgba(192,132,252,0.8));
          animation: cursorSpin 6s linear infinite;
          transition: transform 0.15s ease;
        }

        #custom-cursor.cursor-interactive .cursor-svg {
          animation: cursorSpin 1.5s linear infinite;
          filter: drop-shadow(0 0 10px rgba(34,211,238,0.9));
          transform: scale(1.35);
        }

        #custom-cursor.cursor-interactive .cursor-svg circle:first-child {
          stroke: rgba(34,211,238,0.5);
        }
        #custom-cursor.cursor-interactive .cursor-svg circle:nth-child(2),
        #custom-cursor.cursor-interactive .cursor-svg circle:last-child,
        #custom-cursor.cursor-interactive .cursor-svg line {
          stroke: #22d3ee;
        }
        #custom-cursor.cursor-interactive .cursor-svg circle:last-child {
          fill: #22d3ee;
        }

        @keyframes cursorSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
