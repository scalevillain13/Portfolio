import { useRef, type MouseEvent, type CSSProperties, type KeyboardEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { Project } from '../data/content'
import { projects } from '../data/content'
import { useIsMobile } from '../hooks/useMedia'
import { TILT_SPRING } from '../motion/constants'
import { OptimizedImage } from './OptimizedImage'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import './Projects.css'

const MAX_TILT = 7

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value))
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (id: string) => void
}) {
  const hitRef = useRef<HTMLDivElement>(null)
  const mobile = useIsMobile()
  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const rotateX = useSpring(rotateXRaw, TILT_SPRING)
  const rotateY = useSpring(rotateYRaw, TILT_SPRING)

  const handleMove = (e: MouseEvent) => {
    if (mobile || !hitRef.current) return
    const rect = hitRef.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    rotateXRaw.set(clamp(y * -MAX_TILT * 2, MAX_TILT))
    rotateYRaw.set(clamp(x * MAX_TILT * 2, MAX_TILT))
  }

  const handleLeave = () => {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen(project.id)
    }
  }

  return (
    <div
      ref={hitRef}
      className="project-card-hit"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.article
        className="project-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onOpen(project.id)}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
        aria-label={`Открыть проект ${project.title}`}
        style={{
          rotateX: mobile ? 0 : rotateX,
          rotateY: mobile ? 0 : rotateY,
          transformPerspective: 900,
          transformOrigin: 'center center',
        }}
        data-cursor="View"
        whileHover={{ scale: 1.02, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="project-card__visual" style={{ '--project-color': project.color } as CSSProperties}>
          <div className="project-card__image-wrap">
            <OptimizedImage
              src={project.image}
              alt={`Превью проекта ${project.title}`}
              className="project-card__image"
            />
          </div>
          <span className="project-card__number">{project.id}</span>
          <div className="project-card__glow" />
          <div className="project-card__pattern" />
        </div>

        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">{project.title}</h3>
            <span className="project-card__year">{project.year}</span>
          </div>
          <p className="project-card__desc">{project.description}</p>
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-card__tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="project-card__overlay" aria-hidden="true">
          <span className="project-card__overlay-label">View Project</span>
          <span className="project-card__overlay-arrow">→</span>
        </div>
      </motion.article>
    </div>
  )
}

type ProjectsProps = {
  onOpenProject: (id: string) => void
}

export function Projects({ onOpenProject }: ProjectsProps) {
  return (
    <section className="section projects" id="projects">
      <SectionAmbience variant="projects" />
      <div className="container section__content">
        <SectionHeading
          label="03 — Проекты"
          title="Избранные работы"
          subtitle="Реальные продукты — от edtech-платформы до коммерческого каталога недвижимости."
        />

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  )
}
