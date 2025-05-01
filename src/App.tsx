// import React, { JSX } from 'react'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import Footer from './components/Footer'
// import './index.css'

// export default function App(): JSX.Element {
//   return (
//     <div className="bg-gradient-to-b from-[#424242] to-[#000000] min-h-screen text-white font-futuristic">
//       <Navbar />
//       <Hero />
//       <Footer />
//     </div>
//   )
// }

import React, { JSX } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import './index.css'

export default function App(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-[#424242] to-[#000000] min-h-screen text-white font-futuristic relative">
      <Navbar />
      <div className="fixed top-[10%] bottom-16 left-8 right-8 border-2 border-white p-6 overflow-y-auto scroll-smooth z-10">
        <Hero />
      </div>
      <Footer />
    </div>
  )
}
