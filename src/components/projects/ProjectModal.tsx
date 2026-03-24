import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

interface ProjectModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
}

export default function ProjectModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onDotClick,
}: ProjectModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -top-10 right-0 text-white/50 hover:text-[var(--color-accent)] transition-colors text-2xl"
          onClick={onClose}
          aria-label="Close image"
        >
          <FaTimes />
        </button>

        <img
          src={images[currentIndex]}
          className="w-[70vw] h-[70vh] object-contain rounded shadow-2xl"
          alt="Enlarged project screenshot"
        />

        {images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 -left-14 -translate-y-1/2 text-white/50 text-3xl hover:text-[var(--color-accent)] transition-colors"
              onClick={onPrev}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute top-1/2 -right-14 -translate-y-1/2 text-white/50 text-3xl hover:text-[var(--color-accent)] transition-colors"
              onClick={onNext}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onDotClick(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === currentIndex
                      ? 'bg-[var(--color-accent)] scale-125'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
