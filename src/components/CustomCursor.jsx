import React, { useEffect, useRef } from 'react'

/* Minimal precision cursor: a small dot that tracks instantly and a
   thin ring that eases behind it. On interactive elements the ring
   tightens into a crosshair-accented circle. No particles, no spin. */

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const pos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let raf = null

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const isInteractive = (el) =>
      el && el.closest && el.closest('a, button, [role="button"], input, textarea, select, label')

    const onOver = (e) => {
      if (isInteractive(e.target)) {
        ring.classList.add('x-cursor-hover')
        dot.classList.add('x-cursor-hover')
      }
    }
    const onOut = (e) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        ring.classList.remove('x-cursor-hover')
        dot.classList.remove('x-cursor-hover')
      }
    }

    const onDown = () => ring.classList.add('x-cursor-down')
    const onUp = () => ring.classList.remove('x-cursor-down')

    const animate = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div ref={dotRef} className="x-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="x-cursor-ring" aria-hidden="true" />

      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }

        .x-cursor-dot {
          position: fixed;
          left: 0;
          top: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--x-accent);
          pointer-events: none;
          z-index: 99999;
          transition: opacity 200ms ease;
        }
        .x-cursor-dot.x-cursor-hover {
          opacity: 0.35;
        }

        .x-cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid var(--x-faint);
          pointer-events: none;
          z-index: 99998;
          transition: width 250ms cubic-bezier(0.23,1,0.32,1),
                      height 250ms cubic-bezier(0.23,1,0.32,1),
                      border-color 250ms ease,
                      background-color 250ms ease;
        }
        .x-cursor-ring.x-cursor-hover {
          width: 44px;
          height: 44px;
          border-color: var(--x-accent);
          background: var(--x-accent-soft);
        }
        .x-cursor-ring.x-cursor-down {
          width: 22px;
          height: 22px;
        }
      `}</style>
    </>
  )
}
