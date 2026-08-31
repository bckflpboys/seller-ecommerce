/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        earth: {
          light: '#8B7355',
          DEFAULT: '#6F4E37',
          dark: '#5C4033'
        },
        sage: {
          light: '#FDE047',
          DEFAULT: '#FACC15',
          dark: '#EAB308'
        },
        navy: {
          50: '#F0F6FC',
          100: '#E1ECF9',
          200: '#C3DCF4',
          300: '#94C3EC',
          400: '#5CA4E2',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1D3557',
          800: '#112240',
          850: '#0D1B36',
          900: '#081225',
          950: '#040914',
        },
        cyanAccent: {
          light: '#67E8F9',
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
        },
        electricBlue: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'var(--font-nunito)', 'sans-serif'],
        display: ['Outfit', 'var(--font-quicksand)', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 2px 15px -3px rgba(111, 78, 55, 0.1), 0 10px 20px -2px rgba(111, 78, 55, 0.04)',
        'editorial': '0 20px 40px -15px rgba(8, 18, 37, 0.07), 0 1px 3px rgba(8, 18, 37, 0.05)',
        'card-hover': '0 30px 60px -15px rgba(8, 18, 37, 0.12), 0 0 1px 1px rgba(8, 18, 37, 0.05)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.3)',
        'glow-blue': '0 0 35px -5px rgba(37, 99, 235, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'texture': "url('data:image/svg+xml,...')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
