import React, { JSX } from 'react'

export default function AboutMe(): JSX.Element {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="group">
          <img
            className="md:w-[25%] mx-auto pt-10 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-1 group-hover:animate-glow-pulse"
            src={'/TransparentCommissionGerrySplitFace.png'}
            alt="Gerry Dunn"
          />
        </div>
        <h1 className="text-4xl font-bold text-center text-white">About Me</h1>
        <p className="text-xl md:text-2xl text-center text-white max-w-2xl mx-auto mt-4 pb-8">
          I’m Gerry, a creatively minded individual new to software development
          and eager to dive into new and exciting opportunities. I have
          experience in full stack development with an interest in front-end UI
          / UX. I tend to think that people prefer to look at stuff that looks
          nice, so where better to begin than with visual design.
        </p>

        <h1 className="text-4xl font-bold text-center text-white mt-8">
          Technologies
        </h1>
        <div className="flex flex-wrap justify-center gap-8 mt-6 pb-40">
          {[
            { name: 'JavaScript', src: '/JavaScript.png' },
            { name: 'TypeScript', src: '/TypeScript.png' },
            { name: 'React', src: '/React.png' },
            { name: 'Node.js', src: '/NodeJS.png' },
            { name: 'Figma', src: '/Figma.png' },
            { name: 'TailwindCSS', src: '/TailwindCSS.png' },
            { name: 'HTML', src: '/HTML.png' },
            { name: 'CSS', src: '/CSS.png' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="w-[100px] flex flex-col items-center text-white"
            >
              <img
                className="w-[60px] h-[60px] object-contain hover:scale-110 transition-transform duration-200"
                src={tech.src}
                alt={`${tech.name} Logo`}
              />
              <p className="text-xl mt-2">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-white w-1/2 mx-auto mb-4" />
    </div>
  )
}
