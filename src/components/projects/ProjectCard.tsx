import React, { useState } from 'react'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import { type Project } from '../../data/projects'

export default function ProjectCard({
  project,
  onImageClick,
}: {
  project: Project
  onImageClick: (images: string[], index: number) => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(
      (i) => (i - 1 + project.images.length) % project.images.length,
    )
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((i) => (i + 1) % project.images.length)
  }

  return (
    <div className="border border-[var(--color-border)] rounded-xl p-8 sm:p-10 w-full max-w-4xl mx-auto bg-[var(--color-card)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_30px_rgba(180,130,40,0.07)]">
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8 text-center">
        {project.title}
      </h3>

      {/* Images */}
      {project.images.length > 0 ? (
        <div className="mb-8">
          <div className="relative group">
            <button
              onClick={() => onImageClick(project.images, currentImageIndex)}
              className="w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
            >
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-200"
              />
            </button>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {project.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === currentImageIndex
                      ? 'bg-[var(--color-accent)] scale-125'
                      : 'bg-[var(--color-border)] hover:bg-[var(--color-accent)]/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 mb-8 border border-dashed border-[var(--color-border)] rounded-lg">
          <p className="font-mono text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
            Images coming soon
          </p>
        </div>
      )}

      {/* Tech tags */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="font-mono text-xs tracking-wider uppercase border border-[var(--color-accent)]/30 text-[var(--color-accent)] px-5 py-2 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="font-mono text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
        {project.description}
      </p>
      <p className="font-mono text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
        {project.subDescription}
        {project.subDescriptionLink && (
          <a
            href={project.subDescriptionLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            {project.subDescriptionLink?.text}
          </a>
        )}
      </p>

      {/* Links */}
      <div className="flex justify-end gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live site for ${project.title}`}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            <FaExternalLinkAlt className="text-2xl" />
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub repository for ${project.title}`}
          className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          <FaGithub className="text-2xl" />
        </a>
      </div>
    </div>
  )
}
