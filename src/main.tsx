import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
