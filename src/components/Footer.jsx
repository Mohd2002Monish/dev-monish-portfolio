import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Zap, Heart, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'
import logo from '../assets/logo.png'

export default function Footer() {
  const { state } = usePortfolio()
  const { about } = state

  const socials = [
    { href: about.github, icon: GithubIcon, label: 'GitHub', color: '#c084fc' },
    { href: about.linkedin, icon: LinkedinIcon, label: 'LinkedIn', color: '#22d3ee' },
    { href: about.instagram, icon: InstagramIcon, label: 'Instagram', color: '#f0abfc' },
    { href: about.facebook, icon: FacebookIcon, label: 'Facebook', color: '#60a5fa' },
    { href: `mailto:${about.email}`, icon: Mail, label: 'Email', color: '#4ade80' },
  ]

  return (
    <footer
      className="relative overflow-hidden pt-12 pb-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(147,51,234,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-7">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-9 h-9 object-contain rounded-lg"
              style={{
                boxShadow: '0 0 15px rgba(147,51,234,0.3)',
              }}
            />
            <span
              className="font-black text-white text-xl tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Mohd<span style={{ color: '#c084fc' }}>.</span>
            </span>
          </motion.a>

          {/* Tagline */}
          <p className="text-gray-600 text-sm text-center max-w-xs">
            Building the web, one commit at a time. Open to collabs and cool projects.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, icon: Icon, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#6b7280' }}
                whileHover={{ y: -5, scale: 1.1, color, boxShadow: `0 0 20px ${color}40`, borderColor: `${color}50` }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(sec => (
              <a
                key={sec}
                href={`#${sec.toLowerCase()}`}
                className="hover:text-white transition-colors font-medium"
              >
                {sec}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} />

          {/* Copyright + Back to top */}
          <div className="flex items-center justify-between w-full flex-wrap gap-4">
            <p className="text-gray-600 text-xs flex items-center gap-1.5">
              Made with <Heart size={11} className="text-red-500 fill-red-500" /> by Mohd Monish © {new Date().getFullYear()}
            </p>
            <motion.a
              href="#home"
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-white transition-colors group"
              whileHover={{ y: -2 }}
            >
              Back to top
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}
