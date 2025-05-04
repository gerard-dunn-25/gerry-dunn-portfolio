import React, { JSX } from 'react'

export default function Navbar(): JSX.Element {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white text-white">
      <img
        className="w-[15%] md:w-[5%] hover:scale-110 transition-transform duration-200"
        src="/images/Home/GD-logo.png"
        alt="logo of initials for Gerry Dunn"
      />
      <div className="space-x-6 text-lg ">
        <a
          className="hover:scale-110 transition-transform duration-200"
          href="#home"
        >
          Home
        </a>
        <a
          className="hover:scale-110 transition-transform duration-200"
          href="#about"
        >
          About Me
        </a>
        <a
          className="hover:scale-110 transition-transform duration-200"
          href="#projects"
        >
          Projects
        </a>
        <a
          className="hover:scale-110 transition-transform duration-200"
          href="#contact"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
