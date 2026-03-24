import { JSX } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { GrDocument } from 'react-icons/gr'

const links = [
  {
    label: 'Resume',
    href: '/Gerard Dunn CV 2026.pdf',
    icon: GrDocument,
    hoverClass: 'hover:text-[#c49a35]',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:gerard.dunn.92@gmail.com',
    icon: MdEmail,
    hoverClass: 'hover:text-red-400',
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gerry-dunn/',
    icon: FaLinkedin,
    hoverClass: 'hover:text-blue-400',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/gerard-dunn-25',
    icon: FaGithub,
    hoverClass: 'hover:text-green-400',
    external: true,
  },
]

export default function Contact(): JSX.Element {
  return (
    <section
      className="flex flex-col items-center w-full"
      style={{ height: 'calc(100dvh - 340px)' }}
    >
      <div className="pt-20">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4 text-center">
          Contact
        </h2>
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] mb-2 text-center">
          Get In Touch
        </p>
        <hr className="border-[var(--color-accent)]/40 w-16 mx-auto mb-12" />
      </div>

      <div className="flex flex-col gap-6 flex-1 justify-center">
        {links.map(({ label, href, icon: Icon, hoverClass, external }) => (
          <a
            key={label}
            href={href}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            aria-label={label}
            className={`flex items-center gap-4 text-[var(--color-text-muted)] ${hoverClass} transition-colors duration-200 group`}
          >
            <Icon className="text-3xl transition-transform duration-200 group-hover:scale-110" />
            <span className="font-mono text-lg tracking-widest uppercase">
              {label}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
