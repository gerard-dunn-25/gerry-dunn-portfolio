// import React, { JSX } from 'react'

// export default function Home(): JSX.Element {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="flex flex-col  px-4">
//         <section className="flex flex-col md:flex-row items-center justify-center gap-x-8 ">
//           <div className="max-w-xl text-center md:text-left">
//             <h1 className="text-4xl font-bold mb-2">Hey! I’m Gerry Dunn</h1>
//             <hr className="border-white w-full mb-2" />
//             <p className="text-xl">Fullstack Software Developer</p>
//           </div>
//           <div className="mt-6 md:mt-0">
//             <img
//               src="/Gerry.jpg"
//               alt="Gerry Dunn"
//               className="w-48 h-48 rounded-full border-4 border-white object-cover"
//             />
//           </div>
//         </section>
//         <hr className="absolute bottom-[-1px] justify-center border-white w-1/2 mx-auto mt-8" />
//       </div>
//     </div>
//   )
// }

import React, { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <div className="h-[calc(95vh-100px)] flex flex-col justify-center relative overflow-hidden">
      <section className="flex flex-col md:flex-row items-center justify-center gap-x-8 px-4">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-8xl font-bold mb-2">Hey!</h1>
          <h1 className="text-4xl md:text-8xl font-bold mb-2">
            I’m Gerry Dunn
          </h1>
          <hr className="border-white w-full mb-2" />
          <p className="text-xl md:text-4xl">Fullstack Software Developer</p>
        </div>
        <div className="mt-6 md:mt-0">
          <img
            src="/Gerry.jpg"
            alt="Gerry Dunn"
            className="w-60 h-60 md:w-80 md:h-80 rounded-full border-4 border-white object-cover"
          />
        </div>
      </section>

      {/* Divider at the bottom, centered */}
      <hr className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-white w-1/2" />
    </div>
  )
}
