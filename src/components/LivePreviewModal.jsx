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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-md cursor-none"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-6xl h-[80vh] flex flex-col rounded-2xl border border-white/10 bg-[#080d1a]/95 shadow-2xl overflow-hidden z-10"
        >
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1527] border-b border-white/5 select-none">
            {/* macOS Dot Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center group cursor-none"
              >
                <X size={8} className="text-rose-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            </div>

            {/* URL/Address Bar */}
            <div className="flex-1 max-w-xl mx-4 flex items-center gap-2 px-4 py-1.5 rounded-lg bg-navy-900/60 border border-white/5 text-gray-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <input
                type="text"
                readOnly
                value={url}
                className="w-full bg-transparent border-0 outline-none text-gray-400 cursor-text select-all"
              />
            </div>

            {/* Window Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                title="Reload page"
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-none"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                title="Open in new tab"
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-none flex items-center justify-center"
              >
                <ExternalLink size={14} />
              </a>
              <button
                onClick={onClose}
                title="Close"
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-400 transition-colors cursor-none flex items-center justify-center"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Iframe Content Panel */}
          <div className="relative flex-1 bg-navy-950 w-full h-full overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#080d1a]/90 z-20">
                <Loader2 size={28} className="text-violet-400 animate-spin" />
                <span className="text-gray-400 text-xs tracking-wider uppercase font-medium">Connecting to {title}...</span>
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
