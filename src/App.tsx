import { Route } from 'react-router-dom'
import { Routes, Navigate } from 'react-router'
import { AnimatedBackground } from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <div
        className="relative min-h-screen flex flex-col"
        style={{ zIndex: 10 }}
      >
        <Navbar />
        <main className="flex-1 flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <div className="h-12" />
        <Footer />
      </div>
    </>
  )
}
