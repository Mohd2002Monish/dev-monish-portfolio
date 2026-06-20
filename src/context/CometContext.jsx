import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'comet_settings'

export const DEFAULT_COMET_SETTINGS = {
  // Spawn
  spawnIntervalMin: 14,   // frames
  spawnIntervalMax: 42,

  // Motion
  speedMin: 1.2,          // px/frame
  speedMax: 3.0,

  // Appearance
  tailLenMin: 80,
  tailLenMax: 240,
  headRadiusMin: 1.5,
  headRadiusMax: 3.5,

  // Sparks
  sparkCount: 13,         // avg
  sparkEnabled: true,

  // Colour palette (which palettes are active)
  paletteViolet: true,
  paletteCyan: true,
  paletteFuchsia: true,
  paletteWhite: true,

  // Visibility
  enabled: true,
}

const CometContext = createContext(null)

export function CometProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...DEFAULT_COMET_SETTINGS, ...JSON.parse(stored) } : DEFAULT_COMET_SETTINGS
    } catch {
      return DEFAULT_COMET_SETTINGS
    }
  })

  // Persist every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const update = (patch) => setSettings(prev => ({ ...prev, ...patch }))
  const reset  = () => setSettings(DEFAULT_COMET_SETTINGS)

  return (
    <CometContext.Provider value={{ settings, update, reset }}>
      {children}
    </CometContext.Provider>
  )
}

export const useComet = () => {
  const ctx = useContext(CometContext)
  if (!ctx) throw new Error('useComet must be used inside CometProvider')
  return ctx
}
