import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px #22d3ee)' },
          '50%': { filter: 'drop-shadow(0 0 20px #22d3ee)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
      },
      colors: {
        dark: '#121212',
        grayish: '#1e1e1e',
      },
      fontFamily: {
        futuristic: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
