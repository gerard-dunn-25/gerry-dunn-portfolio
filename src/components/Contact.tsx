import React, { JSX } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Contact(): JSX.Element {
  return (
    <section className="text-center mt-12 text-white">
      <h2 className="text-4xl font-bold text-center text-white pb-8">
        Contact Me
      </h2>
      <div className="flex justify-center gap-6 text-3xl">
        <a href="mailto:gerard.dunn.92@gmail.com" aria-label="Email">
          <MdEmail className="text-6xl hover:text-red-400 transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/gerry-dunn/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-6xl hover:text-blue-400 transition-colors" />
        </a>
        <a
          href="https://github.com/gerard-dunn-25"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="text-6xl hover:text-green-400 transition-colors" />
        </a>
      </div>
    </section>
  )
}
