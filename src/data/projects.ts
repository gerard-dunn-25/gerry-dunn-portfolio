export type Project = {
  title: string
  images: string[]
  tech: string[]
  description: string
  subDescription: string
  subDescriptionLink?: { text: string; href: string }
  github: string
  liveUrl?: string
}

export const bootcampProjects: Project[] = [
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
    description:
      'This website was our final group project during my time at Dev Academy. For this challenge we put all of our combined knowledge and skills to the test to produce a high quality product that accomplished the MVP we had set out to achieve and more.',
    subDescription:
      'This website was designed to be a companion tool for the Great Walks of NZ, preparing the user for any walk they choose to attempt by providing them with a list of equipment required by that walk. The user is able to keep track of which walks they are planning or completed as well as the equipment they own.',
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
    description:
      'This project was one of the first group projects that we did where we were handling APIs. This project leverages the Studio Ghibli API in order to source the data and images used for this website.',
    subDescription:
      'We also sourced our own interesting facts about each film that we intended to have cycle through at the bottom of the page, but did not have enough time to complete as it was a one day build so the information is currently static.',
    github: 'https://github.com/gerard-dunn-25/Studio-Ghibli-Fan-Wiki',
  },
]

export const personalProjects: Project[] = [
  {
    title: 'Crit Happens! Dice Roller',
    images: [
      '/images/Projects/Crit Happens/tutorial.png',
      '/images/Projects/Crit Happens/settings.png',
      '/images/Projects/Crit Happens/light-mode.png',
      '/images/Projects/Crit Happens/roll-with-crit.png',
      '/images/Projects/Crit Happens/light-mode-with-crit.png',
      '/images/Projects/Crit Happens/dark-mode-mobile.png',
      '/images/Projects/Crit Happens/light-mode-mobile.png',
    ],
    tech: [
      'TypeScript',
      'React',
      'Python',
      'Vite',
      'FastAPI',
      'Tailwind',
      'Framer Motion',
      'Vitest',
      'pytest',
      'GitHub Actions',
      'Vercel',
      'Render',
    ],
    description: `Crit Happens is a dark fantasy dice roller app I built as a way to learn some new technologies outside of my usual stack. The front end is built with React, TypeScript, Vite, and Tailwind, with Framer Motion handling the animations. The backend is a Python FastAPI REST API, which I hadn't worked with before, deliberately choosing them as an opportunity to pick up a new language in a real project context.`,
    subDescription: `The app is fully deployed with the frontend on Vercel and the backend on Render, and has a CI/CD pipeline set up through GitHub Actions. I also wrote tests across both ends, Vitest and React Testing Library on the front end, and pytest with httpx on the back. I really enjoyed creating this project as it relates to my personal interests and hobbies. The design is fairly simple but I think the personality to it comes through. Check this link to see if the backend is running: `,
    subDescriptionLink: {
      text: 'Render Backend',
      href: 'https://crit-happens.onrender.com/',
    },
    github: 'https://github.com/gerard-dunn-25/crit-happens',
    liveUrl: 'https://crit-happens-dice-roller.vercel.app/',
  },
]
