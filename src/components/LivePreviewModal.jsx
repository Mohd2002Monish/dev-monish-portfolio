import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, ExternalLink, Loader2 } from 'lucide-react'

export default function LivePreviewModal({ url, title, onClose }) {
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(0)

  // Disable page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!url) return null

  const handleRefresh = () => {
    setLoading(true)
    setKey((prev) => prev + 1)
  }

  const iconBtnStyle = {
    color: 'var(--x-muted)',
    border: '1px solid var(--x-line-soft)',
    borderRadius: '2px',
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: 'color-mix(in srgb, var(--x-bg) 80%, transparent)' }}
        />

        {/* Modal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden z-10"
          style={{ background: 'var(--x-surface)', border: '1px solid var(--x-line)', borderRadius: '3px' }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 select-none"
            style={{ borderBottom: '1px solid var(--x-line-soft)' }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] hidden sm:block" style={{ color: 'var(--x-faint)' }}>
              Preview — {title}
            </span>

            {/* Address bar */}
            <div
              className="flex-1 max-w-xl flex items-center gap-2 px-3 py-1.5 font-mono text-xs"
              style={{ border: '1px solid var(--x-line-soft)', borderRadius: '2px', color: 'var(--x-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--x-accent)' }} />
              <input
                type="text"
                readOnly
                value={url}
                className="w-full bg-transparent border-0 outline-none select-all"
                style={{ color: 'var(--x-muted)' }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={handleRefresh} title="Reload page" className="p-1.5" style={iconBtnStyle}>
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              </button>
              <a href={url} target="_blank" rel="noreferrer" title="Open in new tab" className="p-1.5 flex items-center justify-center" style={iconBtnStyle}>
                <ExternalLink size={13} />
              </a>
              <button onClick={onClose} title="Close" className="p-1.5 flex items-center justify-center" style={iconBtnStyle}>
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div className="relative flex-1 w-full h-full overflow-hidden" style={{ background: 'var(--x-bg)' }}>
            {loading && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20"
                style={{ background: 'var(--x-surface)' }}
              >
                <Loader2 size={24} className="animate-spin" style={{ color: 'var(--x-accent)' }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--x-muted)' }}>
                  Connecting to {title}…
                </span>
              </div>
            )}
            <iframe
              key={key}
              src={url}
              title={title}
              onLoad={() => setLoading(false)}
              className="w-full h-full border-none bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
