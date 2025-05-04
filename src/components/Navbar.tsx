import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap px-8 py-4 border-b border-white text-white">
      <a href="#home">
        <img
          className="w-20 sm:w-24 md:w-28 lg:w-32 hover:scale-110 transition-transform duration-200"
          src="/images/Home/GD-logo.png"
          alt="Logo of initials for Gerry Dunn"
        />
      </a>

      <div className="flex space-x-4 sm:space-x-6 text-base sm:text-lg md:text-xl lg:text-2xl mt-4 sm:mt-0">
        {['Home', 'About Me', 'Projects', 'Contact'].map((text) => (
          <a
            key={text}
            href={`#${text.toLowerCase().replace(/\s/g, '')}`}
            className="hover:scale-105 hover:text-sky-400 active:scale-100 focus-visible:outline focus-visible:outline-white transition-transform duration-200"
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  )
}
