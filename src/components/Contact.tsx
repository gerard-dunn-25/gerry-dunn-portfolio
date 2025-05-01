import React, { JSX } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { GrDocument } from 'react-icons/gr'

export default function Contact(): JSX.Element {
  return (
    <section className="h-[calc(90vh-100px)] flex flex-col justify-center items-center text-white text-center">
      <h2 className="text-4xl md:text-6xl font-bold pb-20">Contact Me:</h2>
      <div className="flex flex-row gap-6">
        <a href="">
          <GrDocument className="text-6xl hover:text-yellow-400 transition-colors hover:scale-110 transition-transform duration-200" />
        </a>
        <h2 className="text-4xl font-bold pb-20">Resume</h2>
      </div>
      <div className="flex flex-col justify-center gap-6 text-3xl">
        <div className="flex flex-row gap-6">
          <a href="mailto:gerard.dunn.92@gmail.com" aria-label="Email">
            <MdEmail className="text-6xl hover:text-red-400 transition-colors hover:scale-110 transition-transform duration-200" />
          </a>
          <h2 className="text-4xl font-bold pb-14">Email</h2>
        </div>
        <div className="flex flex-row gap-6">
          <a
            href="https://www.linkedin.com/in/gerry-dunn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-6xl hover:text-blue-400 transition-colors hover:scale-110 transition-transform duration-200" />
          </a>
          <h2 className="text-4xl font-bold pb-14">LinkedIn</h2>
        </div>
        <div className="flex flex-row gap-6">
          <a
            href="https://github.com/gerard-dunn-25"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-6xl hover:text-green-400 transition-colors hover:scale-110 transition-transform duration-200" />
          </a>
          <h2 className="text-4xl font-bold pb-14">Github</h2>
        </div>
      </div>
    </section>
  )
}
