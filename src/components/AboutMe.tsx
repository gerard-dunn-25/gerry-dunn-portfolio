import React, { JSX } from 'react'

export default function AboutMe(): JSX.Element {
  return (
    <div>
      <div className="group">
        <img
          className="w-[25%] mx-auto mb-4 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-1 group-hover:animate-glow-pulse"
          src={'/TransparentCommissionGerrySplitFace.png'}
          alt="Gerry Dunn"
        />
      </div>

      <h1 className="text-4xl font-bold text-center text-white">About Me</h1>
      <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto mt-4">
        I’m Gerry, a creatively minded individual new to software development
        and eager to dive into new and exciting opportunities. I have experience
        in full stack development with a focus in front-end UI / UX. I tend to
        think that people prefer to look at stuff that looks nice, so where
        better to begin than with visual design.
      </p>
      <hr className="border-white w-1/2 mx-auto mb-4" />
    </div>
  )
}
