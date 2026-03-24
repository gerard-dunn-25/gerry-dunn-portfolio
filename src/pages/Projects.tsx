import { useState, JSX } from 'react'
import { bootcampProjects, personalProjects } from '../data/projects'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectModal from '../components/projects/ProjectModal'
import ProjectTabs from '../components/projects/ProjectTabs'

type Tab = 'personal' | 'bootcamp'

export default function Projects(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>('personal')
  const [modalImages, setModalImages] = useState<string[]>([])
  const [modalIndex, setModalIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (images: string[], index: number) => {
    setModalImages(images)
    setModalIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const prev = () =>
    setModalIndex((i) => (i - 1 + modalImages.length) % modalImages.length)

  const next = () => setModalIndex((i) => (i + 1) % modalImages.length)

  const projects =
    activeTab === 'personal' ? personalProjects : bootcampProjects

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-[var(--color-text)]">
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
        Projects
      </h2>

      <ProjectTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="flex flex-col items-center gap-6 mb-12">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} onImageClick={openModal} />
        ))}
      </div>

      {modalOpen && (
        <ProjectModal
          images={modalImages}
          currentIndex={modalIndex}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
          onDotClick={setModalIndex}
        />
      )}
    </div>
  )
}
