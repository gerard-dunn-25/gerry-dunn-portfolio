import React, { JSX } from 'react'
import Home from './Home'
import Footer from './Footer'
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

// import React, { JSX } from 'react'
// import Home from './Home'
// import AboutMe from './AboutMe'
// import Projects from './Projects'
// import Contact from './Contact'

// export default function Hero(): JSX.Element {
//   return (
//     <div className="overflow-y-auto max-h-screen pb-20">
//       {/* border container */}
//       <div className="border-2 border-white p-8 mx-auto max-w-screen-lg">
//         <Home />
//         <AboutMe />
//         <Projects />
//         <Contact />
//       </div>
//     </div>
//   )
// }
