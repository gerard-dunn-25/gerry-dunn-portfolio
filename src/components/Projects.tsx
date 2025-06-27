import React, { JSX, useState } from 'react'
import Slider from 'react-slick'
import { FaGithub } from 'react-icons/fa'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
      'TypeScript',
      'Express',
      'SQLite3',
      'Auth0',
      'Vitest',
      'Knex.js',
    ],
    description: `This website was our final group project during my time at Dev Academy. For this challenge we put all of our combined knowledge and skills to the test to produce a high quality product that accomplished the MVP we had set out to achieve and more.`,
    subDescription: `This website was designed to be a companion tool for the Great Walks of NZ, preparing the user for any walk they choose to attempt by providing them with a list of equipment required by that walk. The user is able to keep track of which walks they are planning or completed as well as the equipment they own.`,
    github: 'https://github.com/gerard-dunn-25/GearedUp',
  },
  {
    title: 'Studio Ghibli Fan Wiki',
    images: [
      '/images/Projects/Studio Ghibli Fan Wiki/1.ghibli-home.png',
      '/images/Projects/Studio Ghibli Fan Wiki/2.ghibli-facts.png',
      '/images/Projects/Studio Ghibli Fan Wiki/3.ghibli-film.png',
    ],
    tech: ['React', 'Studio Ghibli API', 'TypeScript', 'CSS', 'React Router'],
    description: `This project was one of the first group projects that we did where we were handling API's. This project leverages the Studio Ghibli API in order to source the data and images used for this website.`,
    subDescription: `We also sourced  our own interesting facts about each film that we intended to have cycle through at the bottom of the page at first, but did not have enough time to complete as it was a one day build so the information is currently static.`,
    github: 'https://github.com/gerard-dunn-25/Studio-Ghibli-Fan-Wiki',
  },
  // {
  //   title: 'Todo List',
  //   images: [
  //     '/images/Projects/Todo List/1.list.png',
  //     '/images/Projects/Todo List/2.list-with-completes.png',
  //     '/images/Projects/Todo List/3.list-incomplete-selected.png',
  //   ],
  //   tech: ['React', 'TypeScript', 'Express', 'SQLite3', 'CSS'],
  //   description: `This was the first full stack app that we developed, completing back-end functions and rendering the information on the front end. This app features CRUD operations with the ability to add and delete a specific task.`,
  //   subDescription: `While we were working from a template provided, we were able to style the list in whichever way we saw fit. I chose to change the colour of a list item to red assuming it was incomplete or turn it green and cross it out if it had been completed.`,
  //   github: 'https://github.com/gerard-dunn-25/Todo-List',
  // },
]

export default function Projects(): JSX.Element {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [activeImages, setActiveImages] = useState<string[]>([])

  const openImageModal = (images: string[], index: number) => {
    setActiveImages(images)
    setCurrentImageIndex(index)
    setActiveImage(images[index])
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  }

  const goToPrevious = () => {
    const newIndex =
      (currentImageIndex - 1 + activeImages.length) % activeImages.length
    setCurrentImageIndex(newIndex)
    setActiveImage(activeImages[newIndex])
  }

  const goToNext = () => {
    const newIndex = (currentImageIndex + 1) % activeImages.length
    setCurrentImageIndex(newIndex)
    setActiveImage(activeImages[newIndex])
  }

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-20 xl:px-36">
      <h1 className="text-6xl font-bold text-white text-center mb-10 pt-10">
        Projects
      </h1>

      {projects.map((project, idx) => (
        <div
          key={idx}
          className="bg-gray-900 text-white p-6 sm:p-8 mb-12 rounded-2xl shadow-xl w-full max-w-7xl transition hover:shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">
            {project.title}
          </h2>

          {project.images.length >= 3 ? (
            <Slider
              key={`${project.title}-slider`}
              {...sliderSettings}
              className="mb-6 px-2"
            >
              {project.images.map((img, i) => (
                <div key={i} className="px-2 flex justify-center">
                  <img
                    src={img}
                    alt={`Project ${project.title} image ${i + 1}`}
                    className="rounded cursor-pointer h-auto object-contain w-full max-w-[350px] aspect-video hover:scale-105 transition-transform"
                    onClick={() => openImageModal(project.images, i)}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="mb-6 px-2 flex justify-center">
              <img
                src={project.images[0]}
                alt={`Project ${project.title} image`}
                className="rounded cursor-pointer h-auto object-contain w-full max-w-[350px] aspect-video hover:scale-105 transition-transform"
                onClick={() => openImageModal(project.images, 0)}
              />
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 my-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="bg-gray-700 px-3 py-1 rounded-full text-xl md:text-2xl"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-xl md:text-2xl mb-2">{project.description}</p>
          <p className="text-xl md:text-2xl mb-6">{project.subDescription}</p>

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

      {activeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeImage}
              className="w-[70vw] h-[70vh] object-contain rounded shadow-2xl"
              alt="Enlarged Project Image"
            />
            {activeImages.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-[-60px] transform -translate-y-1/2 text-white text-3xl"
                  onClick={goToPrevious}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="absolute top-1/2 right-[-60px] transform -translate-y-1/2 text-white text-3xl"
                  onClick={goToNext}
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <hr className="border-white w-1/2 mx-auto mb-4" />
    </div>
  )
}
