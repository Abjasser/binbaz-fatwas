import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'Tahoma', 'Arial', 'sans-serif'],
      },
      colors: {
        cream: '#FDF8F0',
        parchment: '#F5ECD7',
        gold: {
          light: '#F0DFA8',
          DEFAULT: '#C9A84C',
          dark: '#A07D2E',
        },
        'dark-green': {
          light: '#2D6A4F',
          DEFAULT: '#1A472A',
          dark: '#0D2B1A',
        },
        brown: {
          light: '#8B6246',
          DEFAULT: '#5C3D2E',
          dark: '#3E2417',
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(201, 168, 76, 0.15), 0 1px 4px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(201, 168, 76, 0.25), 0 2px 8px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.2s ease-out forwards',
        'spin-slow': 'spin 1.2s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      lineHeight: {
        loose: '1.9',
      },
    },
  },
  plugins: [],
};

export default config;
