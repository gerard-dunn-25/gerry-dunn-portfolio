import React, { JSX } from 'react'
import Home from './Home'
import AboutMe from './AboutMe'
import Projects from './Projects'
import Contact from './Contact'

export default function Hero(): JSX.Element {
  return (
    <>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  )
}
