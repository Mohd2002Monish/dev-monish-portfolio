/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#05080f',
          800: '#080d1a',
          700: '#0c1222',
          600: '#111929',
        },
        violet: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        fuchsia: {
          400: '#f0abfc',
          500: '#e879f9',
          600: '#d946ef',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        electric: {
          blue: '#3b82f6',
          lime: '#a3e635',
        },
        neon: {
          purple: '#bf00ff',
          cyan: '#00e5ff',
          pink: '#ff2d78',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-1': 'radial-gradient(at 40% 20%, hsla(270,70%,30%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,25%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,60%,20%,1) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out 2s infinite',
        'float-slow': 'float 10s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer-fast': 'shimmer 2s linear infinite',
        'bounce-subtle': 'bounceSub 2s ease-in-out infinite',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1.5deg)' },
          '66%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' },
          '100%': { boxShadow: '0 0 50px rgba(6, 182, 212, 0.6), 0 0 80px rgba(147, 51, 234, 0.3)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.7), 0 0 60px rgba(6, 182, 212, 0.4)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        bounceSub: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

