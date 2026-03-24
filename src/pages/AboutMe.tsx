import { JSX, useState, useEffect, useRef } from 'react'

const technologies = [
  {
    name: 'Git',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/git.png',
  },
  {
    name: 'HTML',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png',
  },
  {
    name: 'CSS',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png',
  },
  {
    name: 'Tailwind',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png',
  },
  {
    name: 'Figma',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/figma.png',
  },
  {
    name: 'JavaScript',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png',
  },
  {
    name: 'TypeScript',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png',
  },
  {
    name: 'React',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png',
  },
  {
    name: 'Next.js',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png',
  },
  {
    name: 'Node.js',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png',
  },
  {
    name: 'Express',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/express.png',
  },
  {
    name: 'NestJS',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nest_js.png',
  },
  {
    name: 'Python',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/python.png',
  },
  {
    name: 'Vite',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vite.png',
  },
  {
    name: 'SQLite',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/sqlite.png',
  },
  {
    name: 'PostgreSQL',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png',
  },
  {
    name: 'MySQL',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mysql.png',
  },
  {
    name: 'MongoDB',
    src: 'https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mongodb.png',
  },
]

export default function AboutMe(): JSX.Element {
  const [floating, setFloating] = useState(false)
  const [translateY, setTranslateY] = useState(0)
  const animFrameRef = useRef<number>(null)
  const startTimeRef = useRef<number>(null)
  const exitStartRef = useRef<{ y: number; time: number } | null>(null)

  const currentYRef = useRef(0)

  useEffect(() => {
    if (floating) {
      exitStartRef.current = null

      const animate = (now: number) => {
        if (!startTimeRef.current) startTimeRef.current = now
        const t = (now - startTimeRef.current) / 3000
        const y = -12 * Math.sin(t * Math.PI * 2)
        currentYRef.current = y
        setTranslateY(y)
        animFrameRef.current = requestAnimationFrame(animate)
      }

      animFrameRef.current = requestAnimationFrame(animate)
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

      const fromY = currentYRef.current
      const duration = 800
      exitStartRef.current = { y: fromY, time: performance.now() }

      const easeOut = (now: number) => {
        if (!exitStartRef.current) return
        const elapsed = now - exitStartRef.current.time
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const y = fromY * (1 - eased)
        currentYRef.current = y
        setTranslateY(y)
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(easeOut)
        }
      }

      animFrameRef.current = requestAnimationFrame(easeOut)
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [floating])

  return (
    <div className="w-full px-8 py-20 max-w-3xl mx-auto text-[var(--color-text)]">
      {/* Portrait */}
      <div className="flex justify-center mb-10">
        <img
          src="/images/AboutMe/TransparentCommissionGerrySplitFace.png"
          alt="Gerry Dunn"
          className="w-64 sm:w-72 md:w-80 lg:w-96"
          style={{ transform: `translateY(${translateY}px)` }}
          onMouseEnter={() => setFloating(true)}
          onMouseLeave={() => setFloating(false)}
        />
      </div>

      {/* Heading */}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-6">
        About Me
      </h2>
      <hr className="border-[var(--color-accent)]/40 w-16 mx-auto mb-8" />

      {/* Bio */}
      <p className="font-mono text-sm md:text-base leading-relaxed text-[var(--color-text-muted)] text-center mb-16">
        I'm a junior full stack engineer based in Auckland who works across the
        stack but feels most at home on the front end. People gravitate toward
        designs that look and feel good to use, and building interfaces that
        achieve that is something I find genuinely interesting.
      </p>
      <p className="font-mono text-sm md:text-base leading-relaxed text-[var(--color-text-muted)] text-center mb-16">
        I trained at Dev Academy's full stack bootcamp and have since gained
        commercial experience as an intern. I enjoy the full journey of building
        something, from figuring out the architecture to nailing the small
        details that make an interface feel right.
      </p>

      <p className="font-mono text-sm md:text-base leading-relaxed text-[var(--color-text-muted)] text-center mb-16">
        Outside of coding I've played guitar most of my life, I'm into tabletop
        and PC games, and I'm generally drawn to things with a bit of creative
        grit to them. I think that comes through in how I work. I like building
        things that have character.
      </p>

      {/* Technologies */}
      <p className="font-mono text-lg tracking-[0.3em] uppercase text-[var(--color-accent)] text-center mb-8">
        Technologies
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center gap-2 w-16"
          >
            <img
              src={tech.src}
              alt={`${tech.name} logo`}
              className="w-10 h-10 object-contain transition-transform duration-200 hover:scale-110"
            />
            <p className="font-mono text-xs text-[var(--color-text-muted)] text-center">
              {tech.name}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[var(--color-border)] mt-20" />
    </div>
  )
}
