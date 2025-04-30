import React, { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col  px-4">
      <section className="flex flex-col md:flex-row items-center justify-center gap-x-8 ">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">Hey! I’m Gerry Dunn</h1>
          <hr className="border-white w-full mb-2" />
          <p className="text-xl">Fullstack Software Developer</p>
        </div>
        <div className="mt-6 md:mt-0">
          <img
            src="/Gerry.jpg"
            alt="Gerry Dunn"
            className="w-48 h-48 rounded-full border-4 border-white object-cover"
          />
        </div>
      </section>
      <hr className="border-white w-1/2 mx-auto mt-8" />
    </div>
  )
}
