import React, { JSX } from 'react'

export default function Footer(): JSX.Element {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center font-mono text-xs tracking-widest uppercase text-[var(--color-text-muted)] border-t border-[var(--color-border)] backdrop-blur-sm bg-[var(--color-surface)] py-4 z-50">
      © 2026 Gerry Dunn.
    </footer>
  )
}
