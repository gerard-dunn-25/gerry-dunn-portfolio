// import React, { JSX } from 'react'
// import { FaGithub } from 'react-icons/fa'

// export default function Projects(): JSX.Element {
//   return (
//     <>
//       <div className="flex flex-col">
//         <h1 className="text-4xl font-bold text-center text-white">Projects</h1>
//         <div>
//           <h1 className="text-4xl font-bold text-center text-white">
//             Geared Up
//           </h1>
//           <img
//             src="/images/Projects/Geared Up/1.geared-up-home.png"
//             alt="Home Screen"
//           />
//           <img
//             src="/images/Projects/Geared Up/2.geared-up-walks.png"
//             alt="Great Walks Page"
//           />
//           <img
//             src="/images/Projects/Geared Up/3.geared-up-walk.png"
//             alt="Individual Walk Page"
//           />
//           <img
//             src="/images/Projects/Geared Up/4.geared-up-checklist.png"
//             alt="Walk Checklist"
//           />
//           <img
//             src="/images/Projects/Geared Up/5.geared-up-comments.png"
//             alt="Walk Comments"
//           />
//           <p>React</p>
//           <p>Tailwind</p>
//           <p>Express</p>
//           <p>SQLite3</p>
//           <p>Auth0</p>
//           <p>Vitest</p>
//           <p>Knex.js</p>
//           <p>
//             This website was our final group project during my time at Dev
//             Academy. For this challenge we put all of our combined knowledge and
//             skills to the test to produce a high quality product that
//             accomplished the MVP we had set out to achieve and more.
//           </p>
//           <p>
//             This website was designed to be a companion tool for the Great Walks
//             of NZ, preparing the user for any walk they choose to attempt by
//             providing them with a list of equipment required by that walk. The
//             user is able to keep track of which walks they are planning or
//             completed as well as the equipment they own.{' '}
//           </p>
//           <a
//             href="https://github.com/gerard-dunn-25"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="GitHub"
//           >
//             <FaGithub className="text-6xl hover:text-green-400 transition-colors hover:scale-110 transition-transform duration-200" />
//           </a>
//         </div>
//         <div>
//           <h1 className="text-4xl font-bold text-center text-white">
//             Todo List
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-4xl font-bold text-center text-white">
//             Studio Ghibli Fan Wiki
//           </h1>
//         </div>
//       </div>
//       <hr className="border-white w-1/2 mx-auto mb-4" />
//     </>
//   )
// }

import React, { JSX, useState } from 'react'
import { FaGithub } from 'react-icons/fa'

export default function Projects(): JSX.Element {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const projects = [
    {
      title: 'Geared Up',
      images: [
        '/images/Projects/Geared Up/1.geared-up-home.png',
        '/images/Projects/Geared Up/2.geared-up-walks.png',
        '/images/Projects/Geared Up/3.geared-up-walk.png',
        '/images/Projects/Geared Up/4.geared-up-checklist.png',
        '/images/Projects/Geared Up/5.geared-up-comments.png',
      ],
      tech: [
        'React',
        'Tailwind',
        'Express',
        'SQLite3',
        'Auth0',
        'Vitest',
        'Knex.js',
      ],
      description: `This website was our final group project during my time at Dev Academy. 
        For this challenge we put all of our combined knowledge and skills to the test 
        to produce a high quality product that accomplished the MVP we had set out to achieve and more.`,
      subDescription: `This website was designed to be a companion tool for the Great Walks of NZ, preparing the user 
        for any walk they choose to attempt by providing them with a list of equipment required by that walk. 
        The user is able to keep track of which walks they are planning or completed as well as the equipment they own.`,
      github: 'https://github.com/gerard-dunn-25',
    },
    {
      title: 'Studio Ghibli Fan Wiki',
      images: [
        '/images/Projects/Studio Ghibli Fan Wiki/1.ghibli-home.png',
        '/images/Projects/Studio Ghibli Fan Wiki/2.ghibli-facts.png',
        '/images/Projects/Studio Ghibli Fan Wiki/3.ghibli-film.png',
      ],
      tech: [
        'React',
        'Tailwind',
        'Express',
        'SQLite3',
        'Auth0',
        'Vitest',
        'Knex.js',
      ],
      description: `This project was one of the first group projects that we did where we were handling API's. This project leverages the Studio Ghibli API in order to source the data and images used for this website.`,
      subDescription: `We also sourced  our own interesting facts about each film that we intended to have cycle through at the bottom of the page at first, but did not have enough time to complete as it was a one day build so the information is currently static.`,
      github: 'https://github.com/gerard-dunn-25',
    },
    {
      title: 'Todo List',
      images: ['/images/Projects/Todo List/1.todo-home.png'],
      tech: [
        'React',
        'Tailwind',
        'Express',
        'SQLite3',
        'Auth0',
        'Vitest',
        'Knex.js',
      ],
      description: `This was the first full stack app that we developed, completing back-end functions and rendering the information on the front end. This app features CRUD operations with the ability to add and delete a specific task.`,
      subDescription: `While we were working from a template provided, we were able to style the list in whichever way we saw fit. I chose to change the colour of a list item to red assuming it was incomplete with the intention to turn it green and cross it out if it had been completed.`,
      github: 'https://github.com/gerard-dunn-25',
    },
    // Add other projects here...
  ]

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Projects
        </h1>
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-900 text-white p-6 mb-10 rounded-2xl shadow-lg w-full max-w-5xl"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              {project.title}
            </h2>

            {/* Carousel */}
            <div className="flex justify-center items-center space-x-4 overflow-hidden">
              {project.images.slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Project ${project.title} image ${i + 1}`}
                  className="w-1/3 rounded cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-2 my-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Descriptions */}
            <p className="text-sm mb-2">{project.description}</p>
            <p className="text-sm mb-4">{project.subDescription}</p>

            {/* GitHub Icon */}
            <div className="flex justify-end">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="text-4xl hover:text-green-400 transition duration-200 hover:scale-110" />
              </a>
            </div>
          </div>
        ))}

        {/* Modal for Image Enlargement */}
        {activeImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setActiveImage(null)}
          >
            <img
              src={activeImage}
              className="max-w-4xl max-h-[90vh] rounded shadow-lg"
            />
          </div>
        )}
      </div>
      <hr className="border-white w-1/2 mx-auto mb-4" />
    </>
  )
}
