import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePortfolio } from '../context/PortfolioContext'

/* Subtle wireframe sculpture: two nested icosahedrons rotating in
   opposite directions, with vertex points, easing toward the mouse. */

function Sculpture({ wireColor, accentColor, reduceMotion }) {
  const rig = useRef()
  const outer = useRef()
  const inner = useRef()
  const points = useRef()

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.05, 1)
    return geo
  }, [])

  useFrame((state, delta) => {
    if (reduceMotion) return
    if (outer.current) {
      outer.current.rotation.y += delta * 0.08
      outer.current.rotation.x += delta * 0.03
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.05
      inner.current.rotation.z += delta * 0.02
    }
    if (points.current) {
      points.current.rotation.y += delta * 0.08
      points.current.rotation.x += delta * 0.03
    }
    if (rig.current) {
      // Ease the whole rig toward the pointer — subtle parallax
      rig.current.rotation.x += (state.pointer.y * 0.22 - rig.current.rotation.x) * 0.04
      rig.current.rotation.y += (state.pointer.x * 0.3 - rig.current.rotation.y) * 0.04
      // Gentle float
      rig.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
    }
  })

  return (
    <group ref={rig} scale={0.45}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial wireframe color={wireColor} transparent opacity={0.32} />
      </mesh>
      <points ref={points} geometry={pointsGeometry}>
        <pointsMaterial color={accentColor} size={0.045} transparent opacity={0.9} sizeAttenuation />
      </points>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial wireframe color={accentColor} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  const { theme } = usePortfolio()
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const wireColor = theme === 'light' ? '#171613' : '#8a8880'
  const accentColor = theme === 'light' ? '#e04300' : '#ff5c1a'

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 5.4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Sculpture
            wireColor={wireColor}
            accentColor={accentColor}
            reduceMotion={reduceMotion}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
