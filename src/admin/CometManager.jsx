import React from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Zap, Wind, Palette, Sparkles, ToggleLeft, ToggleRight } from 'lucide-react'
import { useComet, DEFAULT_COMET_SETTINGS } from '../context/CometContext'

// ─── Reusable slider row ─────────────────────────────────────────
function SliderRow({ label, settingKey, min, max, step = 0.1, unit = '', settings, update }) {
  const val = settings[settingKey]
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs text-gray-400 font-medium">{label}</label>
        <span className="text-xs font-mono text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded">
          {typeof val === 'number' ? val.toFixed(step < 1 ? 1 : 0) : val}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={e => update({ [settingKey]: parseFloat(e.target.value) })}
        className="w-full accent-violet-500 h-1.5 rounded-full cursor-pointer"
      />
    </div>
  )
}

// ─── Toggle row ──────────────────────────────────────────────────
function ToggleRow({ label, settingKey, settings, update, accent = 'violet' }) {
  const val = settings[settingKey]
  const colors = {
    violet:  'bg-violet-600',
    cyan:    'bg-cyan-500',
    fuchsia: 'bg-fuchsia-500',
    white:   'bg-gray-300',
  }
  return (
    <button
      onClick={() => update({ [settingKey]: !val })}
      className="flex items-center justify-between w-full py-1 px-0 group"
    >
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
      <div className={`w-9 h-5 rounded-full transition-all duration-200 flex items-center px-0.5 ${
        val ? colors[accent] : 'bg-white/10'
      }`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          val ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
    </button>
  )
}

// ─── Colour palette badge ────────────────────────────────────────
function PaletteBadge({ label, settingKey, colour, settings, update }) {
  const active = settings[settingKey]
  return (
    <button
      onClick={() => update({ [settingKey]: !active })}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-transparent text-white shadow-lg'
          : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
      }`}
      style={active ? { background: colour, boxShadow: `0 0 16px ${colour}60` } : {}}
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: colour }}
      />
      {label}
    </button>
  )
}

// ─── Section card ────────────────────────────────────────────────
function Section({ title, icon: Icon, children }) {
  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={15} className="text-violet-400" />
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      {children}
    </div>
  )
}

// ─── Main manager component ──────────────────────────────────────
export default function CometManager() {
  const { settings, update, reset } = useComet()

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Comet Settings</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Changes apply instantly — no page reload required.
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/10"
        >
          <RotateCcw size={12} />
          Reset defaults
        </button>
      </div>

      {/* Master toggle */}
      <Section title="Master Control" icon={Zap}>
        <ToggleRow
          label="Enable comets"
          settingKey="enabled"
          settings={settings}
          update={update}
        />
      </Section>

      {/* Frequency */}
      <Section title="Frequency" icon={Zap}>
        <SliderRow
          label="Min spawn interval (frames)"
          settingKey="spawnIntervalMin"
          min={5} max={120} step={1} unit=" f"
          settings={settings} update={update}
        />
        <SliderRow
          label="Max spawn interval (frames)"
          settingKey="spawnIntervalMax"
          min={10} max={300} step={1} unit=" f"
          settings={settings} update={update}
        />
        <p className="text-xs text-gray-600 mt-1">
          Lower = more frequent. At 60 fps, 60 frames ≈ 1 second.
        </p>
      </Section>

      {/* Speed */}
      <Section title="Speed" icon={Wind}>
        <SliderRow
          label="Min speed (px/frame)"
          settingKey="speedMin"
          min={0.2} max={10} step={0.1} unit=" px"
          settings={settings} update={update}
        />
        <SliderRow
          label="Max speed (px/frame)"
          settingKey="speedMax"
          min={0.5} max={20} step={0.1} unit=" px"
          settings={settings} update={update}
        />
      </Section>

      {/* Appearance */}
      <Section title="Appearance" icon={Sparkles}>
        <SliderRow
          label="Min tail length (px)"
          settingKey="tailLenMin"
          min={20} max={300} step={5} unit=" px"
          settings={settings} update={update}
        />
        <SliderRow
          label="Max tail length (px)"
          settingKey="tailLenMax"
          min={40} max={500} step={5} unit=" px"
          settings={settings} update={update}
        />
        <SliderRow
          label="Min head radius (px)"
          settingKey="headRadiusMin"
          min={0.5} max={6} step={0.5} unit=" px"
          settings={settings} update={update}
        />
        <SliderRow
          label="Max head radius (px)"
          settingKey="headRadiusMax"
          min={1} max={10} step={0.5} unit=" px"
          settings={settings} update={update}
        />
      </Section>

      {/* Sparks */}
      <Section title="Spark Burst" icon={Sparkles}>
        <ToggleRow
          label="Enable spark burst on exit"
          settingKey="sparkEnabled"
          settings={settings}
          update={update}
        />
        {settings.sparkEnabled && (
          <SliderRow
            label="Average spark count"
            settingKey="sparkCount"
            min={2} max={40} step={1} unit=" sparks"
            settings={settings} update={update}
          />
        )}
      </Section>

      {/* Colour palettes */}
      <Section title="Colour Palettes" icon={Palette}>
        <p className="text-xs text-gray-500 -mt-1">Toggle which colours can appear.</p>
        <div className="grid grid-cols-2 gap-2">
          <PaletteBadge
            label="Violet" settingKey="paletteViolet"
            colour="#c084fc" settings={settings} update={update}
          />
          <PaletteBadge
            label="Cyan" settingKey="paletteCyan"
            colour="#22d3ee" settings={settings} update={update}
          />
          <PaletteBadge
            label="Fuchsia" settingKey="paletteFuchsia"
            colour="#e879f9" settings={settings} update={update}
          />
          <PaletteBadge
            label="White" settingKey="paletteWhite"
            colour="#e2e8f0" settings={settings} update={update}
          />
        </div>
        {!settings.paletteViolet && !settings.paletteCyan && !settings.paletteFuchsia && !settings.paletteWhite && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
          >
            ⚠ At least one colour must be active for comets to appear.
          </motion.p>
        )}
      </Section>

    </div>
  )
}
