/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        sun: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706'
        },
        mint: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669'
        },
        coral: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c'
        }
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(30, 64, 175, 0.18)',
        card: '0 4px 0 0 rgba(0,0,0,0.06)',
        pop: '0 8px 0 0 rgba(0,0,0,0.10)'
      },
      borderRadius: {
        blob: '2rem 2.5rem 2rem 2.5rem'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        pop: {
          '0%': { transform: 'scale(.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        }
      },
      animation: {
        float: 'float 3.2s ease-in-out infinite',
        wiggle: 'wiggle 1.6s ease-in-out infinite',
        pop: 'pop .25s ease-out both',
        slideUp: 'slideUp .35s ease-out both',
        shimmer: 'shimmer 2s linear infinite'
      }
    }
  },
  plugins: [
    function({ addComponents, addUtilities }) {
      addComponents({
        '.dark-btn': {
          '@apply text-slate-400 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900': {}
        }
      })
      addUtilities({
        '.prose dark:prose': {
          '@apply prose': {},
          '& h1': { '@apply text-2xl font-bold text-slate-800 dark:text-slate-100': {} },
          '& h2': { '@apply text-2xl font-bold text-slate-800 dark:text-slate-100': {} },
          '& h3': { '@apply font-semibold text-slate-600 dark:text-slate-300': {} },
          '& a': { '@apply text-brand-600 dark:text-brand-400 underline': {} },
          '& code': { '@apply bg-slate-100 dark:bg-slate-800 rounded px-1.5 text-sm': {} }
        }
      })
    }
  ]
}