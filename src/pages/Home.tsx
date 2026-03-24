import { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-start relative overflow-hidden pt-16 md:pt-24">
      <section className="flex flex-col items-center text-center px-8">
        <p className="font-mono text-sm tracking-[0.3em] uppercase text-[var(--color-accent)] mb-4">
          Fullstack Software Engineer
        </p>
        <h1 className="font-serif text-5xl md:text-8xl font-bold text-[var(--color-text)] mb-3 leading-tight">
          Gerry Dunn
        </h1>
      </section>
    </div>
  )
}
