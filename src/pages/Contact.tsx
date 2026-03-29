import { JSX, useState } from 'react'
import { MdEmail, MdContentCopy, MdCheck } from 'react-icons/md'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { GrDocument } from 'react-icons/gr'

const EMAIL = 'gerard.dunn.92@gmail.com'

const links = [
  {
    label: 'Resume',
    href: '/Gerard Dunn CV 2026.pdf',
    icon: GrDocument,
    hoverClass: 'hover:text-[#c49a35]',
    external: true,
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
  {
    label: 'Email',
    href: 'mailto:gerard.dunn.92@gmail.com',
    icon: MdEmail,
    hoverClass: 'hover:text-red-400',
    external: false,
  },
]

export default function Contact(): JSX.Element {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section
      className="flex flex-col items-center w-full"
      style={{ height: 'calc(100dvh - 340px)' }}
    >
      <div className="pt-20 w-full max-w-md mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-10 text-center">
          Contact
        </h2>

        <div className="border border-[var(--color-border)] rounded-xl px-10 py-6 bg-[var(--color-card)] backdrop-blur-sm">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-accent)] mb-6 text-center">
            Get In Touch
          </p>
          <hr className="border-[var(--color-accent)]/40 w-16 mx-auto mb-2" />

          <div className="flex items-center justify-center gap-2 mb-6 mt-6">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-accent)]">
              {EMAIL}
            </p>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="text-[var(--color-accent)] opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            >
              {copied ? (
                <MdCheck className="text-sm" />
              ) : (
                <MdContentCopy className="text-sm" />
              )}
            </button>
          </div>

          <hr className="border-[var(--color-accent)]/40 w-16 mx-auto mb-8" />

          <div className="flex flex-col gap-6 items-center">
            {links.map(({ label, href, icon: Icon, hoverClass, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                aria-label={label}
                className={`flex items-center gap-4 w-40 text-[var(--color-text)] ${hoverClass} transition-colors duration-200 group`}
              >
                <Icon className="text-3xl transition-transform duration-200 group-hover:scale-110 shrink-0" />
                <span className="font-mono text-lg tracking-widest uppercase">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
