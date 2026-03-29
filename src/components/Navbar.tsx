import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from 'next-themes'
import { FaBars, FaTimes } from 'react-icons/fa'

const links = [
  { label: 'Home', to: '/home' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex items-center gap-3 shrink-0">
      <span className="font-mono text-xs uppercase tracking-widest opacity-60 text-[var(--color-text)]">
        {isDark ? 'Dark' : 'Light'}
      </span>
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle theme"
        className="relative w-13 h-7 rounded-full border border-[var(--color-accent)] opacity-70 transition-all duration-400 cursor-pointer text-[var(--color-accent)]"
      >
        <span
          className="absolute w-4 h-4 rounded-full bg-[var(--color-accent)] transition-transform duration-400"
          style={{
            top: '50%',
            left: '4px',
            transform: `translateY(-50%) translateX(${isDark ? 'calc(3.25rem - 1rem - 10px)' : '0'})`,
          }}
        />
      </button>
    </div>
  )
}

function NavItem({
  label,
  to,
  onClick,
}: {
  label: string
  to: string
  onClick?: () => void
}) {
  const { pathname } = useLocation()
  const isActive = pathname === to

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`relative py-1 group focus-visible:outline focus-visible:outline-[var(--color-accent)] whitespace-nowrap transition-colors duration-300 ${
        isActive
          ? 'text-[var(--color-accent)]'
          : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
      }`}
    >
      {label}

      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />

      <span
        className={`absolute -left-3 top-1/2 -translate-y-1/2 text-[var(--color-accent)] font-mono text-xs transition-all duration-200 ${
          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
        }`}
      >
        [
      </span>

      <span
        className={`absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--color-accent)] font-mono text-xs transition-all duration-200 ${
          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'
        }`}
      >
        ]
      </span>
    </NavLink>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] backdrop-blur-sm bg-[var(--color-surface)]">
        {/* Main bar */}
        <div className="flex items-center justify-between px-8 py-4">
          {/* Invisible spacer to balance the toggle */}
          <div className="hidden md:block w-32 shrink-0" />

          {/* Desktop links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8 sm:gap-12 md:gap-16 font-mono tracking-widest uppercase text-sm md:text-base">
            {links.map(({ label, to }) => (
              <NavItem key={to} label={label} to={to} />
            ))}
          </div>

          {/* Mobile hamburger menu & Darkmode toggle */}
          <button
            className="md:hidden text-[var(--color-text)] text-xl cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-6 px-8 py-6 border-t border-[var(--color-border)] font-mono tracking-widest uppercase text-sm">
            {links.map(({ label, to }) => (
              <NavItem
                key={to}
                label={label}
                to={to}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  )
}
