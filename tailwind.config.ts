import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
