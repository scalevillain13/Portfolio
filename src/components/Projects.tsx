import { useRef, useState, type MouseEvent, type CSSProperties, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../data/content'
import { projects } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { SectionAmbience } from './SectionAmbience'
import './Projects.css'

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (id: string) => void
}) {
  const ref = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const handleLeave = () => setTilt({ x: 0, y: 0 })

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen(project.id)
    }
  }

  return (
    <motion.article
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(project.id)}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Открыть проект ${project.title}`}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 800,
      }}
      data-cursor="View"
      whileHover={{ scale: 1.02, transition: { duration: 0.35 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="project-card__visual" style={{ '--project-color': project.color } as CSSProperties}>
        <div className="project-card__image-wrap">
          <img
            src={project.image}
            alt=""
            className="project-card__image"
            loading="lazy"
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

      <div className="project-card__overlay">
        <span className="project-card__overlay-label">View Project</span>
        <span className="project-card__overlay-arrow">→</span>
      </div>
    </motion.article>
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
